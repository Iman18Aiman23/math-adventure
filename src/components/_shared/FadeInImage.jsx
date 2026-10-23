import { useState } from 'react';
import './FadeInImage.css';

export default function FadeInImage({ className = '', onLoad, src, ...imageProps }) {
  const [loadedSrc, setLoadedSrc] = useState(null);
  const classes = ['fade-in-image', className, loadedSrc === src ? 'is-loaded' : '']
    .filter(Boolean)
    .join(' ');

  return (
    <img
      {...imageProps}
      src={src}
      className={classes}
      onLoad={event => {
        setLoadedSrc(src);
        onLoad?.(event);
      }}
    />
  );
}
