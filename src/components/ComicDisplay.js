import React from "react";

const ComicDisplay = (props) => {
  console.log(props);
  const img = props.imgURL;
  return (
    <div class="card mb-2 justify-content-center" style={{height:'220px', width:'220px', margin:'-10px'}}>
      <img src={img} alt="" />
    </div>
  );
};

export default ComicDisplay;
