export function createCalendarGraph(months, daysOfWeek, quantityData) {

  /*Инит*/
  const today = new Date();
  /*создаю копию*/
  const startDate = new Date(today);
  /*Дата начала, 50 недель назад*/
  startDate.setDate(startDate.getDate() - 50 * 7);

  /*Построение графа*/
  const graph = [];
  /*перебор дней недели*/
  for (let i = 0; i < 7; i++) {
    graph[i] = [];
    /*перебор недель*/
    for (let j = 0; j < 51; j++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(currentDate.getDate() + j * 7 + i);

      const dayOfWeekIndex = currentDate.getDay();
      /*кол-во дней который надо добавить в конец недели, для того чтобы она заканчивалась на ВС*/
      const daysToAddAtEnd = 6 - dayOfWeekIndex;
      /*Удаление дней в начале, чтобы он начинался на ПН*/
      const daysToRemoveFromStart = dayOfWeekIndex - 1;

      currentDate.setDate(currentDate.getDate() + daysToAddAtEnd - daysToRemoveFromStart);

      /*Сборка*/
      const day = currentDate.getDate();
      const month = months[currentDate.getMonth()];
      const year = currentDate.getFullYear();
      const dayOfWeek = daysOfWeek[currentDate.getDay()];

      const quantity = quantityData[`${year}-${String(currentDate.getMonth()).padStart(2, '0')}-${String(day).padStart(2, '0')}`] || 0;

      graph[i][j] = {'date':`${day}/${month}/${year}/${dayOfWeek}`, 'quantity': quantity};
    }
  }

  return graph;
}
