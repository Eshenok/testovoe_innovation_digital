import React from 'react';
import './Popup.scss';

const Popup = ({quantity, date, isOpen, y, x}) => {

  return (
    <div className={`popup ${isOpen && 'popup_open'}`} style={{
      top: `calc(${y}px - 47px)`,
      left: `calc(${x}px - (145px/2) + (15px/2))`,
    }}>
      <p className={'popup__title'}>{quantity} contribution{quantity === 1 ? "" : "s"}</p>
      <p className={'popup__date'}>{date}</p>
    </div>
  );
};

export default Popup;
