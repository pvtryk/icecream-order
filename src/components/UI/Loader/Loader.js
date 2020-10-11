import React from 'react'
import './Loader.scss';

function Loader() {
  console.log('loaded');

  return (
    <div className="loader">
      <div className="loader__spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default Loader
