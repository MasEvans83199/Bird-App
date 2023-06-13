import { useState, useRef } from 'react';
import { supabase } from '../services/supabase';
import BirdInformation from './BirdInformation';
import BirdImage from './BirdImage';

function Birds() {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [genus, setGenus] = useState('');
  const [species, setSpecies] = useState('');
  const [appearance, setAppearance] = useState('');
  const [range, setRange] = useState('');
  const [habitat, setHabitat] = useState('');
  const [diet, setDiet] = useState('');
  const [behavior, setBehavior] = useState('');
  const [conservation, setConservation] = useState('');
  const [funFact, setFunFact] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (event, filePath) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.');
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const storagePath = `birds/${fileName}`;

      let { data, error } = await supabase.storage
        .from('bird-bucket')
        .upload(storagePath, file);

      if (error) {
        throw error;
      }

      setPhotoUrl(`https://ycfcamxsouvagmrltkbj.supabase.co/storage/v1/object/public/bird-bucket/${storagePath}`);
    } catch (error) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data, error } = await supabase.from('birds').insert({
        name,
        photo: photoUrl,
        genus,
        species,
        appearance,
        range,
        habitat,
        diet,
        behavior,
        conservation,
        funfact: funFact,
      });

      if (error) {
        throw error;
      }

      console.log('Bird created:', data);
      
      // Refresh the form after successful submission
      setName('');
      setPhotoUrl('');
      setGenus('');
      setSpecies('');
      setAppearance('');
      setRange('');
      setHabitat('');
      setDiet('');
      setBehavior('');
      setConservation('');
      setFunFact('');
      setShowForm(false);
    } catch (error) {
      console.log('Error creating bird:', error.message);
    }
  };

  const formRef = useRef(null);

  return (
    <div>
      <label className="button primary block" htmlFor="upload-bird" onClick={() => setShowForm(true)}>
        Upload Bird
      </label>
      {showForm && (
        <form ref={formRef} onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />

          <label htmlFor="photo">Photo:</label>
          <BirdImage size={100} url={null} onUpload={handleUpload} uploading={uploading} />
          {photoUrl && <p>Photo uploaded!</p>}

          <label htmlFor="genus">Genus:</label>
          <input type="text" id="genus" value={genus} onChange={(e) => setGenus(e.target.value)} />

          <label htmlFor="species">Species:</label>
          <input type="text" id="species" value={species} onChange={(e) => setSpecies(e.target.value)} />

          <label htmlFor="appearance">Appearance:</label>
          <textarea id="appearance" value={appearance} onChange={(e) => setAppearance(e.target.value)} />

          <label htmlFor="range">Range:</label>
          <textarea id="range" value={range} onChange={(e) => setRange(e.target.value)} />

          <label htmlFor="habitat">Habitat:</label>
          <textarea id="habitat" value={habitat} onChange={(e) => setHabitat(e.target.value)} />

          <label htmlFor="diet">Diet:</label>
          <textarea id="diet" value={diet} onChange={(e) => setDiet(e.target.value)} />

          <label htmlFor="behavior">Behavior:</label>
          <textarea id="behavior" value={behavior} onChange={(e) => setBehavior(e.target.value)} />

          <label htmlFor="conservation">Conservation:</label>
          <textarea id="conservation" value={conservation} onChange={(e) => setConservation(e.target.value)} />

          <label htmlFor="fun-fact">Fun Fact:</label>
          <textarea id="fun-fact" value={funFact} onChange={(e) => setFunFact(e.target.value)} />

          <button type="submit">Submit</button>
        </form>
      )}
      <BirdInformation supabase={supabase} />
    </div>
  );
}

export default Birds;