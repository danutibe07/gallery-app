import React, { useState, useEffect } from "react";
import ProgressBar from "./ProgressBar";

const SelectFiles = () => {
  const [image, setImage] = useState(null);
  const [errormsg , selectError] = useState(null);
  const imageTypes = ["image/jpeg", "image/png"];

  const handleDragEnter = (e) => {
    e.preventDefault();
    document.getElementById("dropcontainer").classList.add("drag-active");
  };

  const handleDragLeave = () => {
    document.getElementById("dropcontainer").classList.remove("drag-active");
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    document.getElementById("dropcontainer").classList.remove("drag-active");

    let selected = e.dataTransfer.files[0];

    if (selected && imageTypes.includes(selected.type)) {
      setImage(selected);
      selectError("");
      changeHandler(selected); // Call changeHandler with the dropped file
    } else {
      setImage(null);
      selectError("Select a valid image file type (jpeg or png)");
    }
  };

useEffect(() => {
  console.log(image)
}, [image]);

  const changeHandler = (selected) => {
    if (selected && imageTypes.includes(selected.type)) {
      setImage(selected);
      selectError("");
    } else {
      setImage(null);
      selectError("Select a valid image file type (jpeg or png)");
    }
  };

  return (
    <form>
      <label
        htmlFor="images"
        className="drop-container"
        id="dropcontainer"
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <span className="drop-title">Drop files here</span> or
        <input
          type="file"
          id="images"
          class="inputfile"
          onChange={(e) => changeHandler(e.target.files[0])}
        />
      </label>
      <div className="prompts">
        {errormsg && <div className="errormsg">{errormsg}</div>}
        {image && <div> {image.name}</div>}
        {image && <ProgressBar image={image} setImage={setImage} />}
      </div>
    </form>
  );
};

export default SelectFiles;
