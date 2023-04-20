import React, {useMemo} from 'react';
import {useDropzone} from 'react-dropzone';

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out'
};

const focusedStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};


function StyledDropzone({eventInfo,setEventInfo}) {
    const handleOnDropFiles=(acceptedFiles)=>{
        console.log(acceptedFiles)
        setEventInfo({...eventInfo, photo: acceptedFiles})
      }

  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject
  } = useDropzone({
    accept: ['image/*'],
  maxFiles: 1,
  maxSize: 3 * 1024 * 1024,
  onDrop: handleOnDropFiles})


//   useDropzone(onchange=(e)=>{console.log(e.target.value)},ondrop=(e)=>{console.log("styled", e.target)}, {accept: {'image/*': []}});

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isFocused ? focusedStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isFocused,
    isDragAccept,
    isDragReject
  ]);

  return (
    <div className="container">
      <div {...getRootProps({style})}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
    </div>
  );
}

export default StyledDropzone