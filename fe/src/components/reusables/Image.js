import React from 'react';

const Image = ({ src, alt, width, height, className, onClick }) => {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      onClick={onClick}
    />
  );
};

export default Image;
