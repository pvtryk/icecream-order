import React from 'react'
import SingleBox from './SingleBox/SingleBox'

function Boxes(props) {
  return (
    <div>
      <SingleBox prices={props.prices} fullname={'adad'} />
    </div>
  );
}

export default Boxes
