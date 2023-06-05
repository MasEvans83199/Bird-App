import { useState } from 'react';
import { supabase } from '../services/supabase';

function Birds() {
  const [name, setName] = useState('');
  const [photo, setPhoto] = useState(null);
  const [genus, setGenus] = useState('');
  const [species, setSpecies] = useState('');
  const [appearance, setAppearance] = useState('');
  const [range, setRange] = useState('');
  const [habitat, setHabitat] = useState('');
  const [diet, setDiet] = useState('');
  const [behavior, setBehavior] = useState('');
  const [conservation, setConservation] = useState('');
  const [funFact, setFunFact] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();

    // Upload photo to Backblaze B2
    const photoUrl = await uploadPhoto(photo);

    // Insert new row into bird table
    const { data, error } = await supabase
      .from('bird')
      .insert({ name, photo_url: photoUrl, genus, species, appearance, range, habitat, diet, behavior, conservation, funFact });

    if (error) {
      console.log('Error inserting bird:', error.message);
    } else {
      console.log('Bird inserted successfully:', data);
    }
  }

  async function uploadPhoto(photo) {
    // Upload photo to Backblaze B2
    // Use the Backblaze B2 API to upload the photo to the Backblaze B2 bucket and get the URL of the uploaded photo.
    // Here's an example of how you can use the Backblaze B2 API to upload a photo:
    // const { data, error } = await supabase.storage.from('my-bucket').upload('my-photo.jpg', photo);
    // if (error) {
    //   console.log('Error uploading photo:', error.message);
    //   return null;
    // } else {
    //   console.log('Photo uploaded successfully:', data);
    //   return data.Key;
    // }
    return 'https://my-bucket.backblaze.com/my-photo.jpg';
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
      </label>
      <label>
        Photo:
        <input type="file" onChange={(event) => setPhoto(event.target.files[0])} />
      </label>
      <label>
        Genus:
        <input type="text" value={genus} onChange={(event) => setGenus(event.target.value)} />
      </label>
      <label>
        Species:
        <input type="text" value={species} onChange={(event) => setSpecies(event.target.value)} />
      </label>
      <label>
        Appearance:
        <textarea value={appearance} onChange={(event) => setAppearance(event.target.value)} />
      </label>
      <label>
        Range:
        <textarea value={range} onChange={(event) => setRange(event.target.value)} />
      </label>
      <label>
        Habitat:
        <textarea value={habitat} onChange={(event) => setHabitat(event.target.value)} />
      </label>
      <label>
        Diet:
        <textarea value={diet} onChange={(event) => setDiet(event.target.value)} />
      </label>
      <label>
        Behavior:
        <textarea value={behavior} onChange={(event) => setBehavior(event.target.value)} />
      </label>
      <label>
        Conservation:
        <textarea value={conservation} onChange={(event) => setConservation(event.target.value)} />
      </label>
      <label>
        Fun Fact:
        <textarea value={funFact} onChange={(event) => setFunFact(event.target.value)} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}
export default Birds;