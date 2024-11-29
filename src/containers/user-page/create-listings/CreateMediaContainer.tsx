import { Listing } from "@/types";
import Dropzone from "react-dropzone";
import { MdPhotoSizeSelectActual } from "react-icons/md";
import { uploadPhotos } from "@/firebase/storage";
import { useState } from "react";

interface Props {
    listingValues: Listing;
    setListingValues: (listingValues: Listing) => void;
}

export default function CreateMediaContainer({listingValues, setListingValues} : Props) {
  const [loading, setLoading] = useState(false);

  async function handleMedia(acceptedFiles : File[]) {
    setLoading(true);
    try {
      setListingValues({
        ...listingValues,
        media: [],
      })
      const photoRefs = await uploadPhotos(acceptedFiles);
      const mediaEntries = photoRefs.map((photoRef) => ({
        ref: photoRef,
        listing_id: -1,
      }))

      setListingValues({
        ...listingValues,
        media: [...mediaEntries],
      })
    } catch (error) {
      console.error("Error uploading media:", error);
    }

    setLoading(false);
    
  }

  return (
    <>
      <div className="w-full border-b-4 border-b-[#013c6c]">
        <h2 className="text-2xl text-center font-semibold text-gray-800 mb-1">Media</h2>
      </div>
      <Dropzone onDrop={acceptedFiles => handleMedia(acceptedFiles)}>
        {({ getRootProps, getInputProps, isDragActive }) => (
          <div {...getRootProps()} className={`text-[#013c6c] p-10 rounded-2xl ${
            isDragActive ? "bg-slate-200" : "bg-slate-300"
          } hover:bg-slate-200`}>

            <input {...getInputProps()} />
            <div className="flex flex-col items-center justify-center h-full w-full">
              <MdPhotoSizeSelectActual className="text-5xl" />
              <p className="text-lg">
                Drag and drop a photo here, or click to select a file
              </p>
            </div>
            
          </div>
        )}
      </Dropzone>
      {/* popup loading */}
      {loading && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
          <div className="fixed top-1/2 left-1/2 bg-white text-black text-lg z-50 p-6 rounded-lg shadow-lg">
            Please wait while we upload your media...
          </div>
        </>
      )}
    </>
      
  )
}