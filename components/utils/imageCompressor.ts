// utils/imageCompressor.ts

import imageCompression from 'browser-image-compression';

export const compressImageFromUrl = async (imageUrl: string): Promise<string> => {
  try {
    const response = await fetch(imageUrl);
    const imageBlob = await response.blob();
    // Convert Blob to File
    const imageFile = new File([imageBlob], "image.jpg", { type: imageBlob.type, lastModified: Date.now() });

    const options = {
      maxSizeMB: 0.0009, // target ~1KB
      maxWidthOrHeight: 100,
      useWebWorker: true,
    };

    const compressedFile = await imageCompression(imageFile, options);
    const compressedBase64 = await imageCompression.getDataUrlFromFile(compressedFile);

    return compressedBase64;
  } catch (error) {
    console.error("Error compressing image:", error);
    return imageUrl; 
  }
};
