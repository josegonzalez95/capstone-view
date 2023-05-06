import React, { useState, useRef, useEffect } from 'react';

function ResizableImage({ src, aspectRatio }) {
  const [width, setWidth] = useState(null);
  const containerRef = useRef(null);

//   const handleLoad=()=> {
//     console.log(containerRef.current)
//     if (containerRef.current) {
//       const containerWidth = containerRef.current.offsetWidth;
//       setWidth(containerWidth);
//     }
//   }


    useEffect(()=>{
        if (containerRef.current) {
            const containerWidth = containerRef.current.offsetWidth;
            setWidth(containerWidth);
        }
    },[])

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        paddingBottom: `${(1 / aspectRatio) * 100}%`,
        position: 'relative',
        marginBottom:"2rem"
      }}
    >
    {console.log(width, containerRef)}

      {width && (
        <img
          src={src}
          alt='some'
        //   onLoad={handleLoad}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      )}
    </div>
  );
}

export default ResizableImage;
