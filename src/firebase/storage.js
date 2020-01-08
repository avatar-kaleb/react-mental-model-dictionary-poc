import { storage } from './firebase';

// top images (mental models)
export const getMentalModelImageUrl = async (imgKey, cb) => {
  const url = await storage.ref(imgKey).getDownloadURL();
  cb(url);
};
