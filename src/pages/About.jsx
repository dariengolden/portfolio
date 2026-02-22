import React, { useState } from "react";
import ScrollAnimation from "../components/ScrollAnimation";

const About = () => {
  // Gallery data - replace these with your actual photo URLs
  const galleryPhotos = [
    {
      id: 1,
      src: "https://via.placeholder.com/400x500/e0e0e0/666?text=Photo+1",
      alt: "Gallery Photo 1"
    },
    {
      id: 2,
      src: "https://via.placeholder.com/400x500/d0d0d0/666?text=Photo+2",
      alt: "Gallery Photo 2"
    },
    {
      id: 3,
      src: "https://via.placeholder.com/400x500/c0c0c0/666?text=Photo+3",
      alt: "Gallery Photo 3"
    },
    {
      id: 4,
      src: "https://via.placeholder.com/400x500/b0b0b0/666?text=Photo+4",
      alt: "Gallery Photo 4"
    },
    {
      id: 5,
      src: "https://via.placeholder.com/400x500/a0a0a0/666?text=Photo+5",
      alt: "Gallery Photo 5"
    },
    {
      id: 6,
      src: "https://via.placeholder.com/400x500/909090/666?text=Photo+6",
      alt: "Gallery Photo 6"
    }
  ];

  const [selectedPhoto, setSelectedPhoto] = useState(galleryPhotos[0]);

  const handlePhotoSelect = (photo) => {
    setSelectedPhoto(photo);
  };

  return (
    <div className="about">
      <div className="about-content">
        <ScrollAnimation direction="up" duration={0.8}>
          <div className="about-image-display">
            <img 
              src={selectedPhoto.src} 
              alt={selectedPhoto.alt}
              className="display-image"
            />
          </div>
        </ScrollAnimation>
        
        <div className="about-text-section">
          <ScrollAnimation direction="up" duration={0.8}>
            <h2 className="about-title">About</h2>
          </ScrollAnimation>
          <ScrollAnimation direction="up" delay={0.2} duration={0.8}>
            <p className="about-text">Hey, I'm Darien. Making videos is among the top things I spend my time doing. Other top things include playing music on the guitar and tech. The latter mentioned is largely due to my academic foundation in Information Technology.</p>
            {/* <br></br> */}
            <p className="about-text">
              I don't think creativity is exclusive. I think all of us are creative, depending on how inspired we feel.
            </p>
          </ScrollAnimation>
        </div>
      </div>
      
      <ScrollAnimation direction="up" delay={0.4} duration={0.8}>
        <div className="gallery-container">
          <div className="photo-gallery">
            {galleryPhotos.map((photo) => (
              <div 
                key={photo.id}
                className={`gallery-photo ${selectedPhoto.id === photo.id ? 'active' : ''}`}
                onClick={() => handlePhotoSelect(photo)}
              >
                <img 
                  src={photo.src} 
                  alt={photo.alt}
                  className="gallery-image"
                />
              </div>
            ))}
          </div>
        </div>
      </ScrollAnimation>
    </div>
  );
};

export default About; 
