import React, { useState, useRef } from 'react';

function Image({ src, width, height }) {
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
  const imgRef = useRef();

  const handleImageLoaded = () => {
    const { naturalWidth, naturalHeight } = imgRef.current;
    const aspectRatio = naturalWidth / naturalHeight;
    let newWidth = width;
    let newHeight = height;

    if (aspectRatio > 1) {
      newHeight = width / aspectRatio;
    } else {
      newWidth = height * aspectRatio;
    }

    setImageDimensions({ width: newWidth, height: newHeight });
  };

  return (
    <img
    alt='some'
      src={src}
      ref={imgRef}
      onLoad={handleImageLoaded}
      style={{ width: imageDimensions.width, height: imageDimensions.height }}
    />
  );
}

export default Image;