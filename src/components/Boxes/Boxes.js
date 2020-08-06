import React from 'react'
import SingleBox from './SingleBox/SingleBox'

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
    
    console.log(icecreams);

    // props.icecreams.forEach(element => {
    //   console.log(element);
    // });
  
  // console.log(transformedIcecreams);

  return (
    
    <div className="boxes">
      {icecreams.map(val => {
        return (
          <SingleBox key={val.fullname} prices={props.prices} fullname={val.fullname} />
        )
      })}
    </div>
  );
}

export default Boxes
