import { useEffect, useState } from 'react';
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

  return (
    <div>
      {birdList.map(bird => (
        <div key={bird.id}>
          <h2>{bird.name}</h2>
          <img src={bird.photo} alt={`${bird.name} photo`} />
          <p><strong>Scientific Name:</strong> {bird.genus} {bird.species}</p>
          <p><strong>Appearance:</strong> {bird.appearance}</p>
          <p><strong>Range:</strong> {bird.range}</p>
          <p><strong>Habitat:</strong> {bird.habitat}</p>
          <p><strong>Diet:</strong> {bird.diet}</p>
          <p><strong>Behavior:</strong> {bird.behavior}</p>
          <p><strong>Conservation:</strong> {bird.conservation}</p>
          <p><strong>Fun Fact:</strong> {bird.funfact}</p>
        </div>
      ))}
    </div>
  );
};

export default BirdInformation;