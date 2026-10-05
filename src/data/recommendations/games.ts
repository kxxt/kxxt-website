// Images are optional. Put local files in src/images/recommendations and add:
// images: [
//   { src: "recommendations/example-1.webp", alt: "Describe image one" },
//   { src: "recommendations/example-2.webp", alt: "Describe image two" },
// ],
import type { RecommendationCollection } from "./types"

const games: RecommendationCollection = {
  items: [
    {
      title: "Hyperbolica",
      creator: "CodeParade",
      year: "2022",
      description:
        "A playful first-person adventure that makes non-Euclidean geometry something you can explore and gradually understand.",
      tags: ["Puzzle", "Math", "Indie"],
      url: "https://store.steampowered.com/app/1256230/Hyperbolica/",
    },
    {
      title: "4D Golf",
      creator: "CodeParade",
      year: "2024",
      description:
        "The only actual 4D game in first personal view AFAIK.",
      tags: ["Puzzle", "Math", "Golf"],
      url: "https://store.steampowered.com/app/2147950/4D_Golf/",
    },
    {
      title: "Silent Hill 2",
      creator: "Team Silent / Bloober Team",
      year: "2001 / 2024",
      description:
        "A haunting psychological horror story whose oppressive town gives grief, guilt, and memory a physical form.",
      tags: ["Survival horror", "Psychological", "Story-rich"],
      url: "https://www.konami.com/games/silenthill/2r/us/en/",
    },
    {
      title: "Journey",
      creator: "thatgamecompany",
      year: "2012",
      description:
        "A brief and beautiful pilgrimage that creates a powerful sense of companionship without using dialogue.",
      tags: ["Adventure", "Atmospheric", "Indie"],
      url: "https://thatgamecompany.com/journey/",
    },
    {
      title: "The Witcher 3: Wild Hunt",
      creator: "CD Projekt Red",
      year: "2015",
      description:
        "A vast role-playing game where careful worldbuilding and unusually strong side stories make wandering worthwhile.",
      tags: ["RPG", "Fantasy", "Open world"],
      url: "https://www.thewitcher.com/us/en/witcher3",
    },
    {
      title: "Ghostwire: Tokyo",
      creator: "Tango Gameworks",
      year: "2022",
      description:
        "A supernatural tour through an eerily emptied Tokyo filled with urban legends, spirits, and striking visual detail.",
      tags: ["Action-adventure", "Supernatural", "Open world"],
      url: "https://bethesda.net/en/game/ghostwire-tokyo",
    },
    {
      title: "Hogwarts Legacy",
      creator: "Avalanche Software",
      year: "2023",
      description:
        "A richly realized visit to Hogwarts that makes exploring the castle and its surroundings the main attraction.",
      tags: ["RPG", "Fantasy", "Open world"],
      url: "https://www.hogwartslegacy.com/",
    },
    {
      title: "Cyberpunk 2077",
      creator: "CD Projekt Red",
      year: "2020",
      description:
        "A dense first-person role-playing game whose characters, quests, and neon city leave a lasting impression.",
      tags: ["RPG", "Cyberpunk", "Open world"],
      url: "https://www.cyberpunk.net/",
    },
    {
      title: "Superliminal",
      creator: "Pillow Castle",
      year: "2019",
      description:
        "A compact puzzle game that repeatedly turns forced perspective and visual assumptions into satisfying surprises.",
      tags: ["Puzzle", "Perspective", "Indie"],
      url: "https://www.pillowcastlegames.com/",
    },
    {
      title: "A Plague Tale: Innocence",
      creator: "Asobo Studio",
      year: "2019",
      description:
        "A focused medieval journey that uses stealth, swarms of rats, and a sibling bond to sustain its tension.",
      tags: ["Adventure", "Stealth", "Story-rich"],
      url: "https://www.focus-entmt.com/en/games/a-plague-tale-innocence",
    },
    {
      title: "Minecraft",
      creator: "Mojang Studios",
      year: "2011",
      description:
        "An enduring sandbox whose simple blocks support creativity, exploration, engineering, and shared adventures.",
      tags: ["Sandbox", "Survival", "Creative"],
      url: "https://www.minecraft.net/",
    },
    {
      title: "HITMAN",
      creator: "IO Interactive",
      year: "2016",
      description:
        "An intricate assassination sandbox that rewards observation, experimentation, improvisation, and repeated play.",
      tags: ["Stealth", "Sandbox", "Puzzle"],
      url: "https://ioi.dk/hitman",
    },
  ],
  sections: [
    {
      title: "Half-Life franchise",
      items: [
        {
          title: "Half-Life",
          creator: "Valve",
          year: "1998",
          description:
            "A landmark first-person shooter that tells its science-fiction disaster without taking control away from the player.",
          tags: ["FPS", "Science fiction", "Classic"],
          url: "https://store.steampowered.com/app/70/HalfLife/",
        },
        {
          title: "Half-Life 2",
          creator: "Valve",
          year: "2004",
          description:
            "A masterfully paced resistance story whose physical world makes every encounter feel tangible.",
          tags: ["FPS", "Science fiction", "Physics"],
          url: "https://store.steampowered.com/app/220/HalfLife_2/",
        },
        {
          title: "Half-Life 2: Episode One",
          creator: "Valve",
          year: "2006",
          description:
            "A focused escape from City 17 that puts Alyx at the center of the journey.",
          tags: ["FPS", "Science fiction", "Story-rich"],
          url: "https://store.steampowered.com/app/380/HalfLife_2_Episode_One/",
        },
        {
          title: "Half-Life 2: Episode Two",
          creator: "Valve",
          year: "2007",
          description:
            "A broader and more varied road trip through the outskirts of Combine-controlled territory.",
          tags: ["FPS", "Science fiction", "Story-rich"],
          url: "https://store.steampowered.com/app/420/HalfLife_2_Episode_Two/",
        },
      ],
    },
    {
      title: "Portal franchise",
      description: "Both of Valve's first-person portal puzzle games.",
      items: [
        {
          title: "Portal",
          creator: "Valve",
          year: "2007",
          description:
            "A perfectly economical puzzle game that turns one brilliant mechanic into an unforgettable escape.",
          tags: ["Puzzle", "Science fiction", "Comedy"],
          url: "https://store.steampowered.com/app/400/Portal/",
        },
        {
          title: "Portal 2",
          creator: "Valve",
          year: "2011",
          description:
            "A larger sequel with ingenious test chambers and impeccable comic writing.",
          tags: ["Puzzle", "Co-op", "Comedy"],
          url: "https://store.steampowered.com/app/620/Portal_2/",
        },
      ],
    },
    {
      title: "Assassin's Creed franchise",
      items: [
        {
          title: "Assassin's Creed",
          creator: "Ubisoft Montreal",
          year: "2007",
          description:
            "The original establishes the Animus, the Assassin–Templar conflict, and an unusually contemplative approach to historical stealth.",
          tags: ["Action-adventure", "Stealth", "Crusades"],
          url: "https://en.wikipedia.org/wiki/Assassin%27s_Creed_(video_game)",
        },
        {
          title: "Assassin's Creed II",
          creator: "Ubisoft Montreal",
          year: "2009",
          description:
            "Ezio's Renaissance journey expands the original idea into a warmer, richer, and more varied adventure.",
          tags: ["Action-adventure", "Stealth", "Renaissance"],
          url: "https://en.wikipedia.org/wiki/Assassin%27s_Creed_II",
        },
        {
          title: "Assassin's Creed: Brotherhood",
          creator: "Ubisoft Montreal",
          year: "2010",
          description:
            "Ezio rebuilds the Brotherhood in Rome while the series sharpens its combat and recruitment systems.",
          tags: ["Action-adventure", "Stealth", "Rome"],
          url: "https://en.wikipedia.org/wiki/Assassin%27s_Creed:_Brotherhood",
        },
        {
          title: "Assassin's Creed: Revelations",
          creator: "Ubisoft Montreal",
          year: "2011",
          description:
            "A reflective Constantinople-set finale that brings Ezio and Altaïr's stories together.",
          tags: ["Action-adventure", "Stealth", "Constantinople"],
          url: "https://en.wikipedia.org/wiki/Assassin%27s_Creed:_Revelations",
        },
        {
          title: "Assassin's Creed III",
          creator: "Ubisoft Montreal",
          year: "2012",
          description:
            "Connor's life intersects with the American Revolution across cities, wilderness, and naval battles.",
          tags: ["Action-adventure", "Stealth", "American Revolution"],
          url: "https://en.wikipedia.org/wiki/Assassin%27s_Creed_III",
        },
        {
          title: "Assassin's Creed III: Liberation",
          creator: "Ubisoft Sofia",
          year: "2012",
          description:
            "Aveline de Grandpré uses distinct social personas to navigate eighteenth-century New Orleans.",
          tags: ["Action-adventure", "Stealth", "New Orleans"],
          url: "https://en.wikipedia.org/wiki/Assassin%27s_Creed_III:_Liberation",
        },
        {
          title: "Assassin's Creed IV: Black Flag",
          creator: "Ubisoft Montreal",
          year: "2013",
          description:
            "A superb Caribbean pirate adventure where sailing and exploration confidently share the stage with assassination.",
          tags: ["Action-adventure", "Pirates", "Open world"],
          url: "https://en.wikipedia.org/wiki/Assassin%27s_Creed_IV:_Black_Flag",
        },
        {
          title: "Assassin's Creed Freedom Cry",
          creator: "Ubisoft Quebec",
          year: "2014",
          description:
            "Adéwalé leads a focused and forceful standalone fight against slavery in Saint-Domingue.",
          tags: ["Action-adventure", "Stealth", "Standalone"],
          url: "https://en.wikipedia.org/wiki/Assassin%27s_Creed_Freedom_Cry",
        },
        {
          title: "Assassin's Creed Rogue",
          creator: "Ubisoft Sofia",
          year: "2014",
          description:
            "A former Assassin offers the series' rare Templar perspective while sailing the icy North Atlantic.",
          tags: ["Action-adventure", "Stealth", "Open world"],
          url: "https://en.wikipedia.org/wiki/Assassin%27s_Creed_Rogue",
        },
        {
          title: "Assassin's Creed Unity",
          creator: "Ubisoft Montreal",
          year: "2014",
          description:
            "Revolutionary Paris provides the series' densest city, fluid parkour, and cooperative assassinations.",
          tags: ["Action-adventure", "Stealth", "French Revolution"],
          url: "https://en.wikipedia.org/wiki/Assassin%27s_Creed_Unity",
        },
        {
          title: "Assassin's Creed Syndicate",
          creator: "Ubisoft Quebec",
          year: "2015",
          description:
            "Twin Assassins reclaim Victorian London through gang warfare, stealth, and lively character work.",
          tags: ["Action-adventure", "Stealth", "Victorian London"],
          url: "https://en.wikipedia.org/wiki/Assassin%27s_Creed_Syndicate",
        },
        {
          title: "Assassin's Creed Origins",
          creator: "Ubisoft Montreal",
          year: "2017",
          description:
            "Bayek's journey through ancient Egypt reinvents the series as a broad open-world action RPG.",
          tags: ["Action RPG", "Stealth", "Ancient Egypt"],
          url: "https://en.wikipedia.org/wiki/Assassin%27s_Creed_Origins",
        },
        {
          title: "Assassin's Creed Odyssey",
          creator: "Ubisoft Quebec",
          year: "2018",
          description:
            "A sprawling Greek odyssey embraces player choice, mythology, and flexible role-playing builds.",
          tags: ["Action RPG", "Open world", "Ancient Greece"],
          url: "https://en.wikipedia.org/wiki/Assassin%27s_Creed_Odyssey",
        },
        {
          title: "Assassin's Creed Valhalla",
          creator: "Ubisoft Montreal",
          year: "2020",
          description:
            "A Viking settlement anchors a vast journey through ninth-century England and beyond.",
          tags: ["Action RPG", "Open world", "Vikings"],
          url: "https://en.wikipedia.org/wiki/Assassin%27s_Creed_Valhalla",
        },
        {
          title: "Assassin's Creed Mirage",
          creator: "Ubisoft Bordeaux",
          year: "2023",
          description:
            "A compact return to social stealth and rooftop movement in ninth-century Baghdad.",
          tags: ["Action-adventure", "Stealth", "Baghdad"],
          url: "https://en.wikipedia.org/wiki/Assassin%27s_Creed_Mirage",
        },
        {
          title: "Assassin's Creed Shadows",
          creator: "Ubisoft Quebec",
          year: "2025",
          description:
            "Dual protagonists offer complementary shinobi stealth and samurai combat in feudal Japan.",
          tags: ["Action RPG", "Stealth", "Feudal Japan"],
          url: "https://en.wikipedia.org/wiki/Assassin%27s_Creed_Shadows",
        },
      ],
    },
    {
      title: "Remedy Connected Universe",
      description:
        "The released games in Remedy's connected Alan Wake and Control continuity.",
      items: [
        {
          title: "Alan Wake",
          creator: "Remedy Entertainment",
          year: "2010",
          description:
            "A missing writer searches a Pacific Northwest town where darkness is turning fiction into reality.",
          tags: ["Action", "Psychological horror", "Mystery"],
          url: "https://www.alanwake.com/alan-wake-remastered/",
        },
        {
          title: "Control",
          creator: "Remedy Entertainment",
          year: "2019",
          description:
            "A shifting brutalist headquarters turns paranormal bureaucracy into an exhilarating supernatural action game.",
          tags: ["Action", "New weird", "Metroidvania"],
          url: "https://www.remedygames.com/games/control",
        },
        {
          title: "Alan Wake 2",
          creator: "Remedy Entertainment",
          year: "2023",
          description:
            "Two intertwined investigations push Remedy's storytelling and survival horror into daring new forms.",
          tags: ["Survival horror", "Mystery", "Story-rich"],
          url: "https://www.alanwake.com/",
        },
        {
          title: "CONTROL Resonant",
          creator: "Remedy Entertainment",
          year: "2026",
          description:
            "Dylan Faden crosses a warped Manhattan in an action RPG built around extraordinary powers and a reality-bending cosmic threat.",
          tags: ["Action RPG", "Supernatural", "Story-rich"],
          url: "https://www.remedygames.com/games/control-2",
        },
      ],
    },
    {
      title: "Uncharted series",
      items: [
        {
          title: "Uncharted: Drake's Fortune",
          creator: "Naughty Dog",
          year: "2007",
          description:
            "Nathan Drake's first treasure hunt establishes the series' easy charm and cinematic momentum.",
          tags: ["Action-adventure", "Treasure hunting", "Cinematic"],
          url: "https://en.wikipedia.org/wiki/Uncharted:_Drake%27s_Fortune",
        },
        {
          title: "Uncharted 2: Among Thieves",
          creator: "Naughty Dog",
          year: "2009",
          description:
            "A globe-trotting pursuit of Shambhala delivers exceptional pacing and still-spectacular set pieces.",
          tags: ["Action-adventure", "Treasure hunting", "Cinematic"],
          url: "https://en.wikipedia.org/wiki/Uncharted_2:_Among_Thieves",
        },
        {
          title: "Uncharted 3: Drake's Deception",
          creator: "Naughty Dog",
          year: "2011",
          description:
            "Drake's search for a lost desert city digs deeper into his history with Sully.",
          tags: ["Action-adventure", "Treasure hunting", "Cinematic"],
          url: "https://en.wikipedia.org/wiki/Uncharted_3:_Drake%27s_Deception",
        },
        {
          title: "Uncharted: Golden Abyss",
          creator: "Bend Studio",
          year: "2011",
          description:
            "A substantial handheld prequel carries Drake's climbing, shooting, and treasure hunting onto the Vita.",
          tags: ["Action-adventure", "Treasure hunting", "Handheld"],
          url: "https://en.wikipedia.org/wiki/Uncharted:_Golden_Abyss",
        },
        {
          title: "Uncharted 4: A Thief's End",
          creator: "Naughty Dog",
          year: "2016",
          description:
            "A mature final Nathan Drake adventure balances breathtaking spectacle with quieter questions about obsession.",
          tags: ["Action-adventure", "Treasure hunting", "Cinematic"],
          url: "https://en.wikipedia.org/wiki/Uncharted_4:_A_Thief%27s_End",
        },
        {
          title: "Uncharted: The Lost Legacy",
          creator: "Naughty Dog",
          year: "2017",
          description:
            "Chloe and Nadine lead a tighter adventure through India's Western Ghats with a welcome open-ended middle act.",
          tags: ["Action-adventure", "Treasure hunting", "Cinematic"],
          url: "https://en.wikipedia.org/wiki/Uncharted:_The_Lost_Legacy",
        },
      ],
    },
    {
      title: "The Last of Us series",
      items: [
        {
          title: "The Last of Us",
          creator: "Naughty Dog",
          year: "2013",
          description:
            "A harrowing cross-country journey grounded by the slowly changing relationship between Joel and Ellie.",
          tags: ["Action-adventure", "Survival", "Story-rich"],
          url: "https://www.playstation.com/en-us/games/the-last-of-us-part-i/",
        },
        {
          title: "The Last of Us Part II",
          creator: "Naughty Dog",
          year: "2020",
          description:
            "An uncompromising cycle of violence asks the player to inhabit perspectives they may resist.",
          tags: ["Action-adventure", "Survival", "Story-rich"],
          url: "https://www.playstation.com/en-us/games/the-last-of-us-part-ii-remastered/",
        },
      ],
    },
    {
      title: "Death Stranding series",
      items: [
        {
          title: "Death Stranding",
          creator: "Kojima Productions",
          year: "2019",
          description:
            "A solitary trek across a fractured America turns delivery, terrain, and indirect cooperation into meaningful play.",
          tags: ["Exploration", "Science fiction", "Open world"],
          url: "https://www.kojimaproductions.jp/en/death-stranding-directors-cut",
        },
        {
          title: "Death Stranding 2: On the Beach",
          creator: "Kojima Productions",
          year: "2025",
          description:
            "Sam's second expedition broadens the strange world while questioning the connections built by the first journey.",
          tags: ["Exploration", "Science fiction", "Open world"],
          url: "https://www.kojimaproductions.jp/en/death-stranding-2",
        },
      ],
    },
    {
      title: "Tomb Raider franchise",
      items: [
        {
          title: "Tomb Raider",
          creator: "Crystal Dynamics",
          year: "2013",
          description:
            "Lara's survival-focused reboot combines cinematic momentum with a satisfying island to explore.",
          tags: ["Action-adventure", "Survival", "Origin story"],
          url: "https://en.wikipedia.org/wiki/Tomb_Raider_(2013_video_game)",
        },
        {
          title: "Rise of the Tomb Raider",
          creator: "Crystal Dynamics",
          year: "2015",
          description:
            "The reboot's strongest blend of exploration, optional tombs, survival systems, and cinematic adventure.",
          tags: ["Action-adventure", "Exploration", "Survival"],
          url: "https://en.wikipedia.org/wiki/Rise_of_the_Tomb_Raider",
        },
        {
          title: "Shadow of the Tomb Raider",
          creator: "Eidos-Montréal",
          year: "2018",
          description:
            "A darker finale emphasizes dense jungle exploration and elaborate challenge tombs.",
          tags: ["Action-adventure", "Exploration", "Survival"],
          url: "https://en.wikipedia.org/wiki/Shadow_of_the_Tomb_Raider",
        },
      ],
    },
    {
      title: "Metro series",
      items: [
        {
          title: "Metro 2033",
          creator: "4A Games",
          year: "2010",
          description:
            "A claustrophobic journey through Moscow's underground where ammunition, air, and courage are always scarce.",
          tags: ["FPS", "Post-apocalyptic", "Survival horror"],
          url: "https://en.wikipedia.org/wiki/Metro_2033_(video_game)",
        },
        {
          title: "Metro: Last Light",
          creator: "4A Games",
          year: "2013",
          description:
            "A more polished return to the tunnels deepens the factions, moral choices, and fragile hope of the first game.",
          tags: ["FPS", "Post-apocalyptic", "Story-rich"],
          url: "https://en.wikipedia.org/wiki/Metro:_Last_Light",
        },
        {
          title: "Metro Exodus",
          creator: "4A Games",
          year: "2019",
          description:
            "The series leaves Moscow aboard the Aurora for a year-long journey through varied open environments.",
          tags: ["FPS", "Post-apocalyptic", "Exploration"],
          url: "https://en.wikipedia.org/wiki/Metro_Exodus",
        },
      ],
    },
    {
      title: "Red Dead Redemption series",
      items: [
        {
          title: "Red Dead Redemption",
          creator: "Rockstar San Diego",
          year: "2010",
          description:
            "John Marston's pursuit across the fading American frontier remains a superb open-world western tragedy.",
          tags: ["Action-adventure", "Western", "Open world"],
          url: "https://www.rockstargames.com/reddeadredemption",
        },
        {
          title: "Red Dead Redemption 2",
          creator: "Rockstar Games",
          year: "2018",
          description:
            "Arthur Morgan's slow-burning final ride unfolds in an extraordinarily detailed and responsive world.",
          tags: ["Action-adventure", "Western", "Open world"],
          url: "https://www.rockstargames.com/reddeadredemption2/",
        },
      ],
    },
  ],
}

export default games
