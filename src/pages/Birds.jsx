import { useState, useRef, useEffect } from 'react';
import { supabase } from '../services/supabase';
import BirdInformation from './BirdInformation';
import BirdImage from './BirdImage';
import '../styles/Birds.css';

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
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();

        if (user) {
          const { data, error } = await supabase
            .from('profiles')
            .select('username')
            .eq('id', user.id)
            .single();

          if (error) {
            throw error;
          }

          if (data) {
            setUsername(data.username);
          }
        }
      } catch (error) {
        console.log('Error fetching user data:', error.message);
      }
    };

    fetchUserData();
  }, []);

  
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
        username, // Add the username field to the insert object
      });

      if (error) {
        throw error;
      }

      console.log('Bird created:', data);

      // Reset form fields
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
      <div className='upload-container'>
        <label className="button primary block" htmlFor="upload-bird" onClick={() => setShowForm(true)}>
          Upload Bird
        </label>
      </div>
      {showForm && (
        <form ref={formRef} className="submit-form" onSubmit={handleSubmit}>
          <div className="input-container">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          <div className="input-container">
            <label htmlFor="photo">Photo:</label>
            <BirdImage url={null} onUpload={handleUpload} uploading={uploading} />
            {photoUrl && <p>Photo uploaded!</p>}
          </div>

          <div className="input-container">
            <label htmlFor="genus">Genus:</label>
            <input type="text" id="genus" value={genus} onChange={(e) => setGenus(e.target.value)} />
          </div>

          <div className="input-container">
            <label htmlFor="species">Species:</label>
            <input type="text" id="species" value={species} onChange={(e) => setSpecies(e.target.value)} />
          </div>

          <div className="input-container">
            <label htmlFor="appearance">Appearance:</label>
            <textarea id="appearance" value={appearance} onChange={(e) => setAppearance(e.target.value)} />
          </div>

          <div className="input-container">
            <label htmlFor="range">Range:</label>
            <textarea id="range" value={range} onChange={(e) => setRange(e.target.value)} />
          </div>

          <div className="input-container">
            <label htmlFor="habitat">Habitat:</label>
            <textarea id="habitat" value={habitat} onChange={(e) => setHabitat(e.target.value)} />
          </div>

          <div className="input-container">
            <label htmlFor="diet">Diet:</label>
            <textarea id="diet" value={diet} onChange={(e) => setDiet(e.target.value)} />
          </div>

          <div className="input-container">
            <label htmlFor="behavior">Behavior:</label>
            <textarea id="behavior" value={behavior} onChange={(e) => setBehavior(e.target.value)} />
          </div>

          <div className="input-container">
            <label htmlFor="conservation">Conservation:</label>
            <textarea id="conservation" value={conservation} onChange={(e) => setConservation(e.target.value)} />
          </div>

          <div className="input-container">
            <label htmlFor="fun-fact">Fun Fact:</label>
            <textarea id="fun-fact" value={funFact} onChange={(e) => setFunFact(e.target.value)} />
          </div>

          <button type="submit">Submit</button>
        </form>
      )}
      <BirdInformation supabase={supabase} />
    </div>
  );
}

export default Birds;
