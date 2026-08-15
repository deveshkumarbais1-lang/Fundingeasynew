import json
import os

transcript_path = r"C:\Users\user\.gemini\antigravity\brain\017c2d6e-0c4a-460f-84ba-aa8def928e41\.system_generated\logs\transcript.jsonl"
out_path = r"C:\Users\user\.gemini\antigravity\scratch\funding-easy\recovered.txt"

writes = []

with open(transcript_path, "r", encoding="utf-8") as f:
    for line in f:
        if "InvestorDashboardView.js" in line:
            try:
                obj = json.loads(line)
                if "tool_calls" in obj:
                    for tc in obj["tool_calls"]:
                        args = tc.get("arguments", {})
                        if "TargetFile" in args and "InvestorDashboardView.js" in args["TargetFile"]:
                            if "CodeContent" in args:
                                writes.append(args["CodeContent"])
                            elif "ReplacementContent" in args:
                                writes.append("REPLACE: " + args["ReplacementContent"])
            except Exception as e:
                pass

if len(writes) > 1:
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(writes[-2]) # Second to last write
    print("Recovered second to last write.")
elif len(writes) == 1:
    print("Only 1 write found. Cannot revert.")
else:
    print("No writes found.")
