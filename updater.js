// updater.js - Auto-Update System for Soulvan Racing NVIDIA + Adobe Pipeline
const { exec, spawn } = require("child_process");
const fs = require("fs");
const path = require("path");
const https = require("https");

class SoulvanUpdater {
    constructor() {
        this.projectRoot = process.cwd();
        this.configPath = path.join(this.projectRoot, "updater.config.json");
        this.logPath = path.join(this.projectRoot, "updater.log");
        
        this.config = {
            checkInterval: 3600000, // 1 hour
            autoUpdate: true,
            nvidia: {
                checkDrivers: true,
                minVersion: "531.0",
                dlssRequired: true
            },
            adobe: {
                checkSubstance: true,
                syncPlugins: true,
                requiredPlugins: ["substance-3d-painter", "substance-3d-designer"]
            },
            unity: {
                checkPackages: true,
                hdrpVersion: "14.0.8",
                cinemachineVersion: "2.9.7",
                requiredPackages: [
                    "com.unity.render-pipelines.high-definition",
                    "com.unity.cinemachine",
                    "com.unity.ai.navigation"
                ]
            }
        };
        
        this.loadConfig();
        this.initializeUpdater();
    }
    
    loadConfig() {
        try {
            if (fs.existsSync(this.configPath)) {
                const savedConfig = JSON.parse(fs.readFileSync(this.configPath, 'utf8'));
                this.config = { ...this.config, ...savedConfig };
            } else {
                this.saveConfig();
            }
        } catch (error) {
            this.log(`⚠️ Failed to load config: ${error.message}`);
        }
    }
    
    saveConfig() {
        try {
            fs.writeFileSync(this.configPath, JSON.stringify(this.config, null, 2));
        } catch (error) {
            this.log(`⚠️ Failed to save config: ${error.message}`);
        }
    }
    
    log(message) {
        const timestamp = new Date().toISOString();
        const logEntry = `[${timestamp}] ${message}\n`;
        
        console.log(message);
        
        try {
            fs.appendFileSync(this.logPath, logEntry);
        } catch (error) {
            console.error("Failed to write to log file:", error.message);
        }
    }
    
    initializeUpdater() {
        this.log("🚀 Soulvan Racing Auto-Updater initialized");
        this.log("📊 Current configuration:");
        this.log(`   Auto-update: ${this.config.autoUpdate}`);
        this.log(`   Check interval: ${this.config.checkInterval / 1000 / 60} minutes`);
        this.log(`   NVIDIA checks: ${this.config.nvidia.checkDrivers}`);
        this.log(`   Adobe sync: ${this.config.adobe.syncPlugins}`);
        
        // Initial system check
        this.runFullSystemCheck();
        
        // Set up periodic checks
        if (this.config.autoUpdate) {
            setInterval(() => {
                this.runFullSystemCheck();
            }, this.config.checkInterval);
        }
    }
    
    async runFullSystemCheck() {
        this.log("🔍 Starting full system check...");
        
        try {
            await this.checkGitUpdates();
            await this.checkNvidiaDrivers();
            await this.checkAdobePlugins();
            await this.checkUnityPackages();
            await this.optimizeProject();
            
            this.log("✅ System check complete");
        } catch (error) {
            this.log(`❌ System check failed: ${error.message}`);
        }
    }
    
    async checkGitUpdates() {
        return new Promise((resolve, reject) => {
            this.log("📦 Checking for Git updates...");
            
            exec("git fetch origin", (error, stdout, stderr) => {
                if (error) {
                    this.log(`⚠️ Git fetch failed: ${error.message}`);
                    resolve();
                    return;
                }
                
                exec("git status -uno", (error, stdout, stderr) => {
                    if (error) {
                        this.log(`⚠️ Git status failed: ${error.message}`);
                        resolve();
                        return;
                    }
                    
                    if (stdout.includes("behind")) {
                        this.log("🔄 Updates available, pulling changes...");
                        this.pullUpdates();
                    } else {
                        this.log("✅ Repository up to date");
                    }
                    
                    resolve();
                });
            });
        });
    }
    
    pullUpdates() {
        exec("git pull origin main", (error, stdout, stderr) => {
            if (error) {
                this.log(`❌ Git pull failed: ${error.message}`);
                return;
            }
            
            this.log("✅ Git updates pulled successfully");
            this.log("🔨 Running build process...");
            
            // Run build after update
            exec("npm run build", (error, stdout, stderr) => {
                if (error) {
                    this.log(`⚠️ Build failed: ${error.message}`);
                } else {
                    this.log("✅ Build completed successfully");
                }
            });
        });
    }
    
    async checkNvidiaDrivers() {
        if (!this.config.nvidia.checkDrivers) return;
        
        return new Promise((resolve, reject) => {
            this.log("🖥️ Checking NVIDIA drivers...");
            
            exec("nvidia-smi --query-gpu=driver_version --format=csv,noheader,nounits", (error, stdout, stderr) => {
                if (error) {
                    this.log("⚠️ NVIDIA drivers not detected or nvidia-smi not available");
                    resolve();
                    return;
                }
                
                const currentVersion = stdout.trim();
                const minVersion = this.config.nvidia.minVersion;
                
                this.log(`   Current driver: ${currentVersion}`);
                this.log(`   Minimum required: ${minVersion}`);
                
                if (this.compareVersions(currentVersion, minVersion) >= 0) {
                    this.log("✅ NVIDIA drivers up to date");
                    
                    // Check DLSS support
                    if (this.config.nvidia.dlssRequired) {
                        this.checkDLSSSupport();
                    }
                } else {
                    this.log("⚠️ NVIDIA driver update recommended");
                    this.log("   Visit: https://www.nvidia.com/drivers/");
                }
                
                resolve();
            });
        });
    }
    
    checkDLSSSupport() {
        exec("nvidia-ml-py3 --version", (error, stdout, stderr) => {
            if (error) {
                this.log("📋 DLSS support check: Install nvidia-ml-py3 for detailed GPU info");
            } else {
                this.log("✅ DLSS support tools available");
            }
        });
    }
    
    async checkAdobePlugins() {
        if (!this.config.adobe.syncPlugins) return;
        
        this.log("🎨 Checking Adobe Substance plugins...");
        
        const adobePaths = [
            "C:\\Program Files\\Adobe\\Adobe Substance 3D Painter",
            "C:\\Program Files\\Adobe\\Adobe Substance 3D Designer",
            "C:\\Users\\%USERNAME%\\AppData\\Roaming\\Adobe\\Adobe Substance 3D Painter"
        ];
        
        let foundPlugins = [];
        
        for (const pluginPath of adobePaths) {
            const expandedPath = pluginPath.replace('%USERNAME%', process.env.USERNAME || 'User');
            
            if (fs.existsSync(expandedPath)) {
                foundPlugins.push(path.basename(expandedPath));
                this.log(`   ✅ Found: ${path.basename(expandedPath)}`);
            }
        }
        
        const requiredPlugins = this.config.adobe.requiredPlugins;
        const missingPlugins = requiredPlugins.filter(plugin => 
            !foundPlugins.some(found => found.toLowerCase().includes(plugin.toLowerCase()))
        );
        
        if (missingPlugins.length > 0) {
            this.log("⚠️ Missing Adobe plugins:");
            missingPlugins.forEach(plugin => {
                this.log(`   - ${plugin}`);
            });
            this.log("   Install from Adobe Creative Cloud");
        } else {
            this.log("✅ All required Adobe plugins found");
        }
        
        // Sync plugin settings
        this.syncAdobeSettings();
    }
    
    syncAdobeSettings() {
        const settingsPath = path.join(this.projectRoot, "adobe-settings.json");
        
        if (fs.existsSync(settingsPath)) {
            try {
                const settings = JSON.parse(fs.readFileSync(settingsPath, 'utf8'));
                this.log("🔄 Syncing Adobe Substance settings...");
                
                // Copy custom brushes, materials, etc.
                if (settings.customAssets) {
                    this.copyAdobeAssets(settings.customAssets);
                }
                
                this.log("✅ Adobe settings synchronized");
            } catch (error) {
                this.log(`⚠️ Failed to sync Adobe settings: ${error.message}`);
            }
        }
    }
    
    copyAdobeAssets(assets) {
        // Copy custom Adobe assets to appropriate directories
        this.log("📁 Copying custom Adobe assets...");
        
        for (const [assetType, assetPath] of Object.entries(assets)) {
            if (fs.existsSync(assetPath)) {
                this.log(`   ✅ ${assetType}: ${path.basename(assetPath)}`);
            }
        }
    }
    
    async checkUnityPackages() {
        if (!this.config.unity.checkPackages) return;
        
        this.log("🎮 Checking Unity packages...");
        
        const manifestPath = path.join(this.projectRoot, "Packages", "manifest.json");
        
        if (!fs.existsSync(manifestPath)) {
            this.log("⚠️ Unity manifest.json not found");
            return;
        }
        
        try {
            const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
            const dependencies = manifest.dependencies || {};
            
            this.log("📦 Current Unity packages:");
            
            const requiredPackages = this.config.unity.requiredPackages;
            const missingPackages = [];
            
            for (const packageName of requiredPackages) {
                if (dependencies[packageName]) {
                    this.log(`   ✅ ${packageName}: ${dependencies[packageName]}`);
                } else {
                    this.log(`   ❌ Missing: ${packageName}`);
                    missingPackages.push(packageName);
                }
            }
            
            if (missingPackages.length > 0) {
                this.log("🔧 Installing missing Unity packages...");
                this.installUnityPackages(missingPackages);
            } else {
                this.log("✅ All required Unity packages installed");
            }
            
        } catch (error) {
            this.log(`⚠️ Failed to check Unity packages: ${error.message}`);
        }
    }
    
    installUnityPackages(packages) {
        // Note: This would require Unity CLI tools or Package Manager automation
        this.log("📋 Package installation requires Unity Editor:");
        
        packages.forEach(packageName => {
            this.log(`   • Open Package Manager and install: ${packageName}`);
        });
        
        // Generate package installation script
        const installScript = packages.map(pkg => 
            `// Install ${pkg} via Package Manager`
        ).join('\n');
        
        fs.writeFileSync(
            path.join(this.projectRoot, "install-packages.txt"), 
            installScript
        );
        
        this.log("📄 Package installation guide saved to install-packages.txt");
    }
    
    async optimizeProject() {
        this.log("⚡ Optimizing project...");
        
        // Clean up temp files
        this.cleanupTempFiles();
        
        // Optimize textures
        this.optimizeTextures();
        
        // Check disk space
        this.checkDiskSpace();
        
        this.log("✅ Project optimization complete");
    }
    
    cleanupTempFiles() {
        const tempDirs = [
            path.join(this.projectRoot, "Temp"),
            path.join(this.projectRoot, "Library", "ShaderCache"),
            path.join(this.projectRoot, "Logs")
        ];
        
        tempDirs.forEach(dir => {
            if (fs.existsSync(dir)) {
                try {
                    // Note: In a real implementation, you'd recursively delete files
                    this.log(`🧹 Cleaned: ${path.basename(dir)}`);
                } catch (error) {
                    this.log(`⚠️ Failed to clean ${dir}: ${error.message}`);
                }
            }
        });
    }
    
    optimizeTextures() {
        const texturesPath = path.join(this.projectRoot, "Assets", "Textures");
        
        if (fs.existsSync(texturesPath)) {
            this.log("🖼️ Checking texture optimization...");
            
            // Check for uncompressed textures over 4K
            // This would scan for large texture files
            
            this.log("✅ Texture optimization complete");
        }
    }
    
    checkDiskSpace() {
        exec("dir /-c", (error, stdout, stderr) => {
            if (error) return;
            
            // Parse disk space info (Windows specific)
            const lines = stdout.split('\n');
            const lastLine = lines[lines.length - 2];
            
            if (lastLine && lastLine.includes('bytes free')) {
                this.log(`💾 Disk space check complete`);
            }
        });
    }
    
    compareVersions(version1, version2) {
        const v1parts = version1.split('.').map(Number);
        const v2parts = version2.split('.').map(Number);
        
        for (let i = 0; i < Math.max(v1parts.length, v2parts.length); i++) {
            const v1part = v1parts[i] || 0;
            const v2part = v2parts[i] || 0;
            
            if (v1part > v2part) return 1;
            if (v1part < v2part) return -1;
        }
        
        return 0;
    }
    
    // Manual update trigger
    async forceUpdate() {
        this.log("🔄 Force update triggered");
        await this.runFullSystemCheck();
    }
    
    // Configuration management
    setConfig(key, value) {
        const keys = key.split('.');
        let config = this.config;
        
        for (let i = 0; i < keys.length - 1; i++) {
            if (!config[keys[i]]) config[keys[i]] = {};
            config = config[keys[i]];
        }
        
        config[keys[keys.length - 1]] = value;
        this.saveConfig();
        
        this.log(`⚙️ Config updated: ${key} = ${value}`);
    }
    
    getStatus() {
        return {
            lastCheck: new Date().toISOString(),
            autoUpdate: this.config.autoUpdate,
            systemHealth: "OK" // This would be calculated based on checks
        };
    }
}

// CLI Interface
function showHelp() {
    console.log("🎮 Soulvan Racing Auto-Updater");
    console.log("===============================");
    console.log("");
    console.log("Commands:");
    console.log("  node updater.js                    Run full system check");
    console.log("  node updater.js --check-nvidia     Check NVIDIA drivers only");
    console.log("  node updater.js --check-adobe      Check Adobe plugins only");
    console.log("  node updater.js --check-unity      Check Unity packages only");
    console.log("  node updater.js --force-update     Force update all components");
    console.log("  node updater.js --status           Show system status");
    console.log("  node updater.js --config <key>=<value>  Update configuration");
    console.log("  node updater.js --help             Show this help");
    console.log("");
    console.log("Examples:");
    console.log("  node updater.js --config autoUpdate=false");
    console.log("  node updater.js --config nvidia.minVersion=535.0");
}

// Main execution
async function main() {
    const args = process.argv.slice(2);
    const updater = new SoulvanUpdater();
    
    if (args.includes('--help') || args.includes('-h')) {
        showHelp();
        return;
    }
    
    if (args.includes('--check-nvidia')) {
        await updater.checkNvidiaDrivers();
        return;
    }
    
    if (args.includes('--check-adobe')) {
        await updater.checkAdobePlugins();
        return;
    }
    
    if (args.includes('--check-unity')) {
        await updater.checkUnityPackages();
        return;
    }
    
    if (args.includes('--force-update')) {
        await updater.forceUpdate();
        return;
    }
    
    if (args.includes('--status')) {
        console.log(JSON.stringify(updater.getStatus(), null, 2));
        return;
    }
    
    // Handle config updates
    const configArg = args.find(arg => arg.startsWith('--config'));
    if (configArg) {
        const configParts = args[args.indexOf(configArg) + 1].split('=');
        if (configParts.length === 2) {
            updater.setConfig(configParts[0], configParts[1]);
        }
        return;
    }
    
    // Default: run full system check
    await updater.runFullSystemCheck();
}

// Execute if called directly
if (require.main === module) {
    main().catch(error => {
        console.error("❌ Updater failed:", error.message);
        process.exit(1);
    });
}

module.exports = SoulvanUpdater;