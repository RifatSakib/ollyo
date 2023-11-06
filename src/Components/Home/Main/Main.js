import React, { useState } from 'react';
import './Main.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import landphone from '../../../images/landphone.jpg';
import cycle from '../../../images/cycle.jpg';
import head1 from '../../../images/headphone-1.jpg';
import head2 from '../../../images/headphone-2.jpg';
import head3 from '../../../images/headphone-3.jpg';
import head4 from '../../../images/headphone-4.jpg';
import head5 from '../../../images/headphone-5.jpg';
import watch1 from '../../../images/watch-1.jpg';
import watch2 from '../../../images/watch-2.jpg';
import watch3 from '../../../images/watch-3.jpg';

// images objects with ids, urls, and isMarked 
const images = [
  { id: 1, url: landphone, isMarked: false },
  { id: 2, url: head1, isMarked: false },
  { id: 3, url: cycle, isMarked: false },
  { id: 4, url: head3, isMarked: false },
  { id: 5, url: watch1, isMarked: false },
  { id: 6, url: head5, isMarked: false },
  { id: 7, url: head2, isMarked: false },
  { id: 8, url: watch3, isMarked: false },
  { id: 9, url: head4, isMarked: false },
  { id: 10, url: watch2, isMarked: false },
];

// Function to find an image url by its id
function findImageUrlById(id) {
  const image = images.find(image => image.id === id);
  if (image) {
    return image.url;
  }
  return null;
}

const Main = () => {
  // Initialize a state variable 'count' to keep track of the number of selected images
  const [count, setCount] = useState(0);

  // Function to handle the deletion of selected images
  const handleDelete = () => {
    // Create a new array with only the unselected images
    const updatedImages = images.filter(image => !image.isMarked);
    // Replace the original 'images' array with the updated one
    images.splice(0, images.length, ...updatedImages);
    // Reset the count of selected images to 0
    setCount(0);
  };

  // Function to handle the change in image selection
  const handleChange = (id, isChecked) => {
    // Create a new array with updated selection state for the clicked image
    const updatedImages = images.map(image =>
      image.id === id ? { ...image, isMarked: isChecked } : image
    );
    // Replace the original 'images' array with the updated one
    images.splice(0, images.length, ...updatedImages);
    // Update the count of selected images
    setCount(updatedImages.filter(image => image.isMarked).length);
  };

  return (
    <div className="container-fluid">
      {/* Header section */}
      <div style={{ padding: '20px', borderBottom: '0.5px solid gray' }} className="row">
        <div className="col-md-6 d-flex align-items-center">
          <h4 >{count}-Files Selected</h4>
        </div>
        <div className="col-md-6 d-flex justify-content-end d-flex align-items-center">
          <h4 className="deletebtn" onClick={handleDelete}>
            Delete Files
          </h4>
        </div>
      </div>

      {/* Main section for displaying images */}
      <div className="grid-container">
        {images.map((image, index) => (
          <ImageItem key={image.id} image={image} handleChange={handleChange} isFirstImage={index === 0} />
        ))}
        <div style={{ border: '1px dashed black' }} >
          <p className="addimg">
            <FontAwesomeIcon style={{ fontSize: '40px' }} icon={faImage} /> <br /> +Add Image
          </p>
        </div>
      </div>
    </div>
  );
};



// Component for rendering each image item
const ImageItem = ({ image, handleChange, isFirstImage }) => {
  const gridStyle = {
    gridColumn: isFirstImage ? '1 / 3' : 'auto', // Set grid column for the first image
    gridRow: isFirstImage ? '1 / 3' : 'auto', // Set grid row for the first image
  };

  return (
    <div style={gridStyle}>
    {/* For black shadow when hovered */}
    <div className={`blackshadow ${image.isMarked ? 'selected' : ''}`}>
      {/* For Checkbox based on id */}
      <input
        id={`${image.id}`}
        onChange={() => handleChange(image.id, !image.isMarked)}
        style={{ position: 'absolute', zIndex: 1 }}
        type="checkbox"
        checked={image.isMarked}
      />
      {/* Display the image with a fluid layout and set its source based on the image's ID */}
      <img className="img-fluid image" src={findImageUrlById(image.id)} alt="" />
    </div>
  </div>
  );
};

export default Main;
