import { useState, useEffect } from 'react';
import { initializeApp } from './config';
import { getStorage } from './config';
import { getFirestore } from './config';
import {projectFirestore , projectStorage , timestamp } from './config';

const useStorage = (image) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    // references
    const storageRef = projectStorage.ref(image.name);
    const collectionRef = projectFirestore.collection('images');
    
    storageRef.put(image).on('state_changed', (snap) => {
      let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
      setProgress(percentage);
    }, (err) => {
      setError(err);
    }, async () => {
      const url = await storageRef.getDownloadURL();
      const createdAt = timestamp();
      await collectionRef.add({ url, createdAt });
      setUrl(url);
    });
  }, [image]);

  return { progress, url, error };
}

export default useStorage;