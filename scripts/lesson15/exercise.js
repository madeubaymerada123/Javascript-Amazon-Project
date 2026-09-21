import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { isSatSun } from './weekend.js';

const day = dayjs();
//15a -> bisa sendiri tapi liat2 kode lainnya di lesson 15
export const todayString = day.format(
  'MMMM D'
);
console.log(todayString);

//15b -> harus liat solusi
const today = dayjs();
const date = today.add(1, 'month');

console.log(date.format('MMMM D'));

//15c -> bisa tapi liat kode atas 15b
const today2 = dayjs();
const subtractDate = today2.subtract(1, 'month');
console.log(subtractDate.format('MMMM D'));

//15d -> ya ini lumayan la
const today3 = dayjs();
export const dayOfWeek = today3.format(
  'dddd'
);
console.log(dayOfWeek);

//15e -> liat solusi....tadi bingung liat kenapa kok udh Saturday masih false ternyata pake nya date di console log bukan date2....

let date2 = dayjs();

date2 = dayjs().add(5, 'day');
console.log(date2.format('dddd, MMMM D'))
console.log(isSatSun(date2));

