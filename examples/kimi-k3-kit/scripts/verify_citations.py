#!/usr/bin/env python3
"""
Zero-Hallucination Citation Verifier for Finance / Legal / Medical LLM Outputs.
Checks that every `quote` in a structured JSON report exists verbatim in the source text
(ignoring whitespace normalization). Exits with code 2 if any citation fails.
"""
import argparse
import json
import re
import sys
from pathlib import Path


def normalize(text: str) -> str:
    return re.sub(r"\s+", " ", text).strip()


def verify_report(source_text: str, findings: list[dict]) -> dict:
    norm_source = normalize(source_text)
    verified = []
    failed = []
    for idx, item in enumerate(findings):
        quote = normalize(str(item.get("quote", "")))
        claim = str(item.get("claim", ""))
        if len(quote) >= 12 and quote in norm_source:
            verified.append({"index": idx, "claim": claim, "status": "VERIFIED"})
        else:
            failed.append({
                "index": idx,
                "claim": claim,
                "quote": quote,
                "reason": "Quote too short (<12 chars) or not found verbatim in source"
            })
    return {
        "total": len(findings),
        "verified": len(verified),
        "failed": len(failed),
        "status": "PASS" if not failed else "BLOCKED_UNVERIFIED_CITATIONS",
        "failures": failed,
    }


def main() -> int:
    parser = argparse.ArgumentParser(description="Verify verbatim quotes in LLM audit JSON against source text.")
    parser.add_argument("--source", help="Path to source text/markdown filing")
    parser.add_argument("--report", help="Path to JSON file containing a list of {claim, quote} objects")
    parser.add_argument("--self-test", action="store_true", help="Run built-in pass/fail smoke test")
    args = parser.parse_args()

    if args.self_test:
        sample = (
            "Section 4.2 Termination for Convenience. Either party may terminate this Agreement "
            "upon sixty (60) days prior written notice. Liability Cap shall not exceed fees paid "
            "during the preceding twelve (12) months."
        )
        ok_res = verify_report(sample, [
            {"claim": "60-day notice required", "quote": "upon sixty (60) days prior written notice"},
            {"claim": "12-month cap", "quote": "exceed fees paid during the preceding twelve (12) months"},
        ])
        bad_res = verify_report(sample, [
            {"claim": "30-day notice", "quote": "upon thirty (30) days written notice"},
        ])
        print(json.dumps({"pass_case": ok_res, "fail_case": bad_res}, indent=2))
        return 0 if ok_res["status"] == "PASS" and bad_res["status"] == "BLOCKED_UNVERIFIED_CITATIONS" else 1

    if not args.source or not args.report:
        parser.error("Provide --source and --report, or use --self-test.")

    source_text = Path(args.source).read_text(encoding="utf-8")
    findings = json.loads(Path(args.report).read_text(encoding="utf-8"))
    result = verify_report(source_text, findings)
    print(json.dumps(result, indent=2, ensure_ascii=False))
    return 0 if result["status"] == "PASS" else 2


if __name__ == "__main__":
    sys.exit(main())
