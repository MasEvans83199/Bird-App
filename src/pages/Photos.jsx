import React, { useState } from 'react';
import '../styles/Photos.css';

const Photos = () => {
  const [featuredPhotoIndex, setFeaturedPhotoIndex] = useState(0);

  const photos = [
    { id: 1, src: '../src/bird_photos/harpy_eagle.png', description: 'Harpy Eagle' },
    { id: 2, src: '../src/bird_photos/american_goldfinch.png', description: 'American Gold Finch' },
    { id: 3, src: '../src/bird_photos/atlantic_puffin.png', description: 'Atlantic Puffin' },
    { id: 4, src: '../src/bird_photos/bald_eagle.png', description: 'American Bald Eagle' },
    { id: 5, src: '../src/bird_photos/baltimore_oriole.png', description: 'Baltimore Oriole' },
    { id: 6, src: '../src/bird_photos/belted_kingfisher.png', description: 'Belted Kingfisher' },
    { id: 7, src: '../src/bird_photos/black_grouse.png', description: 'Black Grouse' },
    { id: 8, src: '../src/bird_photos/blue_breasted_bee_eater.png', description: 'Blue-breasted Bee Eater' },
    { id: 9, src: '../src/bird_photos/blue_crowned_pigeon.png', description: 'Blue-crowned Pigeon' },
    { id: 10, src: '../src/bird_photos/bluegray_gnatcatcher.png', description: 'Blue-gray Gnatcatcher' },
    { id: 11, src: '../src/bird_photos/brown_pelican.png', description: 'Brown Pelican' },
    { id: 12, src: '../src/bird_photos/carolina_wren.png', description: 'Carolina Wren' },
    { id: 13, src: '../src/bird_photos/cassowary.png', description: 'Cassowary' },
    { id: 14, src: '../src/bird_photos/cedar_waxwing.png', description: 'Cedar Waxwing' },
    { id: 15, src: '../src/bird_photos/chilean_flamingo.png', description: 'Chilean Flamingo' },
    { id: 16, src: '../src/bird_photos/chinese_ringnecked_pheasant.png', description: 'Chinese Ringnecked Pheasant' },
    { id: 17, src: '../src/bird_photos/curlcrested_aracari.png', description: 'Curl-crested Aracari' },
    { id: 18, src: '../src/bird_photos/eastern_whippoorwill.png', description: 'Eastern Whip-poor-will' },
    { id: 19, src: '../src/bird_photos/emperor_penguin.png', description: 'Emperor Penguin' },
    { id: 20, src: '../src/bird_photos/galapagos_hawk.png', description: 'Galapagos Hawk' },
    { id: 21, src: '../src/bird_photos/gentoo_penguin.png', description: 'Gentoo Penguin' },
    { id: 22, src: '../src/bird_photos/greater_bird_of_paradise.png', description: 'Greater Bird of Paradise' },
    { id: 23, src: '../src/bird_photos/indian_roller.png', description: 'Indian Roller' },
    { id: 24, src: '../src/bird_photos/lilac_breasted_roller.png', description: 'Lilac-breasted Roller' },
    { id: 25, src: '../src/bird_photos/marbled_godwit.png', description: 'Marbled Godwit' },
    { id: 26, src: '../src/bird_photos/northern_bobwhite_quail.png', description: 'Northern Bobwhite' },
    { id: 27, src: '../src/bird_photos/northern_cardinal.png', description: 'Northern Cardinal' },
    { id: 28, src: '../src/bird_photos/northern_flicker.png', description: 'Northern Flicker' },
    { id: 29, src: '../src/bird_photos/northern_spotted_owl.png', description: 'Northern Spotted Owl' },
    { id: 30, src: '../src/bird_photos/palm_warbler.png', description: 'Palm Warbler' },
    { id: 31, src: '../src/bird_photos/red_fan_parrot.png', description: 'Red-fan Parrot' },
    { id: 32, src: '../src/bird_photos/red_knobbed_hornbill.png', description: 'Red-knobbed Hornbill' },
    { id: 33, src: '../src/bird_photos/redheaded_woodpecker.png', description: 'Redheaded Woodpecker' },
    { id: 34, src: '../src/bird_photos/rosebreasted_grosbeak.png', description: 'Rose-breasted Grosbeak' },
    { id: 35, src: '../src/bird_photos/rubycrowned_kinglet.png', description: 'Ruby-crowned Kinglet' },
    { id: 36, src: '../src/bird_photos/sandhill_crane.png', description: 'Sandhill Crane' },
    { id: 37, src: '../src/bird_photos/scarlet_tanager.png', description: 'Scarlet Tanager' },
    { id: 38, src: '../src/bird_photos/schalow_turaco.png', description: 'Schalow Turaco' },
    { id: 39, src: '../src/bird_photos/scissortailed_flycatcher.png', description: 'Scissor-tailed Flycatcher' },
    { id: 40, src: '../src/bird_photos/trumpeter_swan.png', description: 'Trumpeter Swan' },
    { id: 41, src: '../src/bird_photos/western_bluebird.png', description: 'Western Bluebird' },
    { id: 42, src: '../src/bird_photos/whooping_crane.png', description: 'Whooping Crane' },
  ];

  // Handler functions for changing the featured photo
    const handlePreviousPhoto = () => {
    setFeaturedPhotoIndex(featuredPhotoIndex === 0 ? photos.length - 1 : featuredPhotoIndex - 1);
  }

  const handleNextPhoto = () => {
    setFeaturedPhotoIndex(featuredPhotoIndex === photos.length - 1 ? 0 : featuredPhotoIndex + 1);
  }

  const featuredPhoto = photos[featuredPhotoIndex];

  return (
    <div className="gallery">
      <div className="featured-photo">
        <button className="arrow previous" onClick={handlePreviousPhoto}>{'<'}</button>
        <img src={featuredPhoto.src} alt={featuredPhoto.description} />
        <button className="arrow next" onClick={handleNextPhoto}>{'>'}</button>
        <p>{featuredPhoto.description}</p>
      </div>
      <div className="photo-grid">
        {photos.map(photo => (
          <div className="photo-item" key={photo.id}>
            <img src={photo.src} alt={photo.description} />
            <div className="photo-overlay">
              <p>{photo.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Photos;