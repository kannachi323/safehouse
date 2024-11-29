import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "@/firebase/config"; // Adjust your Firebase import path

export async function uploadPhotos(files: File[]): Promise<string[]> {
  const uploadPromises = files.map((file) => {
    return new Promise<string>((resolve, reject) => {
      const photoRef = ref(storage, `listings/${file.name}`);
      const uploadTask = uploadBytesResumable(photoRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload for ${file.name} is ${progress.toFixed(2)}% done`);
        },
        (error) => {
          console.error(`Error uploading ${file.name}:`, error);
          reject(error);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            console.log(`File available at: ${downloadURL}`);
            resolve(downloadURL);
          } catch (error) {
            console.error(`Error getting download URL for ${file.name}:`, error);
            reject(error);
          }
        }
      );
    });
  });

  // Wait for all uploads to complete
  const photoRefs = await Promise.all(uploadPromises);
  console.log("Uploaded image URLs:", photoRefs);
  return photoRefs;
}
