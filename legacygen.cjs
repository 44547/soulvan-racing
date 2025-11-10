// legacygen.js - Legacy Mission Generator for Soulvan Racing
const fs = require("fs");

// Core mission template matching Unity LegacyMission structure
const midnightSyndicateLegacyRun = {
  title: "Midnight Syndicate Legacy Run",
  description: "A high-stakes escape through the neon-lit streets as The Syndicate closes in. Every turn could be your last, every drift a step closer to legend.",
  difficulty: "Legendary",
  tags: ["escape", "pursuit", "cinematic", "legacy", "blockchain", "dao"],
  acts: [
    {
      title: "The Callout",
      zone: "Neon Drift District",
      objective: "Escape the city grid before zone lockdown",
      steps: [
        "🎬 Witness Syndicate vault hijack cutscene",
        "🏃‍♂️ Navigate high-speed tunnel sequence with destructible set pieces",
        "🚔 Evade adaptive cop pursuit with dynamic AI logic",
        "🎵 Experience Trap × Synthwave × Sirens dynamic soundtrack",
        "🚪 Reach zone exit before lockdown timer expires"
      ],
      gameplay_features: [
        "destructible_environment",
        "adaptive_ai_pursuit", 
        "dynamic_music_mixing",
        "cinematic_cutscenes",
        "timer_based_objectives"
      ],
      scoring_weights: {
        speed: 1.2,
        destruction: 1.5,
        evasion: 1.8,
        style: 1.0
      }
    },
    {
      title: "Legacy Drift",  
      zone: "Mythic Mountain Pass",
      objective: "Out-drift Kaze in foggy canyon duel",
      steps: [
        "🌄 Navigate to mountain pass with dynamic weather transition",
        "🌫️ Master foggy conditions and rain physics",
        "⚔️ Face Kaze (Syndicate lieutenant) in drift challenge", 
        "🎤 Experience iconic voiceover: 'You want legacy? Earn it sideways.'",
        "📊 Achieve CLIP-based originality score for drift creativity"
      ],
      gameplay_features: [
        "dynamic_weather_system",
        "clip_based_originality_scoring",
        "ai_opponent_kaze",
        "mountain_physics",
        "voiceover_integration"
      ],
      scoring_weights: {
        drift_angle: 2.0,
        originality: 2.5,
        consistency: 1.5,
        speed: 1.0
      }
    },
    {
      title: "The Bridge Job",
      zone: "Industrial Freight Corridor", 
      objective: "Hijack moving armored truck mid-race",
      steps: [
        "🚛 Catch up to armored convoy at high speed",
        "🦘 Execute precision vehicle-to-vehicle jump sequence",
        "⚡ Complete QuickTime events for truck boarding",
        "🚁 Deploy grappling drone to disable escort vehicles",
        "🎬 Trigger cinematic slow-mo replay system on success"
      ],
      gameplay_features: [
        "quicktime_event_system",
        "grappling_drone_mechanics",
        "cinematic_slow_motion_replays",
        "vehicle_to_vehicle_physics",
        "convoy_ai_behavior"
      ],
      scoring_weights: {
        airtime: 2.0,
        precision: 2.2,
        timing: 1.8,
        style: 1.5
      }
    },
    {
      title: "Heat Level 5",
      zone: "Downtown Core",
      objective: "Escape 5-star pursuit with multiple route choices",
      steps: [
        "🔥 Trigger maximum heat level with Syndicate and zone security",
        "🛣️ Choose escape route: rooftop jump, subway drift, or sewer dive",
        "🎥 Experience Fast & Furious-style dynamic camera shifts",
        "🎵 Immerse in SoulvanMusic AI remix: Orchestral × Trap × Sirens",
        "🏠 Reach safe zone to complete escape sequence"
      ],
      gameplay_features: [
        "multiple_escape_routes",
        "dynamic_camera_system", 
        "fast_and_furious_cinematics",
        "adaptive_music_remixing",
        "heat_level_management"
      ],
      scoring_weights: {
        near_misses: 2.5,
        route_creativity: 1.8,
        speed_sustained: 1.6,
        evasion_skill: 2.0
      }
    },
    {
      title: "Legacy Unlocked",
      zone: "Contributor's Guild Arena",
      objective: "Upload replay → remix → vote → claim legendary status",
      steps: [
        "📤 Upload your replay to blockchain for community scoring",
        "📊 Replay scoring: airtime × 2, flips × 3, near misses × 5, style × 1",
        "🗳️ DAO votes on best remix performance to unlock rewards",
        "🚗 Unlock Legacy Hypercar: SolusGT_Mythic upon approval",
        "🏆 Participate in award ceremony with cinematic trailer"
      ],
      gameplay_features: [
        "blockchain_replay_upload",
        "dao_community_voting",
        "vehicle_unlock_system",
        "award_ceremony_cinematics",
        "contributor_voiceover_integration"
      ],
      scoring_weights: {
        overall_performance: 1.0,
        community_votes: 3.0,
        originality_bonus: 2.0,
        contributor_reputation: 1.5
      }
    }
  ],
  contributor_hooks: {
    remix_to_mission: {
      enabled: true,
      description: "Convert any replay into new override mission variants",
      styles: ["stealth_infiltration", "time_attack_racing", "destruction_carnage"]
    },
    voiceover_voting: {
      enabled: true,
      description: "Community submits and votes on character voice lines",
      characters: ["Kaze", "Syndicate", "Announcer"],
      approval_threshold: 15
    },
    guild_prestige: {
      enabled: true,
      description: "Top guild unlocks exclusive content",
      rewards: ["exclusive_tuning_kit", "cinematic_trailer_slot", "special_vehicle_access"]
    },
    trailer_forge: {
      enabled: true,
      description: "Create Fast & Furious-style trailers from mission replays",
      styles: ["action_packed", "cinematic_epic", "street_racing"]
    }
  },
  replay_scoring: {
    components: {
      airtime: { weight: 2, description: "Total time spent airborne" },
      flips: { weight: 3, description: "Full and partial vehicle rotations" },
      near_misses: { weight: 5, description: "Close calls with obstacles/vehicles" },
      style_bonus: { weight: 1, description: "Subjective style and flair points" }
    },
    sample_scores: {
      replay_a: { airtime: 12, flips: 4, near_misses: 8, style_bonus: 15, total: 71 },
      replay_b: { airtime: 8, flips: 6, near_misses: 12, style_bonus: 10, total: 88 },
      replay_c: { airtime: 15, flips: 2, near_misses: 18, style_bonus: 12, total: 130 }
    }
  },
  blockchain_integration: {
    soulvan_coin_rewards: {
      act_completion: 100,
      mission_completion: 500,
      dao_vote_participation: 5,
      content_creation: 150
    },
    dao_voting: {
      proposal_creation: "Any contributor can submit mission remixes",
      voting_power: "Reputation-based weighting system", 
      implementation: "Automatic execution upon community approval"
    }
  }
};

// Generate legacy mission file
function generateLegacyMission() {
  console.log("🎮 Soulvan Racing - Legacy Mission Generator");
  console.log("=" .repeat(50));
  
  try {
    // Create StreamingAssets directory if it doesn't exist
    const streamingAssetsDir = "./StreamingAssets";
    if (!fs.existsSync(streamingAssetsDir)) {
      fs.mkdirSync(streamingAssetsDir, { recursive: true });
      console.log("📁 Created StreamingAssets directory");
    }
    
    // Write main mission file
    const missionPath = `${streamingAssetsDir}/midnight_syndicate_legacy_run.json`;
    fs.writeFileSync(missionPath, JSON.stringify(midnightSyndicateLegacyRun, null, 2));
    console.log(`✅ Legacy mission generated: ${missionPath}`);
    
    // Write Unity-compatible version (simplified structure)
    const unityMission = {
      title: midnightSyndicateLegacyRun.title,
      description: midnightSyndicateLegacyRun.description,
      acts: midnightSyndicateLegacyRun.acts.map(act => ({
        title: act.title,
        zone: act.zone,
        objective: act.objective,
        steps: act.steps,
        gameplay_features: act.gameplay_features
      }))
    };
    
    const unityPath = `${streamingAssetsDir}/LegacyMission.json`;
    fs.writeFileSync(unityPath, JSON.stringify(unityMission, null, 2));
    console.log(`✅ Unity mission file generated: ${unityPath}`);
    
    // Generate mission statistics
    console.log("\n📊 Mission Statistics:");
    console.log(`   Title: ${midnightSyndicateLegacyRun.title}`);
    console.log(`   Acts: ${midnightSyndicateLegacyRun.acts.length}`);
    console.log(`   Difficulty: ${midnightSyndicateLegacyRun.difficulty}`);
    console.log(`   Contributor Hooks: ${Object.keys(midnightSyndicateLegacyRun.contributor_hooks).length}`);
    
    // Display scoring breakdown
    console.log("\n🔢 Replay Scoring Breakdown:");
    console.log("Each replay's total score is calculated using weighted components:");
    Object.entries(midnightSyndicateLegacyRun.replay_scoring.components).forEach(([key, value]) => {
      console.log(`• ${key.charAt(0).toUpperCase() + key.slice(1)} × ${value.weight} - ${value.description}`);
    });
    
    console.log("\n📈 Sample Scores:");
    Object.entries(midnightSyndicateLegacyRun.replay_scoring.sample_scores).forEach(([replayId, scores]) => {
      const breakdown = `A:${scores.airtime} F:${scores.flips} NM:${scores.near_misses} S:${scores.style_bonus}`;
      console.log(`🎯 ${replayId.toUpperCase()}: ${breakdown} = ${scores.total} total`);
    });
    
    // Show contributor features
    console.log("\n🧩 Contributor Integration:");
    Object.entries(midnightSyndicateLegacyRun.contributor_hooks).forEach(([hook, config]) => {
      console.log(`• ${hook.replace(/_/g, ' ').toUpperCase()}: ${config.description}`);
    });
    
    console.log("\n💰 Blockchain Rewards:");
    Object.entries(midnightSyndicateLegacyRun.blockchain_integration.soulvan_coin_rewards).forEach(([action, reward]) => {
      console.log(`• ${action.replace(/_/g, ' ')}: ${reward} SOUL`);
    });
    
    console.log("\n🏆 Mission generated successfully!");
    console.log("Ready to load in Unity LegacyMissionLoader component.");
    
  } catch (error) {
    console.error("❌ Failed to generate legacy mission:", error.message);
    process.exit(1);
  }
}

// Generate visualization data for replay scoring
function generateScoringVisualization() {
  const scores = midnightSyndicateLegacyRun.replay_scoring.sample_scores;
  const weights = midnightSyndicateLegacyRun.replay_scoring.components;
  
  console.log("\n📊 Scoring Visualization Data:");
  console.log("Copy this data for chart generation:");
  
  const visualizationData = {
    replays: Object.keys(scores),
    components: Object.keys(weights),
    weights: Object.values(weights).map(w => w.weight),
    scores: Object.values(scores)
  };
  
  console.log(JSON.stringify(visualizationData, null, 2));
}

// Command line interface
function main() {
  const args = process.argv.slice(2);
  
  if (args.includes('--help') || args.includes('-h')) {
    console.log("Soulvan Racing Legacy Mission Generator");
    console.log("");
    console.log("Usage:");
    console.log("  node legacygen.js                 Generate legacy mission");
    console.log("  node legacygen.js --viz           Generate scoring visualization");
    console.log("  node legacygen.js --help          Show this help");
    return;
  }
  
  if (args.includes('--viz')) {
    generateScoringVisualization();
    return;
  }
  
  generateLegacyMission();
}

// Advanced Graphics & AI Integration
function generateAdvancedSystemsIntegration() {
  console.log("\n🎬 Advanced Systems Integration");
  console.log("=" .repeat(50));
  
  const advancedSystemsConfig = {
    graphics_pipeline: {
      hdrp_ultra: {
        enabled: true,
        render_scale: 1.0,
        ray_tracing: true,
        dlss_mode: "Quality",
        texture_resolution: "8K",
        lighting_preset: "Cinematic"
      },
      performance_monitoring: {
        adaptive_quality: true,
        target_fps: 60,
        min_render_scale: 0.7,
        max_render_scale: 1.5
      },
      cinematic_effects: {
        motion_blur: true,
        depth_of_field: true,
        bloom_intensity: 1.2,
        color_grading: "Fast_and_Furious"
      }
    },
    ai_behavior: {
      adaptive_ai: {
        learning_enabled: true,
        skill_adaptation: true,
        replay_integration: true,
        faction_behavior: ["Syndicate", "Rebels", "Police", "Contributors"]
      },
      driver_logic: {
        traffic_prediction: true,
        evasive_maneuvers: true,
        aggression_scaling: true,
        performance_tracking: true
      },
      combat_ai: {
        cover_seeking: true,
        aim_prediction: true,
        weapon_switching: true,
        crowd_reactions: true
      }
    },
    replay_scoring_enhanced: {
      graphics_quality_bonus: {
        hdrp_multiplier: 1.2,
        ray_tracing_bonus: 0.3,
        dlss_efficiency: 0.2,
        texture_fidelity: 0.1
      },
      ai_interaction_scoring: {
        evasion_skill: { weight: 4, description: "AI evasion maneuvers executed" },
        combat_tactics: { weight: 3, description: "Strategic combat encounters" },
        crowd_impact: { weight: 2, description: "Crowd reaction generation" },
        faction_diplomacy: { weight: 5, description: "Faction relationship changes" }
      },
      cinematic_scoring: {
        camera_work: { weight: 2, description: "Dynamic camera angle usage" },
        lighting_utilization: { weight: 1.5, description: "Cinematic lighting moments" },
        weather_interaction: { weight: 1.8, description: "Dynamic weather usage" },
        set_piece_destruction: { weight: 3, description: "Environment interaction" }
      }
    },
    blockchain_rewards_enhanced: {
      graphics_achievement_multipliers: {
        "4K_Native": 1.1,
        "8K_Upscaled": 1.3,
        "Ray_Tracing_Master": 1.5,
        "DLSS_Efficiency": 1.2
      },
      ai_mastery_rewards: {
        "Traffic_Whisperer": 200, // Perfect traffic prediction
        "Combat_Tactician": 300,  // Strategic combat victories
        "Crowd_Pleaser": 150,     // Maximum crowd reactions
        "Faction_Diplomat": 500   // Faction relationship mastery
      },
      contributor_creation_bonuses: {
        "Graphics_Preset_Creator": 400,
        "AI_Behavior_Designer": 350,
        "Cinematic_Director": 600,
        "Scoring_Algorithm_Contributor": 750
      }
    }
  };
  
  // Write advanced systems configuration
  const advancedConfigPath = "./StreamingAssets/advanced_systems_config.json";
  fs.writeFileSync(advancedConfigPath, JSON.stringify(advancedSystemsConfig, null, 2));
  console.log(`✅ Advanced systems config generated: ${advancedConfigPath}`);
  
  // Generate Unity integration script
  generateUnityAdvancedIntegration(advancedSystemsConfig);
  
  return advancedSystemsConfig;
}

function generateUnityAdvancedIntegration(config) {
  const unityScript = `// Generated Unity Integration for Advanced Systems
using UnityEngine;
using System.Collections.Generic;

namespace SoulvanRacing.Generated
{
    public class AdvancedSystemsManager : MonoBehaviour
    {
        [Header("🎬 Graphics Integration")]
        public GraphicsConfigurator graphicsController;
        
        [Header("🤖 AI Integration")]
        public AdaptiveAI[] aiAgents;
        
        [Header("📊 Enhanced Scoring")]
        public BlockchainReplayScorer enhancedScorer;
        
        private AdvancedSystemsConfig config;
        
        void Start()
        {
            LoadAdvancedConfig();
            InitializeGraphicsIntegration();
            InitializeAIIntegration();
            InitializeEnhancedScoring();
        }
        
        void LoadAdvancedConfig()
        {
            string configPath = Application.streamingAssetsPath + "/advanced_systems_config.json";
            if (System.IO.File.Exists(configPath))
            {
                string jsonData = System.IO.File.ReadAllText(configPath);
                // Parse JSON configuration
                Debug.Log("🔧 Advanced systems configuration loaded");
            }
        }
        
        void InitializeGraphicsIntegration()
        {
            if (graphicsController != null)
            {
                // Configure HDRP Ultra pipeline
                graphicsController.SetRenderScale(${config.graphics_pipeline.hdrp_ultra.render_scale}f);
                
                // Enable ray tracing if supported
                if (SystemInfo.supportsRayTracing)
                {
                    Debug.Log("⚡ Ray tracing enabled for enhanced replay scoring");
                }
                
                Debug.Log("🖼️ Graphics integration initialized");
            }
        }
        
        void InitializeAIIntegration()
        {
            foreach (AdaptiveAI ai in aiAgents)
            {
                if (ai != null)
                {
                    // Enable learning from blockchain replays
                    ai.enableLearning = true;
                    
                    // Configure faction-based behavior
                    ConfigureAIBehavior(ai);
                }
            }
            
            Debug.Log("🤖 AI integration initialized");
        }
        
        void ConfigureAIBehavior(AdaptiveAI ai)
        {
            // Set AI parameters based on advanced configuration
            ai.SetSkillLevel(Random.Range(0.6f, 0.9f));
            ai.SetAggression(Random.Range(0.3f, 0.8f));
        }
        
        void InitializeEnhancedScoring()
        {
            if (enhancedScorer != null)
            {
                // Configure enhanced scoring with graphics and AI bonuses
                enhancedScorer.EnableGraphicsQualityBonus(true);
                enhancedScorer.EnableAIInteractionScoring(true);
                enhancedScorer.EnableCinematicScoring(true);
                
                Debug.Log("📊 Enhanced scoring initialized");
            }
        }
        
        public float CalculateAdvancedReplayScore(ReplayData replay)
        {
            float baseScore = replay.GetBaseScore();
            float graphicsBonus = CalculateGraphicsBonus(replay);
            float aiBonus = CalculateAIInteractionBonus(replay);
            float cinematicBonus = CalculateCinematicBonus(replay);
            
            float totalScore = baseScore + graphicsBonus + aiBonus + cinematicBonus;
            
            Debug.Log($"📊 Advanced Replay Score Breakdown:");
            Debug.Log($"   Base Score: {baseScore:F1}");
            Debug.Log($"   Graphics Bonus: {graphicsBonus:F1}");
            Debug.Log($"   AI Interaction: {aiBonus:F1}");
            Debug.Log($"   Cinematic Bonus: {cinematicBonus:F1}");
            Debug.Log($"   Total Score: {totalScore:F1}");
            
            return totalScore;
        }
        
        float CalculateGraphicsBonus(ReplayData replay)
        {
            float bonus = 0f;
            
            // HDRP bonus
            if (replay.wasRecordedWithHDRP) bonus += replay.baseScore * 0.2f;
            
            // Ray tracing bonus
            if (replay.rayTracingEnabled) bonus += replay.baseScore * 0.3f;
            
            // DLSS efficiency bonus
            if (replay.dlssEnabled) bonus += replay.baseScore * 0.2f;
            
            // 8K texture bonus
            if (replay.textureQuality >= 8192) bonus += replay.baseScore * 0.1f;
            
            return bonus;
        }
        
        float CalculateAIInteractionBonus(ReplayData replay)
        {
            float bonus = 0f;
            
            // AI evasion bonus
            bonus += replay.aiEvasionManeuvers * 4f;
            
            // Combat tactics bonus
            bonus += replay.combatEncounters * 3f;
            
            // Crowd reaction bonus
            bonus += replay.crowdReactions * 2f;
            
            // Faction diplomacy bonus
            bonus += replay.factionInteractions * 5f;
            
            return bonus;
        }
        
        float CalculateCinematicBonus(ReplayData replay)
        {
            float bonus = 0f;
            
            // Camera work bonus
            bonus += replay.dynamicCameraUsage * 2f;
            
            // Lighting utilization bonus
            bonus += replay.cinematicLightingMoments * 1.5f;
            
            // Weather interaction bonus
            bonus += replay.weatherInteractions * 1.8f;
            
            // Set piece destruction bonus
            bonus += replay.environmentDestruction * 3f;
            
            return bonus;
        }
    }
    
    [System.Serializable]
    public class AdvancedSystemsConfig
    {
        public GraphicsPipelineConfig graphics;
        public AIBehaviorConfig aiBehavior;
        public EnhancedScoringConfig scoring;
        public BlockchainRewardsConfig rewards;
    }
    
    [System.Serializable]
    public class ReplayData
    {
        public float baseScore;
        public bool wasRecordedWithHDRP;
        public bool rayTracingEnabled;
        public bool dlssEnabled;
        public int textureQuality;
        public int aiEvasionManeuvers;
        public int combatEncounters;
        public int crowdReactions;
        public int factionInteractions;
        public float dynamicCameraUsage;
        public int cinematicLightingMoments;
        public float weatherInteractions;
        public int environmentDestruction;
        
        public float GetBaseScore()
        {
            // Calculate base score using original formula
            // (Airtime × 2) + (Flips × 3) + (Near Misses × 5) + (Style × 1)
            return baseScore;
        }
    }
}`;
  
  // Write Unity integration script
  const unityScriptPath = "./Assets/Scripts/Generated/AdvancedSystemsManager.cs";
  const scriptsDir = "./Assets/Scripts/Generated";
  
  if (!fs.existsSync(scriptsDir)) {
    fs.mkdirSync(scriptsDir, { recursive: true });
  }
  
  fs.writeFileSync(unityScriptPath, unityScript);
  console.log(`✅ Unity advanced integration script generated: ${unityScriptPath}`);
}

function generateBlockchainScoringVisualization() {
  console.log("\n📊 Blockchain Scoring Visualization");
  console.log("=" .repeat(50));
  
  const scoringBreakdown = {
    traditional_components: {
      airtime: { weight: 2, sample: 15, score: 30 },
      flips: { weight: 3, sample: 6, score: 18 },
      near_misses: { weight: 5, sample: 12, score: 60 },
      style_bonus: { weight: 1, sample: 20, score: 20 }
    },
    enhanced_components: {
      graphics_quality: { weight: 1.2, sample: 85, score: 102 },
      ai_interaction: { weight: 3.5, sample: 8, score: 28 },
      cinematic_usage: { weight: 2.2, sample: 12, score: 26.4 },
      crowd_impact: { weight: 1.8, sample: 15, score: 27 }
    }
  };
  
  let traditionalTotal = 0;
  let enhancedTotal = 0;
  
  console.log("🏁 Traditional Scoring Components:");
  Object.entries(scoringBreakdown.traditional_components).forEach(([key, data]) => {
    console.log(`• ${key.replace('_', ' ').toUpperCase()}: ${data.sample} × ${data.weight} = ${data.score} points`);
    traditionalTotal += data.score;
  });
  
  console.log(`\n📊 Traditional Total: ${traditionalTotal} points`);
  
  console.log("\n🚀 Enhanced Scoring Components:");
  Object.entries(scoringBreakdown.enhanced_components).forEach(([key, data]) => {
    console.log(`• ${key.replace('_', ' ').toUpperCase()}: ${data.sample} × ${data.weight} = ${data.score} points`);
    enhancedTotal += data.score;
  });
  
  console.log(`\n📈 Enhanced Total: ${enhancedTotal} points`);
  console.log(`\n🏆 Grand Total: ${traditionalTotal + enhancedTotal} points`);
  console.log(`\n💰 Blockchain Reward: ${Math.floor((traditionalTotal + enhancedTotal) / 10)} SOUL tokens`);
  
  // Generate chart data
  const chartData = {
    labels: [
      ...Object.keys(scoringBreakdown.traditional_components),
      ...Object.keys(scoringBreakdown.enhanced_components)
    ],
    values: [
      ...Object.values(scoringBreakdown.traditional_components).map(d => d.score),
      ...Object.values(scoringBreakdown.enhanced_components).map(d => d.score)
    ],
    colors: [
      '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', // Traditional
      '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F'  // Enhanced
    ]
  };
  
  console.log("\n📈 Chart Visualization Data:");
  console.log(JSON.stringify(chartData, null, 2));
  
  return chartData;
}

// Enhanced main function
function enhancedMain() {
  const args = process.argv.slice(2);
  
  if (args.includes('--help') || args.includes('-h')) {
    console.log("🎮 Soulvan Racing Enhanced Legacy Mission Generator");
    console.log("");
    console.log("Usage:");
    console.log("  node legacygen.js                    Generate legacy mission");
    console.log("  node legacygen.js --advanced         Generate advanced systems integration");
    console.log("  node legacygen.js --scoring          Generate enhanced blockchain scoring");
    console.log("  node legacygen.js --viz              Generate scoring visualization");
    console.log("  node legacygen.js --all              Generate everything");
    console.log("  node legacygen.js --help             Show this help");
    return;
  }
  
  if (args.includes('--advanced')) {
    generateAdvancedSystemsIntegration();
    return;
  }
  
  if (args.includes('--scoring')) {
    generateBlockchainScoringVisualization();
    return;
  }
  
  if (args.includes('--viz')) {
    generateScoringVisualization();
    return;
  }
  
  if (args.includes('--all')) {
    generateLegacyMission();
    generateAdvancedSystemsIntegration();
    generateBlockchainScoringVisualization();
    return;
  }
  
  // Default: generate legacy mission
  generateLegacyMission();
}

// Execute if called directly
if (require.main === module) {
  enhancedMain();
}

module.exports = {
  generateLegacyMission,
  generateScoringVisualization,
  generateAdvancedSystemsIntegration,
  generateBlockchainScoringVisualization,
  midnightSyndicateLegacyRun
};