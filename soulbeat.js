const fs = require("fs");
const crypto = require("crypto");

// SoulBeat - Music Generation Tied to Wallet + Vehicle Style
function generateMusic(walletAddress, vehicleStyle, mood = "Cinematic") {
    const musicProfiles = {
        "Shadow Drift": {
            genre: "Dark Trap",
            tempo: "140 BPM",
            instruments: ["808 Bass", "Dark Synths", "Trap Snares", "Atmospheric Pads"],
            characteristics: ["Mysterious", "Aggressive", "Underground"]
        },
        "Neon Runner": {
            genre: "Synthwave",
            tempo: "128 BPM", 
            instruments: ["Analog Synths", "Electric Guitar", "Drum Machine", "Vocoder"],
            characteristics: ["Retro", "Energetic", "Nostalgic"]
        },
        "Apex Hunter": {
            genre: "Hybrid Orchestral",
            tempo: "150 BPM",
            instruments: ["Orchestra", "Electronic Drums", "Epic Brass", "Cinematic Strings"],
            characteristics: ["Epic", "Powerful", "Dramatic"]
        },
        "Soul Phantom": {
            genre: "Ambient Electronica",
            tempo: "110 BPM",
            instruments: ["Ethereal Pads", "Glitch Effects", "Soft Piano", "Atmospheric Textures"],
            characteristics: ["Ethereal", "Contemplative", "Mystical"]
        }
    };

    // Determine genre based on vehicle style
    let profile = musicProfiles["Neon Runner"]; // Default
    
    if (vehicleStyle.includes("Shadow")) profile = musicProfiles["Shadow Drift"];
    if (vehicleStyle.includes("Apex") || vehicleStyle.includes("Predator")) profile = musicProfiles["Apex Hunter"];
    if (vehicleStyle.includes("Soul") || vehicleStyle.includes("Phantom")) profile = musicProfiles["Soul Phantom"];
    if (vehicleStyle.includes("Neon") || vehicleStyle.includes("Runner")) profile = musicProfiles["Neon Runner"];

    const trackId = `${walletAddress.slice(-8)}_${vehicleStyle.replace(/\s+/g, '')}_${Date.now()}`;
    
    const musicTrack = {
        trackId,
        wallet: walletAddress,
        vehicleStyle,
        genre: profile.genre,
        mood: mood,
        createdAt: new Date().toISOString(),
        profile: profile,
        composition: {
            structure: ["Intro (8 bars)", "Verse (16 bars)", "Chorus (8 bars)", "Bridge (8 bars)", "Outro (4 bars)"],
            key: generateRandomKey(),
            scale: "Minor",
            duration: "2:30"
        },
        aiGeneration: {
            seed: crypto.randomBytes(8).toString('hex'),
            model: "SoulvanAI_v2.5",
            quality: "Studio",
            renderStatus: "Queued"
        },
        metadata: {
            bpm: profile.tempo,
            instruments: profile.instruments,
            tags: [...profile.characteristics, vehicleStyle, mood],
            licenseType: "Creative Commons - Attribution"
        }
    };

    const filename = `${trackId}_beat.json`;
    fs.writeFileSync(filename, JSON.stringify(musicTrack, null, 2));
    
    console.log(`🎵 Music Track Generated: ${trackId}`);
    console.log(`🎸 Genre: ${profile.genre} | Style: ${vehicleStyle}`);
    console.log(`🎼 Key: ${musicTrack.composition.key} | BPM: ${profile.tempo}`);
    console.log(`🎹 Instruments: ${profile.instruments.join(', ')}`);
    
    return musicTrack;
}

function generateRandomKey() {
    const keys = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    return keys[Math.floor(Math.random() * keys.length)];
}

// Advanced Music Customization
function customizeTrack(trackId, customizations) {
    try {
        const trackFile = `${trackId}_beat.json`;
        if (!fs.existsSync(trackFile)) {
            console.error(`❌ Track not found: ${trackId}`);
            return null;
        }
        
        const track = JSON.parse(fs.readFileSync(trackFile, 'utf8'));
        
        // Apply customizations
        if (customizations.tempo) {
            track.profile.tempo = customizations.tempo;
            track.metadata.bpm = customizations.tempo;
        }
        
        if (customizations.instruments) {
            track.profile.instruments = [...track.profile.instruments, ...customizations.instruments];
        }
        
        if (customizations.mood) {
            track.mood = customizations.mood;
            track.metadata.tags = track.metadata.tags.filter(tag => !['Cinematic', 'Epic', 'Chill', 'Aggressive'].includes(tag));
            track.metadata.tags.push(customizations.mood);
        }
        
        if (customizations.effects) {
            track.aiGeneration.effects = customizations.effects;
        }
        
        // Update modification timestamp
        track.lastModified = new Date().toISOString();
        track.version = (track.version || 1) + 1;
        
        fs.writeFileSync(trackFile, JSON.stringify(track, null, 2));
        
        console.log(`🎛️ Track Customized: ${trackId} v${track.version}`);
        console.log(`🔧 Applied: ${Object.keys(customizations).join(', ')}`);
        
        return track;
        
    } catch (error) {
        console.error(`❌ Failed to customize track: ${error.message}`);
        return null;
    }
}

// Faction Theme Generator
function generateFactionTheme(factionName, characteristics) {
    const factionProfiles = {
        "MythicDrift": {
            signature: "Ethereal drifts with mystical undertones",
            instruments: ["Ethereal Synths", "Drift Engine Sounds", "Mystical Chimes", "Deep Bass"],
            mood: "Mysterious yet powerful"
        },
        "SoulVanguard": {
            signature: "Tactical precision with orchestral elements",
            instruments: ["Military Drums", "Strategic Strings", "Electronic Warfare", "Heroic Brass"],
            mood: "Determined and noble"
        },
        "NeonRunners": {
            signature: "Street racing with cyberpunk energy",
            instruments: ["Neon Synths", "Street Beats", "Electric Guitar", "Urban Ambience"],
            mood: "Fast and rebellious"
        },
        "ApexPredators": {
            signature: "Dominant hunting theme with primal power",
            instruments: ["Predatory Bass", "Hunting Horns", "Power Drums", "Apex Synths"],
            mood: "Aggressive and commanding"
        }
    };
    
    const profile = factionProfiles[factionName] || factionProfiles["NeonRunners"];
    
    const factionTheme = {
        themeId: `FACTION_${factionName}_THEME_${Date.now()}`,
        factionName,
        signature: profile.signature,
        characteristics: characteristics || profile.mood,
        composition: {
            mainTheme: `${factionName} Anthem`,
            combatTheme: `${factionName} War Drums`,
            victoryTheme: `${factionName} Triumph`,
            ambientTheme: `${factionName} Territory`
        },
        instruments: profile.instruments,
        createdAt: new Date().toISOString(),
        usage: {
            factionIntros: true,
            territoryAmbient: true,
            combatSituations: true,
            victoryMoments: true
        }
    };
    
    const filename = `${factionTheme.themeId}.json`;
    fs.writeFileSync(filename, JSON.stringify(factionTheme, null, 2));
    
    console.log(`🏴 Faction Theme Generated: ${factionName}`);
    console.log(`🎵 Signature: ${profile.signature}`);
    console.log(`🎼 Themes: ${Object.values(factionTheme.composition).join(', ')}`);
    
    return factionTheme;
}

// Dynamic Soundtrack System
function createDynamicSoundtrack(scenarioType, intensity = 0.5, factionInfluence = null) {
    const scenarios = {
        "Racing": {
            baseTrack: "High_Speed_Chase",
            intensityLayers: ["Engine_Roar", "Adrenaline_Synths", "Victory_Horns"],
            adaptiveElements: true
        },
        "Infiltration": {
            baseTrack: "Stealth_Ambient",
            intensityLayers: ["Tension_Strings", "Heartbeat_Bass", "Alert_Stingers"],
            adaptiveElements: true
        },
        "Combat": {
            baseTrack: "Battle_Drums",
            intensityLayers: ["War_Horns", "Clash_Effects", "Epic_Choir"],
            adaptiveElements: true
        },
        "Exploration": {
            baseTrack: "Zone_Ambient",
            intensityLayers: ["Discovery_Chimes", "Wonder_Pads", "Lore_Whispers"],
            adaptiveElements: false
        }
    };
    
    const scenario = scenarios[scenarioType] || scenarios["Exploration"];
    
    const soundtrack = {
        soundtrackId: `DYNAMIC_${scenarioType}_${Date.now()}`,
        scenarioType,
        intensity,
        factionInfluence,
        baseTrack: scenario.baseTrack,
        activeLayers: scenario.intensityLayers.slice(0, Math.ceil(intensity * scenario.intensityLayers.length)),
        adaptiveConfig: {
            enabled: scenario.adaptiveElements,
            intensityThresholds: [0.2, 0.5, 0.8],
            fadeTransitions: true,
            contextAware: true
        },
        factionModifications: factionInfluence ? {
            instrumentOverlay: `${factionInfluence}_Signature_Instruments`,
            harmonicShift: `${factionInfluence}_Key_Preference`,
            rhythmicPattern: `${factionInfluence}_Beat_Style`
        } : null,
        createdAt: new Date().toISOString()
    };
    
    const filename = `${soundtrack.soundtrackId}.json`;
    fs.writeFileSync(filename, JSON.stringify(soundtrack, null, 2));
    
    console.log(`🎼 Dynamic Soundtrack Created: ${scenarioType}`);
    console.log(`🎚️ Intensity: ${intensity * 100}% | Layers: ${soundtrack.activeLayers.length}`);
    if (factionInfluence) {
        console.log(`🏴 Faction Influence: ${factionInfluence}`);
    }
    
    return soundtrack;
}

// CLI Interface for SoulBeat
function soulBeatCLI() {
    const args = process.argv.slice(2);
    const command = args[0];
    
    switch (command) {
        case 'generate':
            if (args.length < 3) {
                console.log('Usage: node soulbeat.js generate <wallet> <vehicle_style> [mood]');
                return;
            }
            generateMusic(args[1], args[2], args[3] || "Cinematic");
            break;
            
        case 'customize':
            if (args.length < 3) {
                console.log('Usage: node soulbeat.js customize <track_id> <customizations_json>');
                console.log('Example: node soulbeat.js customize TRACK123 \'{"tempo":"160 BPM","mood":"Aggressive"}\'');
                return;
            }
            try {
                const customizations = JSON.parse(args[2]);
                customizeTrack(args[1], customizations);
            } catch (error) {
                console.error('❌ Invalid customizations JSON');
            }
            break;
            
        case 'faction-theme':
            if (args.length < 2) {
                console.log('Usage: node soulbeat.js faction-theme <faction_name> [characteristics]');
                return;
            }
            generateFactionTheme(args[1], args[2]);
            break;
            
        case 'dynamic':
            if (args.length < 2) {
                console.log('Usage: node soulbeat.js dynamic <scenario> [intensity] [faction]');
                return;
            }
            const intensity = args[2] ? parseFloat(args[2]) : 0.5;
            createDynamicSoundtrack(args[1], intensity, args[3]);
            break;
            
        default:
            console.log('🎵 SoulBeat - AI Music Generation Engine');
            console.log('');
            console.log('Available commands:');
            console.log('  generate <wallet> <style> [mood]     - Generate music track');
            console.log('  customize <track_id> <changes>      - Customize existing track');
            console.log('  faction-theme <faction> [chars]     - Create faction theme');
            console.log('  dynamic <scenario> [intensity]      - Dynamic soundtrack');
            console.log('');
            console.log('Vehicle Styles:');
            console.log('  "Shadow Drift", "Neon Runner", "Apex Hunter", "Soul Phantom"');
            console.log('');
            console.log('Scenarios:');
            console.log('  "Racing", "Infiltration", "Combat", "Exploration"');
            break;
    }
}

// Export functions
module.exports = {
    generateMusic,
    customizeTrack,
    generateFactionTheme,
    createDynamicSoundtrack
};

// Run CLI if called directly
if (require.main === module) {
    soulBeatCLI();
}