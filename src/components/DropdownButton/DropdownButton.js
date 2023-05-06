import React, { useState } from 'react';
import { Button } from 'semantic-ui-react';

function DropdownButton(props) {
  const [isOpen, setIsOpen] = useState(false);
  
  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  
//   const handleButtonClick = (button) => {
//     setIsOpen(false);
//     props.onButtonClick(button);
//   };
  
  return (
    <div className="dropdown">
      {/* <button className="dropdown-toggle" onClick={handleClick}>
        clicl
      </button> */}
      <Button className="btn" onClick={()=>{handleClick()}}>Menu</Button>

      {isOpen && (
        <div className="dropdown-menu">
          {props.buttons.map((button, index) => (
            // <button key={index} onClick={() => handleButtonClick(button)}>
            //   {button}
            // </button>
            <Button className="btn" onClick={()=>{button.onClick()}}>{button.title}</Button>

          ))}
        </div>
      )}
    </div>
  );
}

export default DropdownButton;
