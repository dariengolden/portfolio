// Video portfolio data with Mux playback IDs Replace the playbackId values with your actual Mux video playback IDs

export const videoData = {
  "Social Media Reel": [
    {
      id: 1,
      title: "Bullet Time",
      playbackId: "4RFV7gZeMHLAPXzuk8sEVd6J01bvzIBapdaQZDnYqUXk", // Replace with your Mux playback ID
      duration: "0:07",
      category: "Social Media Reel",
      metadata: {
        client: "35 Stripes Film and Production",
        year: "2023",
        tags: ["Social Media", "Travel", "Lifestyle"]
      }
    },
    {
      id: 2,
      title: "Songkran Celebration",
      playbackId: "NB7HrSIoa00900zCOtLn2UIzzYC1f4BZImiE5HYRvc4zI",
      duration: "1:51",
      category: "Social Media Reel",
      metadata: {
        client: "Asia-Pacific International University",
        year: "2024",
        tags: ["Social Media", "Urban", "Storytelling"]
      }
    }
  ],
  "Corporate": [
    {
      id: 3,
      title: "AIU Culture Festival",
      playbackId: "tSaBWV1d6w6Ed8bbz3RzeXBUb9glM1hJlQZC6uiJBT00",
      duration: "3:51",
      category: "Corporate",
      metadata: {
        client: "Asia-Pacific International University",
        year: "2024",
      }
    },
    {
      id: 4,
      title: "Graduation Ceremony Highlights",
      playbackId: "2JYXS8k78WWEljGN4oEaLNJGxByTIsup6LBJtaOvxmA",
      duration: "0:59",
      category: "Corporate",
      metadata: {
        client: "Asia-Pacific International University",
        year: "2024",
      }
    }
  ],
  "Short Film": [
    {
      id: 5,
      title: "The Last Journey",
      playbackId: "YOUR_MUX_PLAYBACK_ID_4",
      duration: "12:30",
      category: "Short Film",
      metadata: {
        client: "Independent",
        year: "2024",
        tags: ["Short Film", "Drama", "Award Winner"]
      }
    }
  ],
  "Campaign": [
    {
      id: 6,
      title: "Climate Action",
      playbackId: "YOUR_MUX_PLAYBACK_ID_5",
      duration: "2:00",
      category: "Campaign",
      metadata: {
        client: "Green Earth Org",
        year: "2024",
        tags: ["Campaign", "Non-Profit", "Environment"]
      }
    }
  ],
  "Passion Project": [
    {
      id: 7,
      title: "Urban Exploration",
      playbackId: "YOUR_MUX_PLAYBACK_ID_6",
      duration: "5:45",
      category: "Passion Project",
      metadata: {
        client: "Personal",
        year: "2024",
        tags: ["Documentary", "Travel", "Urban"]
      }
    }
  ],
  "Advertisement": [
    {
      id: 8,
      title: "Luxury Watch",
      playbackId: "YOUR_MUX_PLAYBACK_ID_7",
      duration: "0:45",
      category: "Advertisement",
      metadata: {
        client: "Luxury Brand",
        year: "2024",
        tags: ["Advertisement", "Product", "Luxury"]
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
