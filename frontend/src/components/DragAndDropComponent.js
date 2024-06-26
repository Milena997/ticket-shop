import React, { useEffect, useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { MdClear } from "react-icons/md";
import "./drag-drop.css";

const DragAndDropComponent = ({ onFilesSelected, height }) => {
  const [files, setFiles] = useState([]);

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFiles = Array.from(event.dataTransfer.files);
    setFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
  };

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
  };

  const handleRemoveFile = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  useEffect(() => {
    onFilesSelected(files);
  }, [files, onFilesSelected]);

  return (
    <section className="drag-drop" style={{ height }}>

      <div className="document-uploader" onDrop={handleDrop} onDragOver={(event) => event.preventDefault()}>
      {files.length > 0 ? (
          <div className="file-list">
            {files.map((file, index) => (
              <div className="file-item" key={index}>
                <div className="file-info">
                  <p>{file.name}</p>
                </div>
                <div className="file-actions">
                  <MdClear onClick={() => handleRemoveFile(index)} />
                </div>
              </div>
            ))}
          </div>
        ) :
        <div>
        <div className="upload-info flex justify-center flex-col">
          <AiOutlineCloudUpload />
          <div>
            <p>Drag and drop your files here</p>
            <p>Supported files: .JPG, .PNG</p>
          </div>
        </div>
        <input type="file" hidden id="browse" onChange={handleFileChange} multiple />
        <label htmlFor="browse" className="browse-btn hover:bg-white hover:text-black">Browse files</label>
       </div>
    }
    </div>
    </section>
  );
};

export default DragAndDropComponent;
