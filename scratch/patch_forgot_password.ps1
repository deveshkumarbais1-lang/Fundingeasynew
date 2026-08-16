$file = "C:\Users\user\.gemini\antigravity\scratch\funding-easy\js\views\ForgotPasswordView.js"
$content = Get-Content $file -Raw

# Remove disabled attribute from button
$content = $content -replace '<button type="submit" id="resetBtn" class="login-btn" disabled>', '<button type="submit" id="resetBtn" class="login-btn">'

# Change button text
$content = $content -replace '<span id="resetBtnText">Email reset link</span>', '<span id="resetBtnText">Reset Password</span>'
$content = $content -replace 'btnText\.textContent = ''Email reset link'';', 'btnText.textContent = ''Reset Password'';'

# Change ID of email input to 'email' and add name='email'
$content = $content -replace 'id="resetEmailInput"', 'id="email" name="email"'
$content = $content -replace 'for="resetEmailInput"', 'for="email"'
$content = $content -replace 'document\.getElementById\(''resetEmailInput''\)', 'document.getElementById(''email'')'

# Remove the input listener that disables the button
$disableLogic = '(?s)emailInput\.addEventListener\(''input'', \(\) => \{.*?\}\);'
$content = [regex]::Replace($content, $disableLogic, "")

Set-Content $file $content
