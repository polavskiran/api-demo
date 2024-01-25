import React from "react";
import classes from './displayImages.module.css';

export const DisplayImages = (props) => {
  const { images } = props;

  return (
    images && (
      <div className={classes.imageGallery}>
        {images.map((img, index) => {
          return <img alt={img} src={img}/>;
        })}
      </div>
    )
  );
};

export default DisplayImages;
