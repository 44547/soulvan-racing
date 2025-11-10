const fs = require("fs");
const crypto = require("crypto");

class MissionGenerator {
    constructor() {
        this.guilds = {
            "MythicDrift": {
                headquarters: "NeonTokyo_District7",
                specialty: "Drift Mastery",
                securityLevel: "High",
                rivalGuilds: ["SoulVanguard", "ApexPredators"]
            },
            "SoulVanguard": {
                headquarters: "CyberMiami_Core",
                specialty: "Aerodynamic Excellence", 
                securityLevel: "Maximum",
                rivalGuilds: ["MythicDrift", "NeonRunners"]
            },
            "NeonRunners": {
                headquarters: "NightCity_Underground",
                specialty: "Street Racing",
                securityLevel: "Medium",
                rivalGuilds: ["ApexPredators", "SoulVanguard"]
            },
            "ApexPredators": {
                headquarters: "QuantumLabs_Facility",
                specialty: "Prototype Development",
                securityLevel: "Classified",
                rivalGuilds: ["MythicDrift", "NeonRunners"]
            }
        };

        this.tuningKits = {
            "MYTHIC_DRIFT_SIGNATURE": {
                kitName: "Ethereal Drift Core",
                specs: {
                    powerBonus: 0.25,
                    handlingBonus: 0.45,
                    aeroBonus: 0.15,
                    weightReduction: 0.12,
                    specialEffect: "Ghost Mode - Temporary phase through obstacles during drifts"
                },
                classification: {
                    level: "Top Secret",
                    guardTypes: ["Elite Phantom Guards", "Holographic Sentries"],
                    biometricLocks: true,
                    quantumEncryption: true
                }
            },
            "SOUL_VANGUARD_PROTOTYPE": {
                kitName: "Quantum Aero Matrix",
                specs: {
                    powerBonus: 0.35,
                    handlingBonus: 0.20,
                    aeroBonus: 0.50,
                    weightReduction: 0.08,
                    specialEffect: "Reality Warp - Manipulate air density for maximum downforce"
                },
                classification: {
                    level: "Black Project",
                    guardTypes: ["Cyber Commandos", "AI Sentinels"],
                    biometricLocks: true,
                    quantumEncryption: true
                }
            },
            "NEON_RUNNERS_STREET": {
                kitName: "Urban Phantom Kit",
                specs: {
                    powerBonus: 0.18,
                    handlingBonus: 0.35,
                    aeroBonus: 0.22,
                    weightReduction: 0.15,
                    specialEffect: "Neon Burst - Temporary invisibility to surveillance systems"
                },
                classification: {
                    level: "Classified",
                    guardTypes: ["Street Wardens", "Drone Patrols"],
                    biometricLocks: false,
                    quantumEncryption: false
                }
            },
            "APEX_PREDATORS_EXPERIMENTAL": {
                kitName: "Apex Genesis Core",
                specs: {
                    powerBonus: 0.40,
                    handlingBonus: 0.30,
                    aeroBonus: 0.35,
                    weightReduction: 0.20,
                    specialEffect: "Predator Mode - Enhanced performance scales with rival proximity"
                },
                classification: {
                    level: "Black Project",
                    guardTypes: ["Apex Hunters", "Quantum Drones", "Neural Guards"],
                    biometricLocks: true,
                    quantumEncryption: true
                }
            }
        };
    }

    generateInfiltrationMission(playerGuild, targetGuild, objective = "steal_tuning_kit") {
        const missionId = this.generateMissionId(targetGuild, "Hitman");
        const targetHQ = this.guilds[targetGuild].headquarters;
        const availableKits = Object.keys(this.tuningKits).filter(kit => 
            kit.includes(targetGuild.toUpperCase().replace(/([A-Z])/g, '_$1').slice(1))
        );
        
        const targetKit = availableKits.length > 0 ? availableKits[0] : Object.keys(this.tuningKits)[0];
        const kitData = this.tuningKits[targetKit];

        const mission = {
            missionId,
            zone: targetHQ,
            style: "Hitman",
            objective: `Infiltrate ${targetGuild} HQ and steal the ${kitData.kitName}`,
            steps: this.generateInfiltrationSteps(targetGuild, kitData),
            cinematic: true,
            rewards: this.generateRewards(kitData, targetGuild),
            infiltration: this.generateInfiltrationData(playerGuild, targetGuild),
            targetKit: {
                kitId: targetKit,
                kitName: kitData.kitName,
                ownerGuild: targetGuild,
                specs: kitData.specs,
                classification: kitData.classification,
                location: this.generateKitLocation(targetHQ),
                isPrototype: kitData.classification.level === "Black Project"
            }
        };

        this.saveMission(mission);
        return mission;
    }

    generateInfiltrationSteps(targetGuild, kitData) {
        const securityLevel = kitData.classification.level;
        const baseSteps = [
            "🎭 Acquire disguise and forged credentials",
            "🚗 Infiltrate perimeter using stolen guild vehicle",
            "📡 Disable external surveillance systems"
        ];

        let infiltrationSteps = [];
        
        switch(securityLevel) {
            case "Black Project":
                infiltrationSteps = [
                    "🔬 Hack quantum encryption matrix",
                    "👤 Clone biometric signature of authorized personnel",
                    "🤖 Bypass AI sentinel patrol routes",
                    "⚡ Navigate neural security maze",
                    "💎 Extract prototype tuning kit from quantum vault"
                ];
                break;
                
            case "Top Secret":
                infiltrationSteps = [
                    "🔐 Override biometric security locks",
                    "👻 Evade elite phantom guard patrols",
                    "📱 Hack holographic sentry network",
                    "🏆 Locate and secure tuning kit",
                    "💨 Activate stealth extraction protocol"
                ];
                break;
                
            case "Classified":
                infiltrationSteps = [
                    "🛡️ Neutralize security personnel silently",
                    "📹 Loop surveillance camera feeds",
                    "🔑 Acquire keycard from security chief",
                    "📦 Extract tuning kit from secure storage"
                ];
                break;
                
            default:
                infiltrationSteps = [
                    "🚪 Pick locks on security doors",
                    "👥 Avoid guard patrol patterns",
                    "📋 Locate tuning kit inventory",
                    "🎯 Secure target and prepare extraction"
                ];
        }

        const extractionSteps = [
            "🚨 Trigger false alarm as distraction",
            "🏃 Escape through predetermined route",
            "🎪 Rendezvous with extraction team",
            "🏠 Return to guild HQ undetected"
        ];

        return [...baseSteps, ...infiltrationSteps, ...extractionSteps];
    }

    generateInfiltrationData(playerGuild, targetGuild) {
        const targetInfo = this.guilds[targetGuild];
        
        return {
            targetGuild,
            coverIdentity: `${targetGuild}_Maintenance_Tech_${crypto.randomBytes(4).toString('hex')}`,
            securityLevels: this.generateSecurityLevels(targetInfo.securityLevel),
            detectionRisk: this.calculateDetectionRisk(targetInfo.securityLevel),
            requiredDisguises: this.getRequiredDisguises(targetGuild),
            extractionPoint: this.generateExtractionPoint(targetInfo.headquarters)
        };
    }

    generateSecurityLevels(securityRating) {
        const levels = [];
        
        // Perimeter Security
        levels.push({
            levelName: "Perimeter",
            guardDensity: securityRating === "Maximum" ? 0.8 : 0.5,
            hasCameras: true,
            hasAlarms: true,
            accessRequirements: ["Guild ID Badge", "Vehicle Registration"]
        });

        // Main Facility
        levels.push({
            levelName: "Main Facility", 
            guardDensity: securityRating === "Maximum" ? 0.9 : 0.6,
            hasCameras: true,
            hasAlarms: true,
            accessRequirements: ["Biometric Scan", "Security Clearance"]
        });

        // Restricted Areas
        if (securityRating === "Maximum" || securityRating === "High") {
            levels.push({
                levelName: "Restricted Labs",
                guardDensity: 0.95,
                hasCameras: true,
                hasAlarms: true,
                accessRequirements: ["Quantum Key", "Neural Verification", "Guild Master Authorization"]
            });
        }

        return levels;
    }

    calculateDetectionRisk(securityLevel) {
        const riskMap = {
            "Low": 0.2,
            "Medium": 0.4,
            "High": 0.7,
            "Maximum": 0.9,
            "Classified": 0.95
        };
        return riskMap[securityLevel] || 0.5;
    }

    getRequiredDisguises(targetGuild) {
        const disguiseMap = {
            "MythicDrift": ["Drift Technician", "Phantom Mechanic", "Ethereal Engineer"],
            "SoulVanguard": ["Aero Specialist", "Quantum Researcher", "Cyber Operative"],
            "NeonRunners": ["Street Mechanic", "Urban Scout", "Neon Technician"],
            "ApexPredators": ["Lab Researcher", "Prototype Engineer", "Security Analyst"]
        };
        return disguiseMap[targetGuild] || ["Generic Technician"];
    }

    generateExtractionPoint(headquarters) {
        const extractionPoints = {
            "NeonTokyo_District7": { x: 1247.5, y: 89.2, z: -2156.8 },
            "CyberMiami_Core": { x: -856.3, y: 245.7, z: 1789.1 },
            "NightCity_Underground": { x: 2341.9, y: -45.6, z: -987.4 },
            "QuantumLabs_Facility": { x: -1567.2, y: 156.8, z: 2845.3 }
        };
        return extractionPoints[headquarters] || { x: 0, y: 0, z: 0 };
    }

    generateKitLocation(headquarters) {
        // Generate secure location within HQ
        const baseLocation = this.generateExtractionPoint(headquarters);
        return {
            x: baseLocation.x + (Math.random() - 0.5) * 200,
            y: baseLocation.y + 50 + Math.random() * 100,
            z: baseLocation.z + (Math.random() - 0.5) * 200
        };
    }

    generateRewards(kitData, targetGuild) {
        const baseReward = {
            prestige: 1000,
            credits: 50000,
            unlockedTuningKits: [Object.keys(this.tuningKits).find(kit => kit.includes(targetGuild.toUpperCase()))],
            factionReputation: -0.5, // Negative rep with target guild
            specialReward: `Stolen ${kitData.kitName} - Exclusive access to rival guild technology`
        };

        // Scale rewards based on kit rarity
        if (kitData.classification.level === "Black Project") {
            baseReward.prestige *= 3;
            baseReward.credits *= 2.5;
            baseReward.specialReward += " + Quantum Technology Research Data";
        } else if (kitData.classification.level === "Top Secret") {
            baseReward.prestige *= 2;
            baseReward.credits *= 1.8;
        }

        return baseReward;
    }

    generateMissionId(targetGuild, style) {
        return `INFILTRATION_${targetGuild}_${style}_${Date.now()}_${crypto.randomBytes(4).toString('hex').toUpperCase()}`;
    }

    saveMission(mission) {
        const filename = `${mission.missionId}.json`;
        fs.writeFileSync(filename, JSON.stringify(mission, null, 2));
        console.log(`🎯 Infiltration Mission Generated: ${mission.missionId}`);
        console.log(`🎭 Target: ${mission.targetKit.ownerGuild}`);
        console.log(`💎 Prize: ${mission.targetKit.kitName}`);
        console.log(`⚠️  Risk Level: ${mission.targetKit.classification.level}`);
        console.log(`📁 Saved to: ${filename}`);
        return filename;
    }

    // Generate example missions
    static generateExampleMissions() {
        const generator = new MissionGenerator();
        
        // Generate infiltration missions for each guild
        const missions = [
            generator.generateInfiltrationMission("MythicDrift", "SoulVanguard"),
            generator.generateInfiltrationMission("SoulVanguard", "ApexPredators"),
            generator.generateInfiltrationMission("NeonRunners", "MythicDrift"),
            generator.generateInfiltrationMission("ApexPredators", "NeonRunners")
        ];

        console.log(`\n🏆 Generated ${missions.length} infiltration missions:`);
        missions.forEach(mission => {
            console.log(`  • ${mission.missionId}: Steal ${mission.targetKit.kitName} from ${mission.targetKit.ownerGuild}`);
        });

        return missions;
    }
}

// CLI usage
if (require.main === module) {
    const args = process.argv.slice(2);
    
    if (args.length < 2) {
        console.log("Usage: node missiongen.js <playerGuild> <targetGuild> [objective]");
        console.log("Example: node missiongen.js MythicDrift SoulVanguard steal_tuning_kit");
        console.log("\nGenerating example missions instead...");
        MissionGenerator.generateExampleMissions();
    } else {
        const generator = new MissionGenerator();
        const [playerGuild, targetGuild, objective] = args;
        generator.generateInfiltrationMission(playerGuild, targetGuild, objective);
    }
}

module.exports = MissionGenerator;