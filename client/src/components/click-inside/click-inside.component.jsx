import React, { useState, useRef, useEffect } from "react";

/**
 * Component that alerts if you click outside of it
 *
 */
const useClickInside = (wrapperRef, clickedInside, setClickedInside) => {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    const handleClickOutside = (event) => {
      if (wrapperRef.current && wrapperRef.current.contains(event.target)) {
        //alert("You clicked iutside of me!");
        setClickedInside(clickedInside + 1);
      }
    };
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef, clickedInside, setClickedInside]);
};
const ClickInside = (props) => {
  const wrapperRef = useRef(null);
  const [clickedInside, setClickedInside] = useState(0);
  useClickInside(wrapperRef, clickedInside, setClickedInside);

  return (
    <div ref={wrapperRef}>
      {React.cloneElement(props.children, { clickedInside })}
    </div>
  );
};

export default ClickInside;
