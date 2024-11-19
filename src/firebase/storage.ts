import { storage } from "@/firebase/config";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

export async function uploadFile(files: File[]) : Promise<string[]>{
    const downloadURLs: string[] = [];

    for (const file of files) {
        try {
            const fileRef = ref(storage, `images/${file.name}`);
            const uploadTask = uploadBytesResumable(fileRef, file);

            // Wait for the upload to finish and track progress
            await new Promise<void>((resolve, reject) => {
                uploadTask.on(
                    "state_changed",
                    (snapshot) => {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log(`Upload is ${progress.toFixed(2)}% done for ${file.name}`);
                    },
                    (error) => {
                        console.error(`Error uploading ${file.name}:`, error);
                        reject(error);
                    },
                    () => {
                        resolve();
                    }
                );
            });

            // Get the download URL after the upload is complete
            const downloadURL = await getDownloadURL(fileRef);
            console.log(`File available at ${downloadURL}`);
            downloadURLs.push(downloadURL);

        } catch (error) {
            console.error(`Error processing ${file.name}:`, error);
            // Handle specific errors or skip to the next file
        }
    }

    return downloadURLs;


}