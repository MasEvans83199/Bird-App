import { useState } from 'react';
import { supabase } from '../services/supabase';

function BirdImage({ size, url, onUpload, uploading }) {
  const [src, setSrc] = useState(url);

  async function handleUpload(event) {
    try {
      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.');
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `birds/${fileName}`;

      let { data, error } = await supabase.storage
        .from('bird-bucket')
        .upload(filePath, file);

      if (error) {
        throw error;
      }

      setSrc(URL.createObjectURL(file));
      onUpload(event, filePath);
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div>
      <img
        src={src}
        alt="Bird Image"
        className="bird image"
        style={{ width: size, height: size }}
      />
      <div style={{ width: size, position: 'relative' }}>
        <label className="button primary block" htmlFor="single">
          {uploading ? 'Uploading ...' : 'Upload'}
        </label>
        <input
          style={{ position: 'absolute', visibility: 'hidden' }}
          type="file"
          id="single"
          accept="image/*"
          onChange={handleUpload}
          disabled={uploading}
        />
      </div>
    </div>
  );
}

export default BirdImage;
