import { useState } from 'react';
import '../../assets/styles/tooltip.css';

const Tooltip = ({ texto, children }) => {
  const [showTooltip, setShowTooltip] = useState(true);

  // const toggleTooltip = () => {
  //   setShowTooltip(previous=> !previous);
  //   // console.log('entro tooltip', texto)
  // };

  return (
    <div
      className="tooltip-container"
      // onMouseEnter={toggleTooltip}
      // onMouseLeave={toggleTooltip}
      onMouseEnter={()=> setShowTooltip(true)}
      onMouseLeave={()=> setShowTooltip(false)}
      onClick={()=> setShowTooltip(false)}
    >
      {children}
      {showTooltip && <small className="tooltip-container_tooltip">{texto}</small>}
    </div>
  );
};

export default Tooltip;