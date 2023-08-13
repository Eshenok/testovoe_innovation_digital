export async function getJson() {
  try {
    const res = await fetch('https://dpg.gg/test/calendar.json');
    const data = await res.json();
    return data;
  } catch (err) {
    console.error('ошибка', err)
  }
}
