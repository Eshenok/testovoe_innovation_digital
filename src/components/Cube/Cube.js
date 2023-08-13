import React from 'react';
import './Cube.scss';

const Cube = ({quantity,  onClick}) => {

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
    <div className={`cube cube_${determinationClass(quantity)}`} onClick={onClick}>

    </div>
  );
};

export default Cube;
