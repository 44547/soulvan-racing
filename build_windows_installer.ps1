# Soulvan Racing - Windows Build & Installer Creation Script

Write-Host ""
Write-Host "================================================================" -ForegroundColor Cyan
Write-Host "    SOULVAN RACING - WINDOWS BUILD & INSTALLER CREATOR" -ForegroundColor Cyan
Write-Host "================================================================" -ForegroundColor Cyan
Write-Host ""

$ProjectName = "Soulvan Racing"
$Version = "1.0.0"
$Publisher = "Soulvan Studios"
$ProjectPath = $PSScriptRoot
$BuildPath = Join-Path $ProjectPath "Builds\Windows"
$InstallerPath = Join-Path $ProjectPath "Installer"

Write-Host "Project: $ProjectName" -ForegroundColor Green
Write-Host "Version: $Version" -ForegroundColor Green
Write-Host "Publisher: $Publisher" -ForegroundColor Green
Write-Host ""

# Create directories
Write-Host "Creating build directories..." -ForegroundColor Yellow
if (-not (Test-Path $BuildPath)) {
    New-Item -ItemType Directory -Path $BuildPath | Out-Null
}
if (-not (Test-Path $InstallerPath)) {
    New-Item -ItemType Directory -Path $InstallerPath | Out-Null
}
Write-Host "  Build folder: $BuildPath" -ForegroundColor White
Write-Host "  Installer folder: $InstallerPath" -ForegroundColor White
Write-Host ""

Write-Host "================================================================" -ForegroundColor Cyan
Write-Host "STEP 1: BUILD GAME IN UNITY" -ForegroundColor Cyan
Write-Host "================================================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "To build Soulvan Racing for Windows:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Open Unity Hub and load the project" -ForegroundColor White
Write-Host ""
Write-Host "2. Go to Edit > Project Settings > Player" -ForegroundColor White
Write-Host "   - Company Name: $Publisher" -ForegroundColor Cyan
Write-Host "   - Product Name: $ProjectName" -ForegroundColor Cyan
Write-Host "   - Version: $Version" -ForegroundColor Cyan
Write-Host "   - Default Icon: (set your game icon)" -ForegroundColor Cyan
Write-Host ""
Write-Host "3. Go to File > Build Settings" -ForegroundColor White
Write-Host "   - Platform: PC, Mac & Linux Standalone" -ForegroundColor Cyan
Write-Host "   - Target Platform: Windows" -ForegroundColor Cyan
Write-Host "   - Architecture: x86_64" -ForegroundColor Cyan
Write-Host ""
Write-Host "4. Click 'Player Settings' and configure:" -ForegroundColor White
Write-Host "   - Resolution: 1920x1080 (default)" -ForegroundColor Cyan
Write-Host "   - Fullscreen Mode: Fullscreen Window" -ForegroundColor Cyan
Write-Host "   - Resizable Window: Yes" -ForegroundColor Cyan
Write-Host ""
Write-Host "5. Add all scenes to 'Scenes In Build'" -ForegroundColor White
Write-Host ""
Write-Host "6. Click 'Build' button" -ForegroundColor White
Write-Host "   - Save to: $BuildPath" -ForegroundColor Cyan
Write-Host "   - Name: SoulvanRacing.exe" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press any key after Unity build completes..." -ForegroundColor Yellow
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
Write-Host ""

# Check if build exists
$ExePath = Join-Path $BuildPath "SoulvanRacing.exe"
if (-not (Test-Path $ExePath)) {
    Write-Host "WARNING: Build not found at $ExePath" -ForegroundColor Red
    Write-Host "Please complete the Unity build first, then run this script again." -ForegroundColor Yellow
    Write-Host ""
    exit 1
}

Write-Host "Build found successfully!" -ForegroundColor Green
Write-Host ""

Write-Host "================================================================" -ForegroundColor Cyan
Write-Host "STEP 2: CREATE INSTALLER PACKAGE" -ForegroundColor Cyan
Write-Host "================================================================" -ForegroundColor Cyan
Write-Host ""

# Create installer script using Inno Setup format
$InnoScript = @"
; Soulvan Racing - Inno Setup Script
; This creates a Windows installer for easy distribution

#define MyAppName "Soulvan Racing"
#define MyAppVersion "1.0.0"
#define MyAppPublisher "Soulvan Studios"
#define MyAppURL "https://soulvanracing.io"
#define MyAppExeName "SoulvanRacing.exe"

[Setup]
; Basic app info
AppId={{SOULVAN-RACING-2025}}
AppName={#MyAppName}
AppVersion={#MyAppVersion}
AppPublisher={#MyAppPublisher}
AppPublisherURL={#MyAppURL}
AppSupportURL={#MyAppURL}
AppUpdatesURL={#MyAppURL}

; Installation settings
DefaultDirName={autopf}\{#MyAppName}
DefaultGroupName={#MyAppName}
DisableProgramGroupPage=yes
LicenseFile=LICENSE.txt
OutputDir=$InstallerPath
OutputBaseFilename=SoulvanRacing_Setup_v{#MyAppVersion}
SetupIconFile=icon.ico
Compression=lzma
SolidCompression=yes
WizardStyle=modern

; System requirements
ArchitecturesAllowed=x64
ArchitecturesInstallIn64BitMode=x64
MinVersion=10.0

[Languages]
Name: "english"; MessagesFile: "compiler:Default.isl"

[Tasks]
Name: "desktopicon"; Description: "{cm:CreateDesktopIcon}"; GroupDescription: "{cm:AdditionalIcons}"; Flags: unchecked

[Files]
Source: "$BuildPath\*"; DestDir: "{app}"; Flags: ignoreversion recursesubdirs createallsubdirs

[Icons]
Name: "{group}\{#MyAppName}"; Filename: "{app}\{#MyAppExeName}"
Name: "{group}\{cm:UninstallProgram,{#MyAppName}}"; Filename: "{uninstallexe}"
Name: "{autodesktop}\{#MyAppName}"; Filename: "{app}\{#MyAppExeName}"; Tasks: desktopicon

[Run]
Filename: "{app}\{#MyAppExeName}"; Description: "{cm:LaunchProgram,{#StringChange(MyAppName, '&', '&&')}}"; Flags: nowait postinstall skipifsilent

[Code]
function InitializeSetup(): Boolean;
begin
  Result := True;
  if not IsWin64 then
  begin
    MsgBox('Soulvan Racing requires a 64-bit version of Windows.', mbError, MB_OK);
    Result := False;
  end;
end;
"@

$InnoScriptPath = Join-Path $InstallerPath "SoulvanRacing.iss"
$InnoScript | Out-File -FilePath $InnoScriptPath -Encoding UTF8

Write-Host "Installer script created: SoulvanRacing.iss" -ForegroundColor Green
Write-Host ""

Write-Host "To create the installer:" -ForegroundColor Yellow
Write-Host ""
Write-Host "Option 1 - Using Inno Setup (Recommended):" -ForegroundColor Cyan
Write-Host "1. Download Inno Setup from: https://jrsoftware.org/isdl.php" -ForegroundColor White
Write-Host "2. Install Inno Setup" -ForegroundColor White
Write-Host "3. Open: $InnoScriptPath" -ForegroundColor White
Write-Host "4. Click Build > Compile" -ForegroundColor White
Write-Host "5. Installer will be created in: $InstallerPath" -ForegroundColor White
Write-Host ""

Write-Host "Option 2 - Portable ZIP Package (No installer):" -ForegroundColor Cyan
Write-Host "1. Compress the Builds\Windows folder to ZIP" -ForegroundColor White
Write-Host "2. Users extract and run SoulvanRacing.exe directly" -ForegroundColor White
Write-Host ""

# Create a simple batch installer launcher
$BatchInstaller = @"
@echo off
echo ================================================================
echo    SOULVAN RACING - INSTALLATION LAUNCHER
echo ================================================================
echo.
echo This will install Soulvan Racing on your computer.
echo.
echo Installation folder: %ProgramFiles%\Soulvan Racing
echo.
pause
echo.
echo Installing...

xcopy /E /I /Y "%~dp0*" "%ProgramFiles%\Soulvan Racing\"

echo.
echo Creating desktop shortcut...
powershell -Command "$ws = New-Object -ComObject WScript.Shell; $s = $ws.CreateShortcut('%USERPROFILE%\Desktop\Soulvan Racing.lnk'); $s.TargetPath = '%ProgramFiles%\Soulvan Racing\SoulvanRacing.exe'; $s.Save()"

echo.
echo ================================================================
echo Installation complete!
echo ================================================================
echo.
echo You can now launch Soulvan Racing from:
echo - Desktop shortcut
echo - Start Menu
echo - %ProgramFiles%\Soulvan Racing\
echo.
pause
"@

$BatchInstallerPath = Join-Path $InstallerPath "INSTALL.bat"
$BatchInstaller | Out-File -FilePath $BatchInstallerPath -Encoding ASCII

Write-Host "Simple batch installer created: INSTALL.bat" -ForegroundColor Green
Write-Host ""

Write-Host "================================================================" -ForegroundColor Cyan
Write-Host "STEP 3: CREATE DOWNLOAD PAGE" -ForegroundColor Cyan
Write-Host "================================================================" -ForegroundColor Cyan
Write-Host ""

# Create HTML download page
$DownloadPage = @"
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Download Soulvan Racing - Windows PC</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
            color: #ffffff;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }
        
        .container {
            max-width: 800px;
            width: 100%;
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(10px);
            border-radius: 20px;
            padding: 60px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .logo {
            text-align: center;
            margin-bottom: 40px;
        }
        
        h1 {
            font-size: 48px;
            margin-bottom: 10px;
            background: linear-gradient(45deg, #00ccff, #0099ff);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            text-transform: uppercase;
            letter-spacing: 2px;
        }
        
        .tagline {
            font-size: 18px;
            color: #888;
            margin-bottom: 40px;
            text-align: center;
        }
        
        .download-section {
            background: rgba(0, 204, 255, 0.1);
            border: 2px solid #00ccff;
            border-radius: 15px;
            padding: 40px;
            margin-bottom: 30px;
            text-align: center;
        }
        
        .platform {
            font-size: 24px;
            margin-bottom: 20px;
            color: #00ccff;
        }
        
        .download-btn {
            display: inline-block;
            padding: 20px 60px;
            font-size: 24px;
            font-weight: bold;
            color: #ffffff;
            background: linear-gradient(45deg, #00ccff, #0099ff);
            border: none;
            border-radius: 50px;
            cursor: pointer;
            text-decoration: none;
            transition: all 0.3s ease;
            box-shadow: 0 10px 30px rgba(0, 204, 255, 0.3);
        }
        
        .download-btn:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 40px rgba(0, 204, 255, 0.5);
        }
        
        .version {
            margin-top: 20px;
            font-size: 14px;
            color: #888;
        }
        
        .features {
            margin-top: 40px;
        }
        
        .features h2 {
            font-size: 28px;
            margin-bottom: 20px;
            color: #00ccff;
        }
        
        .feature-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-top: 20px;
        }
        
        .feature {
            background: rgba(255, 255, 255, 0.05);
            padding: 20px;
            border-radius: 10px;
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .feature-icon {
            font-size: 32px;
            margin-bottom: 10px;
        }
        
        .feature-title {
            font-size: 16px;
            font-weight: bold;
            margin-bottom: 5px;
        }
        
        .feature-desc {
            font-size: 13px;
            color: #aaa;
        }
        
        .requirements {
            margin-top: 40px;
            padding: 20px;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 10px;
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .requirements h3 {
            color: #00ccff;
            margin-bottom: 15px;
        }
        
        .req-list {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
        }
        
        .req-item {
            font-size: 14px;
            color: #ccc;
        }
        
        .req-label {
            color: #00ccff;
            font-weight: bold;
        }
        
        @media (max-width: 768px) {
            .container {
                padding: 30px;
            }
            
            h1 {
                font-size: 32px;
            }
            
            .download-btn {
                padding: 15px 40px;
                font-size: 18px;
            }
            
            .req-list {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="logo">
            <h1>🏁 SOULVAN RACING</h1>
            <p class="tagline">Race. Remix. Earn. Become Legend.</p>
        </div>
        
        <div class="download-section">
            <div class="platform">🖥️ Windows PC</div>
            <a href="SoulvanRacing_Setup_v1.0.0.exe" class="download-btn" download>
                ⬇️ DOWNLOAD NOW
            </a>
            <p class="version">Version 1.0.0 | Windows 10/11 | 64-bit</p>
        </div>
        
        <div class="features">
            <h2>✨ Features</h2>
            <div class="feature-grid">
                <div class="feature">
                    <div class="feature-icon">🏎️</div>
                    <div class="feature-title">Override Raids</div>
                    <div class="feature-desc">Faction-modified racing with cinematic scoring</div>
                </div>
                <div class="feature">
                    <div class="feature-icon">🎬</div>
                    <div class="feature-title">Remix Pipeline</div>
                    <div class="feature-desc">AI-generated trailers with voiceover</div>
                </div>
                <div class="feature">
                    <div class="feature-icon">🗳️</div>
                    <div class="feature-title">DAO Governance</div>
                    <div class="feature-desc">Community voting on missions</div>
                </div>
                <div class="feature">
                    <div class="feature-icon">💰</div>
                    <div class="feature-title">Earn SOUL</div>
                    <div class="feature-desc">SoulvanCoin rewards & royalties</div>
                </div>
                <div class="feature">
                    <div class="feature-icon">🏆</div>
                    <div class="feature-title">Ceremonies</div>
                    <div class="feature-desc">Monthly top 3 prizes up to 1,450 SOUL</div>
                </div>
                <div class="feature">
                    <div class="feature-icon">📊</div>
                    <div class="feature-title">Leaderboards</div>
                    <div class="feature-desc">8 ranking types, real-time updates</div>
                </div>
                <div class="feature">
                    <div class="feature-icon">🔒</div>
                    <div class="feature-title">Staking</div>
                    <div class="feature-desc">Up to 3x voting power boost</div>
                </div>
                <div class="feature">
                    <div class="feature-icon">⚡</div>
                    <div class="feature-title">3 Factions</div>
                    <div class="feature-desc">Unique multipliers & content</div>
                </div>
            </div>
        </div>
        
        <div class="requirements">
            <h3>💻 System Requirements</h3>
            <div class="req-list">
                <div class="req-item">
                    <span class="req-label">OS:</span> Windows 10/11 (64-bit)
                </div>
                <div class="req-item">
                    <span class="req-label">Processor:</span> Intel Core i5 / AMD Ryzen 5
                </div>
                <div class="req-item">
                    <span class="req-label">Memory:</span> 8 GB RAM
                </div>
                <div class="req-item">
                    <span class="req-label">Graphics:</span> NVIDIA GTX 1060 / AMD RX 580
                </div>
                <div class="req-item">
                    <span class="req-label">DirectX:</span> Version 11
                </div>
                <div class="req-item">
                    <span class="req-label">Storage:</span> 10 GB available space
                </div>
                <div class="req-item">
                    <span class="req-label">Network:</span> Broadband Internet (Web3)
                </div>
                <div class="req-item">
                    <span class="req-label">Wallet:</span> MetaMask extension
                </div>
            </div>
        </div>
    </div>
</body>
</html>
"@

$DownloadPagePath = Join-Path $InstallerPath "download.html"
$DownloadPage | Out-File -FilePath $DownloadPagePath -Encoding UTF8

Write-Host "Download page created: download.html" -ForegroundColor Green
Write-Host ""

Write-Host "================================================================" -ForegroundColor Cyan
Write-Host "STEP 4: CREATE README & LICENSE" -ForegroundColor Cyan
Write-Host "================================================================" -ForegroundColor Cyan
Write-Host ""

$ReadmeContent = @"
SOULVAN RACING - Windows Installation Guide
============================================

INSTALLATION:

1. Run SoulvanRacing_Setup_v1.0.0.exe
2. Follow the installation wizard
3. Install MetaMask browser extension (if not already installed)
4. Launch Soulvan Racing from Desktop or Start Menu

FIRST TIME SETUP:

1. Create your Web3 wallet in-game
2. Choose your faction (Midnight/Neon/Phantom)
3. Complete the tutorial mission
4. Start your first Override Raid!

SYSTEM REQUIREMENTS:

- OS: Windows 10/11 64-bit
- Processor: Intel Core i5 or AMD Ryzen 5
- Memory: 8 GB RAM
- Graphics: NVIDIA GTX 1060 or AMD RX 580
- DirectX: Version 11
- Storage: 10 GB available
- Network: Broadband Internet
- Wallet: MetaMask extension

CONTROLS:

Keyboard:
- W/S: Accelerate/Brake
- A/D: Steer Left/Right
- Space: Handbrake/Drift
- Shift: Boost
- Ctrl: Weapon
- Tab: Leaderboard

Controller (Xbox/PlayStation):
- Right Trigger: Accelerate
- Left Trigger: Brake
- Left Stick: Steering
- A/X: Drift
- B/Circle: Boost
- X/Square: Weapon

FEATURES:

✅ Override Raids with faction modifiers (1.25x-1.35x)
✅ Replay-to-Remix pipeline with AI highlights
✅ DAO governance and community voting
✅ Award ceremonies with SOUL prizes
✅ Live leaderboards (8 ranking types)
✅ Staking system (up to 3x voting power)
✅ Web3 wallet integration
✅ Earn 8,000-20,000+ SOUL per month

SUPPORT:

- Website: https://soulvanracing.io
- Discord: https://discord.gg/soulvanracing
- Email: support@soulvanracing.io
- Documentation: Full guides included in installation

TROUBLESHOOTING:

- Black screen on launch: Update graphics drivers
- Wallet connection issues: Check MetaMask is installed
- Performance issues: Lower graphics settings in Options
- Cannot find saves: Check Documents/Soulvan Racing folder

VERSION HISTORY:

v1.0.0 (November 2025)
- Initial release
- Complete mythic pipeline operational
- All 7 journey phases implemented
- 18 Unity scripts, 1 smart contract
- Full documentation included

Enjoy racing and becoming a legend!

🏁 SOULVAN RACING - Where Every Race Becomes Legend 🏁
"@

$ReadmePath = Join-Path $InstallerPath "README.txt"
$ReadmeContent | Out-File -FilePath $ReadmePath -Encoding UTF8

$LicenseContent = @"
END-USER LICENSE AGREEMENT (EULA) FOR SOULVAN RACING

Last Updated: November 9, 2025

IMPORTANT - READ CAREFULLY:

This End-User License Agreement ("Agreement") is a legal agreement between you ("User") and Soulvan Studios ("Company") for the Soulvan Racing software product, which includes computer software and associated media and printed materials.

By installing, copying, or otherwise using Soulvan Racing, you agree to be bound by the terms of this Agreement. If you do not agree to the terms of this Agreement, do not install or use Soulvan Racing.

1. LICENSE GRANT

Soulvan Studios grants you a limited, non-exclusive, non-transferable license to:
- Install and use Soulvan Racing on your personal computer
- Create user-generated content (remixes, voiceovers)
- Participate in the DAO governance system
- Earn and trade SoulvanCoin (SOUL) tokens

2. RESTRICTIONS

You may NOT:
- Reverse engineer, decompile, or disassemble the software
- Rent, lease, or lend the software
- Use the software for commercial purposes without permission
- Remove any copyright or trademark notices
- Use cheats, exploits, or automation tools
- Attempt to manipulate the DAO voting system

3. OWNERSHIP

Soulvan Racing and all intellectual property rights remain the property of Soulvan Studios. This license does not grant you ownership of the software.

4. USER-GENERATED CONTENT

- You retain ownership of your created remixes and voiceovers
- By submitting content to the DAO, you grant Soulvan Studios a license to use it
- Content must comply with community guidelines
- Soulvan Studios may remove inappropriate content

5. CRYPTOCURRENCY & BLOCKCHAIN

- SoulvanCoin (SOUL) is a utility token within Soulvan Racing
- Token values may fluctuate; no investment guarantees
- You are responsible for managing your Web3 wallet
- Blockchain transactions are irreversible
- Comply with your local cryptocurrency regulations

6. ONLINE SERVICES

- Internet connection required for Web3 features
- Soulvan Studios may modify or discontinue online services
- You are responsible for your account security
- Violations of terms may result in account suspension

7. WARRANTY DISCLAIMER

SOULVAN RACING IS PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND. SOULVAN STUDIOS DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE.

8. LIMITATION OF LIABILITY

SOULVAN STUDIOS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, OR CONSEQUENTIAL DAMAGES ARISING FROM USE OF SOULVAN RACING.

9. TERMINATION

This license is effective until terminated. It will terminate automatically if you fail to comply with any terms. Upon termination, you must destroy all copies of Soulvan Racing.

10. GOVERNING LAW

This Agreement is governed by the laws of [Your Jurisdiction]. Any disputes shall be resolved in [Your Jurisdiction] courts.

11. UPDATES & PATCHES

Soulvan Studios may provide updates and patches. These are subject to this Agreement unless separate terms are provided.

12. ENTIRE AGREEMENT

This Agreement constitutes the entire agreement between you and Soulvan Studios regarding Soulvan Racing.

CONTACT:

Soulvan Studios
Email: legal@soulvanracing.io
Website: https://soulvanracing.io

By installing Soulvan Racing, you acknowledge that you have read, understood, and agree to be bound by this Agreement.

© 2025 Soulvan Studios. All Rights Reserved.
"@

$LicensePath = Join-Path $InstallerPath "LICENSE.txt"
$LicenseContent | Out-File -FilePath $LicensePath -Encoding UTF8

Write-Host "README.txt created" -ForegroundColor Green
Write-Host "LICENSE.txt created" -ForegroundColor Green
Write-Host ""

Write-Host "================================================================" -ForegroundColor Cyan
Write-Host "✅ WINDOWS BUILD & INSTALLER PACKAGE COMPLETE" -ForegroundColor Green
Write-Host "================================================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Created Files:" -ForegroundColor Yellow
Write-Host "  📄 $InnoScriptPath" -ForegroundColor White
Write-Host "  📄 $BatchInstallerPath" -ForegroundColor White
Write-Host "  🌐 $DownloadPagePath" -ForegroundColor White
Write-Host "  📄 $ReadmePath" -ForegroundColor White
Write-Host "  📄 $LicensePath" -ForegroundColor White
Write-Host ""

Write-Host "Next Steps:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Build the game in Unity (if not done)" -ForegroundColor White
Write-Host "2. Install Inno Setup: https://jrsoftware.org/isdl.php" -ForegroundColor White
Write-Host "3. Compile the installer using SoulvanRacing.iss" -ForegroundColor White
Write-Host "4. Test the installer on a clean Windows system" -ForegroundColor White
Write-Host "5. Upload installer + download.html to your website" -ForegroundColor White
Write-Host "6. Share download link with players!" -ForegroundColor White
Write-Host ""

Write-Host "Download Page Preview:" -ForegroundColor Yellow
Write-Host "  Open in browser: $DownloadPagePath" -ForegroundColor Cyan
Write-Host ""

Write-Host "🎮 Soulvan Racing is ready for Windows distribution! 🏁" -ForegroundColor Green
Write-Host ""

# Open download page in browser
Start-Process $DownloadPagePath
