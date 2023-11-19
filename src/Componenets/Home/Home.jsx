import React, { useState } from 'react';
import TextBar from '../TextBar/TextBar'
import ComicBar from '../ComicBar/ComicBar'
import './Home.css'

async function query(data) {
  const response = await fetch(
    "https://xdwvg9no7pefghrn.us-east-1.aws.endpoints.huggingface.cloud",
    {
      headers: {
        "Accept": "image/png",
        "Authorization": "Bearer VknySbLLTUjbxXAXCjyfaFIPwUTCeRXbFSOjwRiCxsxFyhbnGjSFalPKrpvvDAaPVzWEevPljilLVDBiTzfIbWFdxOkYJxnOPoHhkkVGzAknaOulWggusSFewzpqsNWM",
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(data),
    }
  );
  const result = await response.blob();
  return result;
}

const Home = () => {

  const [comicImages, setComicImages] = useState(Array(10).fill(null));
  const [loading, setLoading] = useState(false);

  const generateComic = async (textArray) => {
    setLoading(true);

    const promises = textArray.map(async (text) => {
      const imageData = await query({ "inputs": text });
      return URL.createObjectURL(imageData);
    });

    try {
      const generatedImages = await Promise.all(promises);
      setComicImages(generatedImages);
    } catch (error) {
      console.error('Error generating comics:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
     <div className="main-container">

       <div className="container-1">
          <TextBar onGenerateComic={generateComic} isDisabled={loading}
        isLoading={loading} />
       </div>

        <div className="container-2">
          <ComicBar comicImages={comicImages} />
        </div>

     </div>
  )
}

export default Home