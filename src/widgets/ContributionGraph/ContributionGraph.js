import React, { useEffect, useState } from 'react';
import Cube from "../../components/Cube/Cube";
import './ContributionGraph.scss';
import { createCalendarGraph } from "../helpers/createCalendarGraph";
import { getJson } from "../helpers/fetchData";
import Popup from "../../components/Popup/Popup";

const ContributionGraph = () => {

  const daysOfWeek = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
  const months = [
    'Янв.', 'Февр.', 'Март', 'Апр.', 'Май', 'Июнь',
    'Июль', 'Авг.', 'Сент.', 'Окт.', 'Нояб.', 'Дек.'
  ];

  const [selectedCube, setSelectedCube] = useState({});
  const [data, setData] = useState(false);
  const [popupData, setPopupData] = useState({"isOpen": false, "x": 0, "y": 0, "quantity": '', "date": ''});

  useEffect(() => {
    window.removeEventListener('keydown', onPressEsc);
    window.addEventListener('keydown', onPressEsc);
    if (!data) {
      getJson().then(res => setData(res));
    }
  }, [])

  const graph = createCalendarGraph(months, daysOfWeek, data);

  const sortMonths = () => {
    const sortedMonths = [];
    const currIndex = new Date().getMonth();

    for (let i = currIndex; i >= 0; i--) {
      sortedMonths.push(months[i])
    }
    for (let i = months.length - 1; i > currIndex; i--) {
      sortedMonths.push(months[i]);
    }

    return sortedMonths.reverse().map((elem, i) => <p key={i} className={"graph__month"}>{elem}</p>);
  }

  const onSelectCube = (e, day) => {
    setSelectedCube(day);
    const elemPositiion = e.target.getBoundingClientRect();
    const date = day.date.split('/');
    const stringDate = date[3]+', '+date[1]+', '+date[0]+', '+ date[2];

    setPopupData({"isOpen": true, x: elemPositiion.x, y: elemPositiion.y, date: stringDate, quantity: day.quantity});
  }

  function onPressEsc(e) {
    if (e.key === 'Escape') {
      setPopupData({...popupData, isOpen: false});
    }
  }

  return (
    <div className={"graph"}>
      <div className={'graph__months'}>
        {
          sortMonths()
        }
      </div>
      <div className={"graph__days"}>
        <p>пн</p>
        <p> </p>
        <p>ср</p>
        <p></p>
        <p>пт</p>
        <p></p>
        <p></p>
      </div>
      <div className={"graph__container"}>
        <div className={"graph__row"}>
          {
            graph.map(elem => elem.map(day => day.date.slice(-2) === 'Пн' && <Cube isSelected={day.date === selectedCube.date} key={day.date} onClick={(e) => {onSelectCube(e, day)}} quantity={day.quantity} day={day} />))
          }
        </div>
        <div className={"graph__row"}>
          {
            graph.map(elem => elem.map(day => day.date.slice(-2) === 'Вт' && <Cube isSelected={day.date === selectedCube.date} key={day.date} onClick={(e) => {onSelectCube(e, day)}} quantity={day.quantity} day={day} />))
          }
        </div>
        <div className={"graph__row"}>
          {
            graph.map(elem => elem.map(day => day.date.slice(-2) === 'Ср' && <Cube isSelected={day.date === selectedCube.date} key={day.date} onClick={(e) => {onSelectCube(e, day)}} quantity={day.quantity} day={day} />))
          }
        </div>
        <div className={"graph__row"}>
          {
            graph.map(elem => elem.map(day => day.date.slice(-2) === 'Чт' && <Cube isSelected={day.date === selectedCube.date} key={day.date} onClick={(e) => {onSelectCube(e, day)}} quantity={day.quantity} day={day} />))
          }
        </div>
        <div className={"graph__row"}>
          {
            graph.map(elem => elem.map(day => day.date.slice(-2) === 'Пт' && <Cube isSelected={day.date === selectedCube.date} key={day.date} onClick={(e) => {onSelectCube(e, day)}} quantity={day.quantity} day={day} />))
          }
        </div>
        <div className={"graph__row"}>
          {
            graph.map(elem => elem.map(day => day.date.slice(-2) === 'Сб' && <Cube isSelected={day.date === selectedCube.date} key={day.date} onClick={(e) => {onSelectCube(e, day)}} quantity={day.quantity} day={day} />))
          }
        </div>
        <div className={"graph__row"}>
          {
            graph.map(elem => elem.map(day => day.date.slice(-2) === 'Вс' && <Cube isSelected={day.date === selectedCube.date} key={day.date} onClick={(e) => {onSelectCube(e, day)}} quantity={day.quantity} day={day} />))
          }
        </div>
      </div>
      <Popup isOpen={popupData.isOpen} x={popupData.x} y={popupData.y} date={popupData.date} quantity={popupData.quantity}/>
    </div>
  );
};

export default ContributionGraph;
