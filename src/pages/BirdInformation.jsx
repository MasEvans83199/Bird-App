import React, { useEffect, useState } from 'react';
import { supabase } from '../services/supabase';

const BirdInformation = () => {
  const [birdList, setBirdList] = useState([]);

  useEffect(() => {
    const fetchBirdList = async () => {
      const { data } = await supabase.from('birds').select('*');
      setBirdList(data);
    };

    fetchBirdList();
  }, []);

  const toggleExpand = (birdId) => {
    setBirdList((prevBirdList) => {
      return prevBirdList.map((bird) => {
        if (bird.id === birdId) {
          return {
            ...bird,
            expanded: !bird.expanded,
          };
        }
        return bird;
      });
    });
  };

  return (
    <div className="bird-catalog">
      {birdList.map((bird, index) => (
        <div
          className={`bird-card ${bird.expanded ? 'expanded' : ''}`}
          key={bird.id}
          onClick={() => toggleExpand(bird.id)}
        >
          <div className='bird-author'>
            <p>Uploaded by {bird.username}</p>
          </div>
          <div className="bird-header">
            <h2>{bird.name}</h2>
            <img className="bird-photo" src={bird.photo} alt={bird.name} />
          </div>
          {bird.expanded && (
            <div className="bird-details">
              <p className='bird-info'>Scientific Name: {bird.genus} {bird.species}</p>
              <p className='bird-info'>Appearance: {bird.appearance}</p>
              <p className='bird-info'>Range: {bird.range}</p>
              <p className='bird-info'>Habitat: {bird.habitat}</p>
              <p className='bird-info'>Diet: {bird.diet}</p>
              <p className='bird-info'>Behavior: {bird.behavior}</p>
              <p className='bird-info'>Conservation: {bird.conservation}</p>
              <p className='bird-info'>Fun Fact: {bird.funfact}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default BirdInformation;
