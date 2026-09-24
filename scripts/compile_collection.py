import os
import re

# Resolve the workspace root dynamically relative to this script's directory
script_dir = os.path.dirname(os.path.abspath(__file__))
workspace = os.path.dirname(script_dir)
chapters_dir = os.path.join(workspace, "chapters")
en_dir = os.path.join(workspace, "en")

chapter_files = [
    "ch01_mindset.md",
    "ch02_setup.md",
    "ch03_sandbox.md",
    "ch04_goal_driven.md",
    "ch05_agents_protocol.md",
    "ch06_reasoning_steer.md",
    "ch07_desktop_computer_use.md",
    "ch08_mobile_workflow.md",
    "ch09_legacy_code.md",
    "ch10_saas_mvp.md",
    "ch11_expo_mobile.md",
    "ch12_commercialization.md",
    "ch13_2026_frontier.md"
]

toc_groups = {
    "zh": [
        "第一部分：入门与环境",
        "第二部分：任务与项目规则",
        "第三部分：界面与移动工作流",
        "第四部分：重构与产品交付",
        "第五部分：增长与版本迁移",
    ],
    "en": [
        "Part 1: Getting Started",
        "Part 2: Tasks and Project Rules",
        "Part 3: UI and Mobile Workflows",
        "Part 4: Refactoring and Delivery",
        "Part 5: Growth and Version Changes",
    ],
}


def build_toc(directory, language):
    lines = ["## 目录" if language == "zh" else "## Table of Contents", ""]
    for index, filename in enumerate(chapter_files):
        if index in (0, 3, 6, 9, 12):
            lines.extend(["### " + toc_groups[language][(0, 3, 6, 9, 12).index(index)], ""])
        path = os.path.join(directory, filename)
        with open(path, "r", encoding="utf-8") as chapter:
            title = next(line[2:] for line in chapter if line.startswith("# Ch."))
        lines.append("- " + title)
    return "\n".join(lines)


def clean_and_process_file(filepath, is_en=False):
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
    
    # Split into lines
    lines = content.splitlines()
    cleaned_lines = []
    
    for line in lines:
        # Only remove the site's repeated chapter navigation bars, not examples or diagrams.
        if line.lstrip().startswith("[ 🏠"):
            continue
        cleaned_lines.append(line)
        
    processed_content = "\n".join(cleaned_lines).strip()
    
    # PDF viewers cannot reach the temporary localhost server used by md-to-pdf.
    # Convert chapter and repository references to permanent public URLs.
    def public_link(match):
        target = match.group(1)
        path, separator, fragment = target.partition("#")
        resolved = os.path.normpath(os.path.join(os.path.dirname(filepath), path))
        relative = os.path.relpath(resolved, workspace).replace(os.sep, "/")
        suffix = ("#" + fragment) if separator else ""
        if relative.startswith("chapters/") and relative.endswith(".md"):
            url = "https://book.pmer.cn/" + relative[:-3]
        elif relative.startswith("en/") and relative.endswith(".md"):
            url = "https://book.pmer.cn/" + relative[:-3]
        elif relative.startswith("public/"):
            url = "https://book.pmer.cn/" + relative[len("public/"):]
        else:
            url = "https://github.com/aipmer/codex-blue-book/blob/main/" + relative
        return "](" + url + suffix + ")"

    processed_content = re.sub(r'(?<!!)\]\((\.\.?/[^)]+)\)', public_link, processed_content)
        
    return processed_content

def build_zh():
    combined = []
    combined.append("# Codex 蓝皮书：从项目规则到交付验证\n")
    combined.append("**v1.3.1 · 资料核对至 2026 年 9 月 24 日**\n")
    combined.append("![Codex 实战蓝皮书](./images/cover.jpg)\n\n")
    combined.append("主理人: [Hunk Wu](https://pmer.cn) (X: [@ai_pmer](https://x.com/ai_pmer))\n")
    combined.append("[English PDF](https://book.pmer.cn/downloads/codex_blue_book_en.pdf) | [English online](https://book.pmer.cn/en/ch01_mindset)\n")
    combined.append(build_toc(chapters_dir, "zh") + "\n\n---\n")
    for filename in chapter_files:
        zh_path = os.path.join(chapters_dir, filename)
        if os.path.exists(zh_path):
            chapter_content = clean_and_process_file(zh_path, is_en=False)
            combined.append(chapter_content + "\n\n---\n")
            
    # Write to file
    out_path = os.path.join(workspace, "codex_blue_book_zh.md")
    with open(out_path, "w", encoding="utf-8") as f:
        f.write("\n".join(combined))
    print("Compiled and saved codex_blue_book_zh.md")

def build_en():
    combined = []
    combined.append("# Codex Blue Book: From Project Rules to Verified Delivery\n")
    combined.append("**v1.3.1 · Sources checked September 24, 2026**\n")
    combined.append("![Codex Practical Blue Book](./images/cover_en.jpg)\n\n")
    combined.append("Author: [Hunk Wu](https://pmer.cn) (X: [@ai_pmer](https://x.com/ai_pmer))\n")
    combined.append("[中文 PDF](https://book.pmer.cn/downloads/codex_blue_book_zh.pdf) | [中文在线阅读](https://book.pmer.cn/chapters/ch01_mindset)\n")
    combined.append(build_toc(en_dir, "en") + "\n\n---\n")
    for filename in chapter_files:
        en_path = os.path.join(en_dir, filename)
        if os.path.exists(en_path):
            chapter_content = clean_and_process_file(en_path, is_en=True)
            combined.append(chapter_content + "\n\n---\n")
            
    # Write to file
    out_path = os.path.join(workspace, "codex_blue_book_en.md")
    with open(out_path, "w", encoding="utf-8") as f:
        f.write("\n".join(combined))
    print("Compiled and saved codex_blue_book_en.md")

if __name__ == "__main__":
    build_zh()
    build_en()
