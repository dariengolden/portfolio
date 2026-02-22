// Video portfolio data with Mux playback IDs Replace the playbackId values with your actual Mux video playback IDs

export const videoData = {
  "Personal": [
    {
      id: 4,
      title: "Untitled",
      playbackId: "sv6SKApFvWLFUCHqK00U5GgZiguGOpch6YnQqDi7HtP00", // Replace with your Mux playback ID
      duration: "0:36",
      category: "Personal",
      description: "Using digicam and match cuts.",
      metadata: {
        client: "Personal",
        year: "2024",
        tags: ["Personal", "Creative", "Placeholder"]
      }
    },
    {
      id: 5,
      title: "Untitled 2",
      playbackId: "MNlVz4O01Tb5Iq00016MGNzfZcKZHdrYCiV2MbE3zVNXsM", // Replace with your Mux playback ID
      duration: "0:18",
      category: "Personal",
      description: "Trying to use motivated motion transitions. Very much a work in progress.",
      metadata: {
        client: "Personal", 
        year: "2025",
        tags: ["Personal", "Creative", "Placeholder"]
      }
    },
    {
      id: 2,
      title: "Bullet Time",
      playbackId: "4RFV7gZeMHLAPXzuk8sEVd6J01bvzIBapdaQZDnYqUXk",
      duration: "0:07",
      category: "Personal",
      description: "My first time manually tracking and delibirately using speed ramps for a bullet time effect.",
      metadata: {
        client: "35 Stripes Film and Production",
        year: "2023",
        tags: ["Corporate", "Travel", "Lifestyle"]
      }
    },
    {
      id: 12,
      title: "Trending edit",
      playbackId: "37rXaLjXxGHotyCwSKCIHoOuKtmy8rhkBNuo6uU7cp4",
      duration: "0:07",
      category: "Personal",
      description: "This audio and AI-generated frames was trending that time in 2023.",
      metadata: {
        client: "Personal",
        year: "2023",
        tags: ["Personal", "Creative"]
      }
    }
  ],
  "Corporate": [
    {
      id: 1,
      title: "AIU Culture Festival",
      playbackId: "tSaBWV1d6w6Ed8bbz3RzeXBUb9glM1hJlQZC6uiJBT00",
      duration: "3:51",
      category: "Corporate",
      description: "This event really tested my stamina. I shot most of this myself and edited it. A lot of consideration like the sensitivity of music choice and length of time for each country went into this. Another challenge I would mention is balancing the adherence to corporate video rules and creativity/artistry.",
      metadata: {
        client: "Asia-Pacific International University",
        year: "2024",
      }
    },
    {
      id: 3,
      title: "AIU Graduation",
      playbackId: "I4FvWuzpfo017s021NUOUBVhrlEOtejcI5E5K7kez6bno",
      duration: "1:36",
      category: "Corporate",
      description: "One weekend of same day edits. Friday night event, Friday night video delivery. Saturday morning event, Saturday afternoon delivery. Sunday morning event, Sunday afternoon delivery. Boy, that was tough... Still, an awesome learning experience.",
      metadata: {
        client: "Asia-Pacific International University",
        year: "2024",
      },
      subVideos: [
        { label: "Day 1", playbackId: "1LU4nGVPPm2vnNgV02JHcr102nNQKxnnruMj9H5J800cNk", duration: "0:59" },
        { label: "Day 2", playbackId: "furPwyFre00m51QebE0002wk6ndM00pUzxqxikYZXXi7bw00", duration: "0:55" },
        { label: "Day 3", playbackId: "I4FvWuzpfo017s021NUOUBVhrlEOtejcI5E5K7kez6bno", duration: "1:36" },
      ]
    },
    {
      id: 11,
      title: "Anti-Bribery/Anti-Corruption Event Highlight",
      playbackId: "piX7q9mmc6QLscZZtWLEZAaIowo9LjomMOv02017kmMBc",
      duration: "5:28",
      category: "Corporate",
      description: "One of those events where I realized I could learn things not related to my field even while working! This event forced me to keep the lowest profile possible because the topic felt so serious, haha.",
      metadata: {
        client: "35 Stripes Film and Production",
        year: "2024",
      }
    }
  ],
  "Reels": [
    {
      id: 6,
      title: "Cinematic Demo Lighting",
      playbackId: "v2tTYQsf8gcNomCwn005xVjhnlgGT400KGOuo64DqhrME",
      duration: "0:25",
      category: "Reels",
      description: "Just a showcase of what I learned with lighting.",
      metadata: {
        client: "35 Stripes Film and Production",
        year: "2023",
        tags: ["Corporate", "Travel", "Lifestyle"]
      }
    },
    {
      id: 7,
      title: "Faculty Welcome Back Party",
      playbackId: "Cijce36o3iFudrt5spwKtwvQTZO1Snlye01yP01LfmWec",
      duration: "1:40",
      category: "Reels",
      description: "It's always nice to see my department grow at my university.",
      metadata: {
        client: "Faculty of Information Technology",
        year: "2024",
        tags: ["Reel"]
      }
    },
    {
      id: 8,
      title: "Intramurals",
      playbackId: "9RAuG2R8RrBibrAEbZUTNVhXgjdjysJ01r01P53Pn4d34",
      duration: "0:40",
      category: "Reels",
      description: "Just a few edits I filmed from my phone for our university Sports Day(s).",
      metadata: {
        client: "Faculty of Information Technology",
        year: "2024",
        tags: ["Reel"]
      },
      subVideos: [
        { label: "Day 2", playbackId: "9RAuG2R8RrBibrAEbZUTNVhXgjdjysJ01r01P53Pn4d34", duration: "0:40" },
        { label: "Day 7", playbackId: "HAFvn01L6Wr01NKZCxuZRGuT015PnY7NRc1jb9e83mp4D00", duration: "0:41" },
      ]
    },
    {
      id: 9,
      title: "In The Mood For Love Snippet",
      playbackId: "CN01n02DHqMmD0055LNXXjDnPVv91ZazV702I3X8sDB6bsA",
      duration: "0:21",
      category: "Reels",
      description: "The first video I made when I began my internship at 35 Stripes. I wanted to demonstrate my technical ability as well as share my taste in film by referencing 'In The Mood For Love'.",
      metadata: {
        client: "Client Name",
        year: "2024",
        tags: ["Reel"]
      }
    },
    {
      id: 10,
      title: "Reel 6",
      playbackId: "REPLACE_WITH_MUX_PLAYBACK_ID_REEL_6",
      duration: "0:00",
      category: "Reels",
      description: "Replace this description with details about your video.",
      metadata: {
        client: "Client Name",
        year: "2024",
        tags: ["Reel"]
      }
    }
  ],
  "Short Film": [
    {
      id: 13,
      title: "LUMBA",
      playbackId: "DPcis4000001bERcA40200Z5EC5bEsuu6BJS7WZeMP1WJCVI",
      duration: "3:49",
      category: "Short Film",
      description: "Worked as a gaffer and BTS-guy.",
      metadata: {
        client: "35 Stripes Film and Production",
        year: "2023",
        tags: ["Short Film"]
      }
    }
  ]
};

// For the hero video on homepage
export const heroVideo = {
  playbackId: "YOUR_MUX_PLAYBACK_ID_HERO", // Replace with your Mux playback ID for hero video
  title: "Showreel 2024"
};

// Helper function to get videos by category
export const getVideosByCategory = (category) => {
  return videoData[category] || [];
};

// Helper function to get all videos
export const getAllVideos = () => {
  return Object.values(videoData).flat();
};
