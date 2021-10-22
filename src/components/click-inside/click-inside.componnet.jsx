import React, { useState, useRef } from "react";
import useClickInside from "./useClickInside";

const ClickInside = (props) => {
  const wrapperRef = useRef(null);
  const [clickedInside, setClickedInside] = useState(0);
  useClickInside(wrapperRef, () => {
    setClickedInside(clickedInside + 1);
  });

  return (
    <div ref={wrapperRef}>
      {React.cloneElement(props.children, { clickedInside })}
    </div>
  );
};

export default ClickInside;
