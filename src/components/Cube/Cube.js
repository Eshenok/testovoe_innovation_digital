import React from 'react';
import './Cube.scss';

const Cube = ({quantity, day}) => {

  function determinationClass(quantity) {
    if (quantity < 1) {
      return 'stock';
    } else if (quantity < 10) {
      return 'low';
    } else if (quantity < 20) {
      return 'mid';
    } else if (quantity < 30) {
      return 'high';
    } else if (quantity >= 30) {
      return 'very-high';
    }
  }

  return (
    <div className={`cube cube_${determinationClass(quantity)}`} onClick={() => {console.log(day)}}>

    </div>
  );
};

export default Cube;
