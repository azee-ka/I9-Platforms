import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './createPostNonOverlay.css';
import API_BASE_URL from '../../../../config';
import crossIcon from '../../../../assets/cross-icon.png';
import VideoPlayer from '../../utils/videoPlayer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
// import '@fortawesome/fontawesome-free/css/all.css';
import { useAuth } from '../../../../reducers/auth/useAuth';

const CreatePostNonOverlay = () => {
  const { authState } = useAuth();
  
  const navigate = useNavigate();

  const [content, setContent] = useState('');

  const textAreaRef = useRef(null);

  const [uploadedMedia, setUploadedMedia] = useState([]);
  const [previewMedia, setPreviewMedia] = useState(null);

  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);


  useEffect(() => {
    setCurrentMediaIndex(0);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Check if either content or media is provided
    if (!content && uploadedMedia.length === 0) {
      alert('Please provide either text or media.');
      return;
    }

    // Assuming 'content' and 'uploadedMedia' are variables containing your data
    const formData = new FormData();
    formData.append('text', content); // Replace with your actual content data
    // Append each media file to the form data
    uploadedMedia.forEach((file, index) => {
      formData.append(`media[]`, file);
    });


    fetch(`${API_BASE_URL}personal/create-post/`, {
      method: 'POST',
      headers: {
        'Authorization': `Token ${authState.token}`, // Use 'Authorization' header for the token    'Accept': 'application/json', // Indicate the expected response format
        'Accept': 'application/json', // Indicate the expected response format
      },
      body: formData, // Use FormData to send both 'text' and 'media' fields
    })

      .then((response) => response.json())
      .then((data) => {
        // Post created successfully, close the overlay and navigate to the new post's page
        navigate(`/post/${data.id}`);
      })
      .catch((error) => console.error('Error creating post:', error));
  };



  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleButtonClick = (command, value = null) => {
    //document.execCommand(command, false, value);
  };

  const handleSelectedMedia = (event) => {
    const selectedFiles = event.target.files;

    // Check if files were actually selected
    if (selectedFiles.length > 0) {
      // Check each selected file
      const validMediaFiles = Array.from(selectedFiles).filter(
        (file) => file.type.startsWith('image/') || file.type.startsWith('video/')
      );

      if (validMediaFiles.length > 0) {
        // Use the callback form of setUploadedMedia to ensure you're working with the latest state
        setUploadedMedia((prevMedia) => [...prevMedia, ...validMediaFiles]);

        // Set the index to the first media file
        setCurrentMediaIndex(0);

        // Preview the first media file
        setPreviewMedia(URL.createObjectURL(validMediaFiles[0]));

      } else {
        // Handle the case where no valid media files were selected
        alert('Please select valid media files (images or videos).');
      }
    }
  };


  const handleNextMedia = () => {
    setCurrentMediaIndex((prevIndex) => (prevIndex + 1));
    setPreviewMedia(URL.createObjectURL(uploadedMedia[currentMediaIndex + 1]));
  };

  const handlePreviousMedia = () => {
    setCurrentMediaIndex((prevIndex) => (prevIndex - 1));
    setPreviewMedia(URL.createObjectURL(uploadedMedia[currentMediaIndex - 1]));
  };

  const handleMediaUpload = (event) => {
    // Trigger the file input click when the user clicks on the "Upload Media" area
    console.log("helek")
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/* video/*'; // Set the accepted file types as needed
    fileInput.multiple = true; // Allow multiple file selection
    fileInput.click();
    fileInput.addEventListener('change', handleSelectedMedia);
  };

  const buttons = [
    { label: 'B', command: 'bold', style: { fontWeight: 'bold' } },
    { label: 'I', command: 'italic', style: { fontStyle: 'italic' } },
    { label: 'U', command: 'underline', style: { textDecoration: 'underline' } },
    { label: 'S', command: 'strikeThrough', style: { textDecoration: 'line-through' } },
    { label: 'Link', command: 'createLink', promptValue: true },
  ];

  const renderMediaContent = (uploadedMediaThis, onEnded) => {
    console.log(uploadedMediaThis[currentMediaIndex].type);
    console.log(uploadedMediaThis[currentMediaIndex].type.includes('video'));
    console.log(currentMediaIndex);
    const medias = {
      file: previewMedia,
      media_type: uploadedMediaThis[currentMediaIndex].type,
      id: currentMediaIndex,
    }
    if (uploadedMediaThis[currentMediaIndex].type.includes('video')) {
      return (
        <VideoPlayer
          mediaFile={medias}
          onEnded={onEnded}
          playable={true}
          url={`http://10.0.0.85:3000`}
        />
      );
    } else {
      return (
        <img src={previewMedia} alt={uploadedMediaThis.id} />
      );
    }
  };

  return (
    <div className={`create-post-overlay-non-overlay`}>
      <div className={`create-post-content-non-overlay`}>
        <h2>Create a New Post</h2>
        <form>
          <textarea
            ref={textAreaRef}
            value={content}
            onChange={handleContentChange}
            placeholder="Write your post here..."
          ></textarea>
          <div className="menubar-non-overlay">
            {buttons.map((button, index) => (
              <React.Fragment key={index}>
                {button.promptValue ? (
                  <button
                    style={button.style}
                    onClick={() => handleButtonClick(button.command, prompt(`Enter ${button.label} value:`))}
                  >
                    {button.label}
                  </button>
                ) : (
                  <button style={button.style} onClick={() => handleButtonClick(button.command)}>
                    {button.label}
                  </button>
                )}
              </React.Fragment>
            ))}
            <select onChange={(e) => handleButtonClick('formatBlock', e.target.value)}>
              <option value="p">Normal Text</option>
              <option value="h1">Header 1</option>
              <option value="h2">Header 2</option>
              <option value="h3">Header 3</option>
            </select>
            <button onClick={() => handleButtonClick('undo')}>{String.fromCharCode(8630)}</button>
            <button onClick={() => handleButtonClick('redo')}>{String.fromCharCode(8631)}</button>
          </div>
          <div className="create-post-buttons-non-overlay">
            <button type="submit" onClick={handleSubmit}>Post</button>
          </div>
        </form>
        <div className={`create-post-uploaded-one-media-non-overlay`}>
          {uploadedMedia.length > 0 &&
            <div className={`media-upload-container-non-overlay`} onClick={handleMediaUpload}>
              <div className="upload-icon-non-overlay" onClick={handleMediaUpload}>
                +
              </div>
              <div className="upload-text-non-overlay" onClick={handleMediaUpload}>
                Upload Media
              </div>
            </div>
          }
        </div>
      </div>
      <div className={`media-container-non-overlay`}>
        {/* Conditionally display the uploaded media card */}
        {uploadedMedia.length !== 0 ? (
          <div className={`uploaded-media-card-non-overlay`}>

            <div className={`create-post-previous-next-media-buttons-non-overlay`}>
              <div className={`create-post-previous-media-button${uploadedMedia[currentMediaIndex].type.includes('video') ? '-video' : ''}-non-overlay`}>
                {currentMediaIndex !== 0 &&
                  <button onClick={handlePreviousMedia}>
                    <FontAwesomeIcon icon={faChevronLeft} />
                  </button>
                }
              </div>
              <div className={`create-post-next-media-button${uploadedMedia[currentMediaIndex].type.includes('video') ? '-video' : ''}-non-overlay`}>
                {currentMediaIndex !== (uploadedMedia.length - 1) &&
                  <button onClick={handleNextMedia}>
                    <FontAwesomeIcon icon={faChevronRight} />
                  </button>
                }
              </div>
            </div>
            {/* Display the uploaded media here */}
            {uploadedMedia.length > 0 && (
              <div className={`create-post-media-display-non-overlay`}>
                  {renderMediaContent(uploadedMedia, null)}
                {/* <img src={previewMedia} alt="Uploaded Media" /> */}
              </div>
            )}
          </div>
        ) : null}
        {uploadedMedia.length <= 0 &&
          <div className={`media-upload-container-non-overlay`} onClick={handleMediaUpload}>
            <div className="upload-icon-non-overlay" onClick={handleMediaUpload}>
              +
            </div>
            <div className="upload-text-non-overlay" onClick={handleMediaUpload}>
              Upload Media
            </div>
          </div>
        }
      </div>
    </div>
  );
};

export default CreatePostNonOverlay;