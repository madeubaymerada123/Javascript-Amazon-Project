//15f tadi kira udh bener pake export function ternyata harus export default....soalnya udh bener tadi

function isSatSun(date){
  const dayOfWeek2 = date.format('dddd');
  return dayOfWeek2 === 'Saturday' || dayOfWeek2 === 'Sunday';
}

export default isSatSun;
