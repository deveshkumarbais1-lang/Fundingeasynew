using System;
using System.IO;

class Program
{
    static void Main()
    {
        string path = @"C:\Users\user\.gemini\antigravity\brain\017c2d6e-0c4a-460f-84ba-aa8def928e41\.system_generated\logs\transcript.jsonl";
        int count = 0;
        foreach(string line in File.ReadLines(path))
        {
            if (line.Contains("InvestorDashboardView.js") && line.Contains("view_file"))
            {
                File.WriteAllText(@"C:\Users\user\.gemini\antigravity\scratch\funding-easy\view_" + count + ".txt", line);
                count++;
            }
        }
        Console.WriteLine("Dumped " + count + " view_file logs.");
    }
}
