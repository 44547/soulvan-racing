const Web3 = require('web3');
const fs = require('fs');
const path = require('path');

class ChainForge {
    constructor(web3Provider, contractAddresses) {
        this.web3 = new Web3(web3Provider);
        this.contracts = {};
        this.loadContracts(contractAddresses);
    }

    loadContracts(addresses) {
        try {
            // Load contract ABIs
            const guildMissionABI = JSON.parse(fs.readFileSync('./contracts/GuildMissionChain.json'));
            const remixLegacyABI = JSON.parse(fs.readFileSync('./contracts/RemixLegacy.json'));
            
            this.contracts.guildMission = new this.web3.eth.Contract(
                guildMissionABI.abi, 
                addresses.guildMissionChain
            );
            
            this.contracts.remixLegacy = new this.web3.eth.Contract(
                remixLegacyABI.abi,
                addresses.remixLegacy
            );
            
            console.log('🔗 Smart contracts loaded successfully');
        } catch (error) {
            console.error('❌ Failed to load contracts:', error.message);
        }
    }

    async createMissionChain(guild, missionIds, reward, fromAccount) {
        try {
            console.log(`🛡️ Creating mission chain for ${guild} with ${missionIds.length} missions`);
            console.log(`💎 Prestige Reward: ${reward}`);
            console.log(`📋 Missions: ${missionIds.join(', ')}`);
            
            const gasEstimate = await this.contracts.guildMission.methods
                .registerChain(guild, missionIds, reward)
                .estimateGas({ from: fromAccount });
            
            const tx = await this.contracts.guildMission.methods
                .registerChain(guild, missionIds, reward)
                .send({
                    from: fromAccount,
                    gas: Math.floor(gasEstimate * 1.2)
                });
            
            console.log('✅ Mission chain created successfully');
            console.log(`📄 Transaction: ${tx.transactionHash}`);
            
            return {
                success: true,
                txHash: tx.transactionHash,
                chainId: `${guild}_${Date.now()}`
            };
            
        } catch (error) {
            console.error('❌ Failed to create mission chain:', error.message);
            return { success: false, error: error.message };
        }
    }

    async completeInfiltration(missionData, fromAccount) {
        try {
            console.log(`🎯 Recording infiltration mission completion`);
            console.log(`🎭 Mission: ${missionData.missionId}`);
            console.log(`🏢 Target: ${missionData.targetGuild}`);
            console.log(`💎 Asset: ${missionData.stolenAsset}`);
            console.log(`🚨 Detection: ${missionData.detectionLevel}%`);
            console.log(`✅ Success: ${missionData.successful}`);
            
            const gasEstimate = await this.contracts.guildMission.methods
                .completeInfiltrationMission(
                    missionData.missionId,
                    missionData.targetGuild,
                    missionData.stolenAsset,
                    missionData.detectionLevel,
                    missionData.successful
                )
                .estimateGas({ from: fromAccount });
            
            const tx = await this.contracts.guildMission.methods
                .completeInfiltrationMission(
                    missionData.missionId,
                    missionData.targetGuild,
                    missionData.stolenAsset,
                    missionData.detectionLevel,
                    missionData.successful
                )
                .send({
                    from: fromAccount,
                    gas: Math.floor(gasEstimate * 1.2)
                });
            
            console.log('🏆 Infiltration recorded on blockchain');
            console.log(`📄 Transaction: ${tx.transactionHash}`);
            
            // Get updated reputation
            const reputation = await this.getGuildReputation(missionData.infiltratorGuild);
            console.log(`📊 Updated Guild Reputation: ${reputation.reputationScore}`);
            
            return {
                success: true,
                txHash: tx.transactionHash,
                newReputation: reputation.reputationScore
            };
            
        } catch (error) {
            console.error('❌ Failed to record infiltration:', error.message);
            return { success: false, error: error.message };
        }
    }

    async createLegacy(remixData, fromAccount) {
        try {
            console.log(`🎨 Creating remix legacy: ${remixData.remixId}`);
            console.log(`📂 Category: ${remixData.category}`);
            
            const gasEstimate = await this.contracts.remixLegacy.methods
                .createLegacy(remixData.remixId, remixData.category)
                .estimateGas({ from: fromAccount });
            
            const tx = await this.contracts.remixLegacy.methods
                .createLegacy(remixData.remixId, remixData.category)
                .send({
                    from: fromAccount,
                    gas: Math.floor(gasEstimate * 1.2)
                });
            
            console.log('✅ Remix legacy created');
            console.log(`📄 Transaction: ${tx.transactionHash}`);
            
            return {
                success: true,
                txHash: tx.transactionHash,
                remixId: remixData.remixId
            };
            
        } catch (error) {
            console.error('❌ Failed to create legacy:', error.message);
            return { success: false, error: error.message };
        }
    }

    async updateLegacyMetrics(remixId, missions, views, awards, fromAccount) {
        try {
            console.log(`📈 Updating legacy metrics for: ${remixId}`);
            console.log(`🎯 Missions: ${missions}, 👁️ Views: ${views}, 🏆 Awards: ${awards}`);
            
            const gasEstimate = await this.contracts.remixLegacy.methods
                .updateLegacy(remixId, missions, views, awards)
                .estimateGas({ from: fromAccount });
            
            const tx = await this.contracts.remixLegacy.methods
                .updateLegacy(remixId, missions, views, awards)
                .send({
                    from: fromAccount,
                    gas: Math.floor(gasEstimate * 1.2)
                });
            
            const newScore = await this.contracts.remixLegacy.methods
                .getScore(remixId)
                .call();
            
            console.log('✅ Legacy metrics updated');
            console.log(`📊 New Score: ${newScore}`);
            console.log(`📄 Transaction: ${tx.transactionHash}`);
            
            return {
                success: true,
                txHash: tx.transactionHash,
                newScore: newScore
            };
            
        } catch (error) {
            console.error('❌ Failed to update legacy:', error.message);
            return { success: false, error: error.message };
        }
    }

    async createAward(awardData, fromAccount) {
        try {
            console.log(`🏆 Creating award: ${awardData.awardId}`);
            console.log(`📂 Category: ${awardData.category}`);
            console.log(`💎 Prestige Value: ${awardData.prestigeValue}`);
            console.log(`👥 Nominees: ${awardData.nominees.join(', ')}`);
            
            const gasEstimate = await this.contracts.remixLegacy.methods
                .createAward(
                    awardData.awardId,
                    awardData.category,
                    awardData.prestigeValue,
                    awardData.nominees
                )
                .estimateGas({ from: fromAccount });
            
            const tx = await this.contracts.remixLegacy.methods
                .createAward(
                    awardData.awardId,
                    awardData.category,
                    awardData.prestigeValue,
                    awardData.nominees
                )
                .send({
                    from: fromAccount,
                    gas: Math.floor(gasEstimate * 1.2)
                });
            
            console.log('✅ Award created successfully');
            console.log(`📄 Transaction: ${tx.transactionHash}`);
            
            return {
                success: true,
                txHash: tx.transactionHash,
                awardId: awardData.awardId
            };
            
        } catch (error) {
            console.error('❌ Failed to create award:', error.message);
            return { success: false, error: error.message };
        }
    }

    async startCeremony(ceremonyData, fromAccount) {
        try {
            console.log(`🎪 Starting award ceremony: ${ceremonyData.ceremonyId}`);
            console.log(`🎵 Music Remix: ${ceremonyData.musicRemixId}`);
            console.log(`🏆 Awards: ${ceremonyData.awardIds.join(', ')}`);
            
            const gasEstimate = await this.contracts.remixLegacy.methods
                .startCeremony(
                    ceremonyData.ceremonyId,
                    ceremonyData.awardIds,
                    ceremonyData.musicRemixId
                )
                .estimateGas({ from: fromAccount });
            
            const tx = await this.contracts.remixLegacy.methods
                .startCeremony(
                    ceremonyData.ceremonyId,
                    ceremonyData.awardIds,
                    ceremonyData.musicRemixId
                )
                .send({
                    from: fromAccount,
                    gas: Math.floor(gasEstimate * 1.2)
                });
            
            console.log('🎉 Award ceremony started!');
            console.log(`📄 Transaction: ${tx.transactionHash}`);
            
            return {
                success: true,
                txHash: tx.transactionHash,
                ceremonyId: ceremonyData.ceremonyId
            };
            
        } catch (error) {
            console.error('❌ Failed to start ceremony:', error.message);
            return { success: false, error: error.message };
        }
    }

    // View functions
    async getGuildReputation(guildId) {
        try {
            const reputation = await this.contracts.guildMission.methods
                .getGuildReputation(guildId)
                .call();
            
            return {
                guildId: reputation.guildId,
                totalPrestige: reputation.totalPrestige,
                successfulInfiltrations: reputation.successfulInfiltrations,
                failedInfiltrations: reputation.failedInfiltrations,
                assetsStolen: reputation.assetsStolen,
                assetsLost: reputation.assetsLost,
                reputationScore: reputation.reputationScore
            };
        } catch (error) {
            console.error('❌ Failed to get guild reputation:', error.message);
            return null;
        }
    }

    async getInfiltrationHistory(guildId) {
        try {
            const infiltrations = await this.contracts.guildMission.methods
                .getGuildInfiltrations(guildId)
                .call();
            
            return infiltrations.map(inf => ({
                missionId: inf.missionId,
                infiltrator: inf.infiltrator,
                targetGuild: inf.targetGuild,
                stolenAsset: inf.stolenAsset,
                timestamp: new Date(inf.timestamp * 1000),
                detectionLevel: inf.detectionLevel,
                successful: inf.successful,
                prestigeAwarded: inf.prestigeAwarded
            }));
        } catch (error) {
            console.error('❌ Failed to get infiltration history:', error.message);
            return [];
        }
    }

    async getTopLegacies(limit = 10) {
        try {
            const result = await this.contracts.remixLegacy.methods
                .getTopLegacies(limit)
                .call();
            
            const legacies = [];
            for (let i = 0; i < result.topRemixIds.length; i++) {
                if (result.topRemixIds[i]) {
                    legacies.push({
                        remixId: result.topRemixIds[i],
                        score: result.scores[i]
                    });
                }
            }
            
            return legacies;
        } catch (error) {
            console.error('❌ Failed to get top legacies:', error.message);
            return [];
        }
    }

    async getLegacyDetails(remixId) {
        try {
            const legacy = await this.contracts.remixLegacy.methods
                .getLegacy(remixId)
                .call();
            
            return {
                creator: legacy.creator,
                missionsSpawned: legacy.missionsSpawned,
                views: legacy.views,
                awards: legacy.awards,
                score: legacy.score,
                category: legacy.category,
                isActive: legacy.isActive
            };
        } catch (error) {
            console.error('❌ Failed to get legacy details:', error.message);
            return null;
        }
    }

    // Utility functions
    generateInfiltrationMissions(playerGuild, targetGuild, count = 3) {
        const MissionGenerator = require('./missiongen.js');
        const generator = new MissionGenerator();
        
        const missions = [];
        for (let i = 0; i < count; i++) {
            const mission = generator.generateInfiltrationMission(playerGuild, targetGuild);
            missions.push(mission.missionId);
        }
        
        return missions;
    }

    calculatePrestigeReward(missionCount, difficulty = 'medium') {
        const baseReward = 100;
        const difficultyMultiplier = {
            'easy': 1.0,
            'medium': 1.5,
            'hard': 2.0,
            'extreme': 3.0
        };
        
        return baseReward * missionCount * (difficultyMultiplier[difficulty] || 1.5);
    }

    // CLI interface
    static async runCLI() {
        const args = process.argv.slice(2);
        const command = args[0];
        
        // Configuration
        const config = {
            web3Provider: process.env.WEB3_PROVIDER || 'http://localhost:8545',
            contractAddresses: {
                guildMissionChain: process.env.GUILD_MISSION_CONTRACT || '0x...',
                remixLegacy: process.env.REMIX_LEGACY_CONTRACT || '0x...'
            },
            defaultAccount: process.env.DEFAULT_ACCOUNT || '0x...'
        };
        
        const chainForge = new ChainForge(config.web3Provider, config.contractAddresses);
        
        switch (command) {
            case 'create-chain':
                if (args.length < 4) {
                    console.log('Usage: node chainforge.js create-chain <guild> <target_guild> <mission_count> [difficulty]');
                    return;
                }
                
                const [, guild, targetGuild, missionCount, difficulty = 'medium'] = args;
                const missionIds = chainForge.generateInfiltrationMissions(guild, targetGuild, parseInt(missionCount));
                const reward = chainForge.calculatePrestigeReward(parseInt(missionCount), difficulty);
                
                const result = await chainForge.createMissionChain(guild, missionIds, reward, config.defaultAccount);
                console.log(result);
                break;
                
            case 'complete-infiltration':
                if (args.length < 6) {
                    console.log('Usage: node chainforge.js complete-infiltration <mission_id> <target_guild> <stolen_asset> <detection_level> <successful>');
                    return;
                }
                
                const [, missionId, tGuild, stolenAsset, detectionLevel, successful] = args;
                const missionData = {
                    missionId,
                    targetGuild: tGuild,
                    stolenAsset,
                    detectionLevel: parseInt(detectionLevel),
                    successful: successful === 'true',
                    infiltratorGuild: 'MythicDrift' // This would be detected from the user
                };
                
                const infResult = await chainForge.completeInfiltration(missionData, config.defaultAccount);
                console.log(infResult);
                break;
                
            case 'guild-stats':
                if (args.length < 2) {
                    console.log('Usage: node chainforge.js guild-stats <guild_id>');
                    return;
                }
                
                const guildId = args[1];
                const reputation = await chainForge.getGuildReputation(guildId);
                const history = await chainForge.getInfiltrationHistory(guildId);
                
                console.log('🏢 Guild Statistics:');
                console.log(`  Guild: ${reputation.guildId}`);
                console.log(`  Reputation: ${reputation.reputationScore}`);
                console.log(`  Total Prestige: ${reputation.totalPrestige}`);
                console.log(`  Successful Infiltrations: ${reputation.successfulInfiltrations}`);
                console.log(`  Failed Infiltrations: ${reputation.failedInfiltrations}`);
                console.log(`  Assets Stolen: ${reputation.assetsStolen}`);
                console.log(`  Assets Lost: ${reputation.assetsLost}`);
                console.log(`\n📋 Recent Infiltrations: ${history.length}`);
                break;
                
            case 'top-legacies':
                const limit = args[1] ? parseInt(args[1]) : 10;
                const topLegacies = await chainForge.getTopLegacies(limit);
                
                console.log(`🏆 Top ${limit} Remix Legacies:`);
                topLegacies.forEach((legacy, index) => {
                    console.log(`  ${index + 1}. ${legacy.remixId} - Score: ${legacy.score}`);
                });
                break;
                
            default:
                console.log('Available commands:');
                console.log('  create-chain <guild> <target_guild> <mission_count> [difficulty]');
                console.log('  complete-infiltration <mission_id> <target_guild> <stolen_asset> <detection_level> <successful>');
                console.log('  guild-stats <guild_id>');
                console.log('  top-legacies [limit]');
                break;
        }
    }
}

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ChainForge;
}

// Run CLI if called directly
if (require.main === module) {
    ChainForge.runCLI().catch(console.error);
}