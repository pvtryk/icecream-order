import React from 'react'
import SingleBox from './SingleBox/SingleBox'

import './Boxes.scss';

function Boxes(props) {
  // const transformedIcecreams = Object.keys(props.icecreams)
  //   .map(icecreamKey => {
  //     // console.log(key);
  //     return [...Array(props.icecreams[icecreamKey])].map( (_, i) => {
  //       console.log(icecreamKey );
  //     });
  //   });


  const icecreams = Object.values(props.icecreams)
    .map( icKey => {
      return icKey;
    });

  return (
    
    <div className="m-boxes">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="m-boxes__wrap">
              {icecreams.map(val => {
                return (
                  <SingleBox key={val.fullname} prices={props.prices} fullname={val.fullname} />
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Boxes
