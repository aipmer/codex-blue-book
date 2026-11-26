---
title: "Ch.05 金融投研与量化工程实战：百万 Token 财报审计与自动建模"
description: "发挥 Kimi K3.1 Pro 百万上下文与 Finance Agent 优势，实战跨年报/10-K 财报审计、带公式溯源的 Python 自动三表建模与异动归因，用程序计算消灭大模型算术幻觉。"
lastUpdated: 2026-11-26
---

[返回 Kimi 专页](/kimi/) | [上一章：MoonViT-V2 录屏诊断与 Figma 还原](/kimi/ch04_moonvit_video_figma) | [下一章：法律合规、生物医药与零幻觉引用校验](/kimi/ch06_legal_medical_citations)

# Ch.05 金融投研与量化工程实战：百万 Token 财报审计与自动建模

> 🎯 **本章解决的工程麻烦**：传统 RAG 把一份 200 页上市公司 10-K 年报切成几百段碎片塞进向量库，结果“利润表主数据”和“附注 14 里的商誉减值说明”被切散，模型要么漏掉关键口径变更，要么直接心算加减把毛利率算错 3 个百分点。
>
> 💡 **实战落地收益**：利用 **Kimi K3.1 Pro 1M 原生窗口 + Prompt Caching（\$0.20/1M）** 整本吞吐多期财报与行业研报，建立 **“模型负责提取带页码结构化科目 → Python 沙盒负责全部计算与 Excel 公式输出”** 的零算术幻觉金融工程管线。
>
> ⚡ **一句话结论**：严肃金融投研绝不让大模型心算数字；让 K3.1 Pro 在百万上下文里做全量口径对齐与异常线索发现，把所有加减乘除和回测交给确定性 Python 代码。

金融投研之所以长期是 AI 应用的深水区，原因就两个字：**容错率为零**。写周报差个形容词没人追究，但投资备忘录里把自由现金流（FCF）算错一位小数、把 Non-GAAP 调整项和 GAAP 净利混在一起，整份报告的公信力当场归零。

Kimi K3.1 Pro 的 1M 窗口配合 **90% 缓存读取折扣**，让“整本装入多期完整财报 + 多轮追问验证”在经济上第一次打平了切片 RAG，从根本上消除了跨页附注丢失问题。

---

## 5.1 百万上下文整本财报审计：告别碎片化 RAG 漏检

当你需要横向对比一家公司连续 3 年的 10-K 年报（或 3 家同业竞争对手的同期季报）时，总文本量通常在 **250K–600K Token** 之间——正好轻松装进 K3.1 Pro 的 1M 窗口，且第一轮装载建立缓存后，后续 10 轮多维追问的输入成本全部按 **\$0.20 / 1M Token** 结算。

```mermaid
flowchart LR
    Filings["3 年 10-K / 年报完整全文 (350K Tokens)"] --> Cache["K3.1 Pro 1M 窗口 (前缀缓存 $0.20/1M)"]
    Cache --> Extract["步骤 1: 结构化抽取科目 + 原文页码/附注锚点"]
    Extract --> Verify["步骤 2: verify_citations.py 原文核验"]
    Verify --> Py["步骤 3: Python 沙盒执行比率计算、三表勾稽与回测"]
    Py --> Out["输出带公式 .xlsx 与风险归因简报"]
```

关键工程原则：**把抽取和计算拆成两阶段**。第一步只让 K3.1 Pro 输出严格的 JSON 原始科目（附带货币单位、口径标注与原文出处句），绝对不在这一步让它直接报出“同比增速”或“ROIC”。

---

## 5.2 确定性三表勾稽与异动归因引擎（Python 实战）

拿到 K3.1 Pro 抽取并经过原文引用校验的 JSON 后，立刻交给确定性 Python 脚本做勾稽检查（资产 = 负债 + 所有者权益）、毛利率/净利率/自由现金流计算以及同比异动报警。

下面是一段零外部复杂依赖、可直接运行的财务勾稽与异动扫描脚本（`scripts/financial_audit.py`）：

```python
#!/usr/bin/env python3
import json
import sys
from dataclasses import dataclass

@dataclass
class PeriodMetrics:
    period: str
    revenue: float
    cogs: float
    operating_cash_flow: float
    capex: float
    total_assets: float
    total_liabilities: float
    total_equity: float
    receivables: float

def analyze_periods(periods: list[PeriodMetrics]) -> dict:
    report = []
    alerts = []

    for i, cur in enumerate(periods):
        gross_margin = (cur.revenue - cur.cogs) / cur.revenue if cur.revenue else 0.0
        fcf = cur.operating_cash_flow - cur.capex
        bs_gap = abs(cur.total_assets - (cur.total_liabilities + cur.total_equity))
        dso_ratio = cur.receivables / cur.revenue if cur.revenue else 0.0

        row = {
            "period": cur.period,
            "gross_margin_pct": round(gross_margin * 100, 2),
            "free_cash_flow": round(fcf, 2),
            "balance_sheet_gap": round(bs_gap, 4),
            "receivables_to_revenue_pct": round(dso_ratio * 100, 2),
        }

        if bs_gap > 1.0:
            alerts.append(f"[{cur.period}] Balance sheet does not tie: gap={bs_gap:.2f}")

        if i > 0:
            prev = periods[i - 1]
            rev_growth = (cur.revenue - prev.revenue) / prev.revenue if prev.revenue else 0.0
            rec_growth = (cur.receivables - prev.receivables) / prev.receivables if prev.receivables else 0.0
            row["revenue_yoy_pct"] = round(rev_growth * 100, 2)
            row["receivables_yoy_pct"] = round(rec_growth * 100, 2)
            if rec_growth - rev_growth > 0.15:
                alerts.append(
                    f"[{cur.period}] Receivables growth ({rec_growth:.1%}) outpaced revenue growth ({rev_growth:.1%}) by >15pp — inspect credit policy / channel stuffing."
                )
        report.append(row)

    return {"metrics": report, "alerts": alerts}

if __name__ == "__main__":
    sample = [
        PeriodMetrics("FY2024", 1200.0, 540.0, 260.0, 75.0, 2100.0, 950.0, 1150.0, 180.0),
        PeriodMetrics("FY2025", 1380.0, 648.6, 215.0, 90.0, 2420.0, 1140.0, 1280.0, 255.0),
    ]
    print(json.dumps(analyze_periods(sample), indent=2, ensure_ascii=False))
```

当脚本抓出 `Receivables growth (+41.7%) outpaced revenue growth (+15.0%)` 这类硬警报后，再带着这个精确问题回到已经缓存好全文的 K3.1 Pro 会话里追问管理层讨论与分析（MD&A）和应收账款账龄附注——**只花几分钱缓存费，就能拿到分析师级别的深度归因。**

---

## 5.3 带动态公式的 Excel 模型交付

金融客户最反感“只给死数字的表格”。让 Kimi Code 用 `openpyxl` 生成财务模型时，在 `AGENTS.md` 里写死两条红线：
1. **原始假设区与计算区物理分离**：原始抽取数字标蓝字写死，所有合计、增长率、折现现金流（DCF）单元格必须写入真实 Excel 公式（如 `=SUM(B4:B8)`、`=(C10-B10)/B10`），严禁写入算好的静态浮点数；
2. **输出前执行公式重算核验**：用 LibreOffice headless 或脚本校验零 `#REF!`、`#DIV/0!`、`#VALUE!` 错误后再交付客户。

---

## 🚀 新手极速上手 3 步走

1. **跑通勾稽演示**：直接运行 `python3 financial_audit.py`，观察它如何自动捕捉应收账款增速远超营收增速的风险警报。
2. **整本装载一次真实年报**：挑一家上市公司的公开 10-K 文本，通过 `kimi-k3.1-pro`（开启 `prompt_caching`）只抽取原始科目 JSON 与附注原文句，再用 [verify_citations.py](https://github.com/aipmer/codex-blue-book/blob/main/examples/kimi-k3-kit/scripts/verify_citations.py) 核验引用真实性。
3. **联调公式导出**：让 Kimi Code 基于核验后的 JSON 用 `openpyxl` 生成带真实公式的 3 年对比模型，并核查打开后零报错。

---

## 🛡️ 翻车自救与避坑速查表

| 故障现象 | 致命根因 | 即刻自救方案 |
| :--- | :--- | :--- |
| 同比数据差了整整 1000 倍 | 一份报表单位是 `in thousands`，另一份是 `in millions`，抽取时漏提单位字段 | 在抽取 Schema 中强制加入 `unit_multiplier`（`1` / `1000` / `1000000`）与 `currency`，由 Python 统一归一化后再对比 |
| 模型把非经常性收益算进了核心经营利润 | 未在提示词中要求区分 GAAP 与 Non-GAAP 口径，也未抽取附注调节表 | 显式声明分别抽取 `gaap_operating_income` 与 `non_gaap_adjustments[]`，并在 Python 端核对加总是否相等 |
| PDF 转文本后财报数字列全错位串行 | 用了劣质纯文本 PDF 提取器丢失了表格列对齐 | 改用保留表格结构的 Markdown/HTML 解析器（如 MinerU / Docling）或直接配合 MoonViT-V2 对关键财务页做视觉校对 |

---

[返回 Kimi 专页](/kimi/) | [上一章：MoonViT-V2 录屏诊断与 Figma 还原](/kimi/ch04_moonvit_video_figma) | [下一章：法律合规、生物医药与零幻觉引用校验](/kimi/ch06_legal_medical_citations)
