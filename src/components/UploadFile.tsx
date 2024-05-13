'use client';

import { SingleImageDropzone } from '@/components/SingleImageDropzone';
import { useEdgeStore } from '@/lib/providers';
import { useState } from 'react';

function UploadFile({ onUrlChange }: { onUrlChange: (url: string) => void }) {
  const [file, setFile] = useState<File>();
  const [progress, setProgress] = useState(0);
  const { edgestore } = useEdgeStore();

  return (
    <div>
      <SingleImageDropzone
        width={200}
        height={200}
        value={file}
        dropzoneOptions={{
          maxSize: 1024 * 1024 * 10, // 10MB
        }}
        onChange={(newFile) => {
          setFile(newFile);
          if (newFile) {
            const uploadImage = async () => {
              try {
                const res = await edgestore.publicImages.upload({
                  file: newFile,
                  options: { temporary: true },
                  onProgressChange: (progress) => setProgress(progress), // Show progress
                });

                const imageUrl = res.url;
                // console.log(`Uploaded image URL: ${imageUrl}`);

                onUrlChange(imageUrl); // Pass the URL to the parent component
              } catch (error) {
                console.error('Upload error:', error);
              }
            };
            uploadImage();
          }
        }}
      />
      <div className="h-[6px] w-[12.5rem] border border-black rounded overflow-hidden">
        <div
          className="h-full bg-green-600 transition-all duration-150"
          style={{ width: `${progress}%` }}
        />
        srth
      </div>
    </div>
  );
}

export default UploadFile;
