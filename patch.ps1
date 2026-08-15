$path = "C:\Users\user\.gemini\antigravity\scratch\funding-easy\js\views\HomeView.js"
$content = [System.IO.File]::ReadAllText($path, [System.Text.Encoding]::UTF8)

# 1. Hero
$content = $content.Replace("Private capital matching for verified founders & VCs.", "Private capital matching for verified founders & VCs.")

# The first replace was partially done by multi_replace_file_content! Let's check what's there now.
# Actually I'll just rewrite HomeView.js completely by generating it or I'll just use multi_replace for the rest!
