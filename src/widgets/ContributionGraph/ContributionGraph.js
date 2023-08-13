import React, { useEffect, useState } from 'react';
import Cube from "../../components/Cube/Cube";
import './ContributionGraph.scss';
import { createCalendarGraph } from "../helpers/createCalendarGraph";
import { getJson } from "../helpers/fetchData";

const ContributionGraph = () => {

  const daysOfWeek = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
  const months = [
    'Янв.', 'Февр.', 'Март', 'Апр.', 'Май', 'Июнь',
    'Июль', 'Авг.', 'Сент.', 'Окт.', 'Нояб.', 'Дек.'
  ];

  const [data, setData] = useState(false);

  useEffect(() => {
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

    return sortedMonths.reverse().map(elem => <p className={"graph__month"}>{elem}</p>);
  }

  console.log(data);

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
            graph.map(elem => elem.map(day => day.date.slice(-2) === 'Пн' ? <Cube quantity={day.quantity} day={day} /> : false))
          }
        </div>
        <div className={"graph__row"}>
          {
            graph.map(elem => elem.map(day => day.date.slice(-2) === 'Вт' && <Cube quantity={day.quantity} day={day} />))
          }
        </div>
        <div className={"graph__row"}>
          {
            graph.map(elem => elem.map(day => day.date.slice(-2) === 'Ср' && <Cube quantity={day.quantity} day={day} />))
          }
        </div>
        <div className={"graph__row"}>
          {
            graph.map(elem => elem.map(day => day.date.slice(-2) === 'Чт' && <Cube quantity={day.quantity} day={day} />))
          }
        </div>
        <div className={"graph__row"}>
          {
            graph.map(elem => elem.map(day => day.date.slice(-2) === 'Пт' && <Cube quantity={day.quantity} day={day} />))
          }
        </div>
        <div className={"graph__row"}>
          {
            graph.map(elem => elem.map(day => day.date.slice(-2) === 'Сб' && <Cube quantity={day.quantity} day={day} />))
          }
        </div>
        <div className={"graph__row"}>
          {
            graph.map(elem => elem.map(day => day.date.slice(-2) === 'Вс' && <Cube quantity={day.quantity} day={day} />))
          }
        </div>
      </div>
    </div>
  );
};

export default ContributionGraph;
