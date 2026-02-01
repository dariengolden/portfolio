// Video portfolio data with Mux playback IDs Replace the playbackId values with your actual Mux video playback IDs

export const videoData = {
  "Personal": [
    {
      id: 4,
      title: "Untitled",
      playbackId: "sv6SKApFvWLFUCHqK00U5GgZiguGOpch6YnQqDi7HtP00", // Replace with your Mux playback ID
      duration: "0:36",
      category: "Personal",
      description: "Description of your first personal video project. This is a placeholder that you can replace with details about your actual video content, creative process, and what makes this project meaningful to you.",
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
      description: "Description of your second personal video project. Another placeholder for you to customize with information about your video, the story behind it, and any special techniques or equipment used.",
      metadata: {
        client: "Personal", 
        year: "2024",
        tags: ["Personal", "Creative", "Placeholder"]
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
      description: "A vibrant celebration of cultural diversity at Asia-Pacific International University. This documentary-style video captures the energy and unity of students from various backgrounds coming together to showcase their traditions, featuring colorful performances, traditional music, and heartwarming moments of cultural exchange.",
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
      description: "A series of highlights created for each day of the three-day graduation weekend. I got to use some nice equipment rented for the purpose of the event.",
      metadata: {
        client: "Asia-Pacific International University",
        year: "2024",
      }
    }
  ],
  "Reels": [
    {
      id: 2,
      title: "Bullet Time",
      playbackId: "4RFV7gZeMHLAPXzuk8sEVd6J01bvzIBapdaQZDnYqUXk",
      duration: "0:07",
      category: "Reels",
      description: "A stunning cinematic sequence showcasing advanced camera techniques and post-production skills. This short corporate piece demonstrates precision timing and technical expertise, creating a visually striking moment that captures attention and showcases creative cinematography for commercial applications.",
      metadata: {
        client: "35 Stripes Film and Production",
        year: "2023",
        tags: ["Corporate", "Travel", "Lifestyle"]
      }
    },
    {
      id: 6,
      title: "Cinematic Demo Lighting",
      playbackId: "v2tTYQsf8gcNomCwn005xVjhnlgGT400KGOuo64DqhrME",
      duration: "0:25",
      category: "Reels",
      description: "A stunning cinematic sequence showcasing advanced camera techniques and post-production skills. This short corporate piece demonstrates precision timing and technical expertise, creating a visually striking moment that captures attention and showcases creative cinematography for commercial applications.",
      metadata: {
        client: "35 Stripes Film and Production",
        year: "2023",
        tags: ["Corporate", "Travel", "Lifestyle"]
      }
    }
  ],
  "Short Film": [
    // No videos currently
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
