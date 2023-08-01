import React, { useState } from "react";

const useSelectFile = () => {
  // State to store the selected file as a data URL
  const [selectedFile, setSelectedFile] = useState<string>();

  const onSelectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("THIS IS HAPPENING", event);

    // Create a new FileReader to read the selected file as a data URL
    const reader = new FileReader();

    // Check if a file is selected
    if (event.target.files?.[0]) {
      // Read the selected file as a data URL
      reader.readAsDataURL(event.target.files[0]);
    }

    // Set the selectedFile state when the file reading is completed
    reader.onload = (readerEvent) => {
      if (readerEvent.target?.result) {
        setSelectedFile(readerEvent.target.result as string);
      }
    };
  };

  // Return the selectedFile state, setSelectedFile function, and onSelectFile event handler
  return {
    selectedFile,
    setSelectedFile,
    onSelectFile,
  };
};

export default useSelectFile;
