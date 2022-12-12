function randomDate(start, end) {
  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
  };

  // buat date awal
  let date = new Date(+start + Math.random() * (end - start));
  // console.log("original date :", date.toLocaleDateString("ID", options));

  let hour = randomHour();
  let minute = randomMinute();

  date.setHours(hour, minute, 0, 0);
  // console.log(
  //   "set hour and minute to:",
  //   hour,
  //   "hour",
  //   minute,
  //   "minute : ",
  //   date.toLocaleDateString("ID", options),
  //   "\n"
  // );

  // buat durasi
  let duration = randomDuration();
  // console.log("duration", duration, "\n");

  // konversi
  let hour2 = hour + Math.floor(duration / 60);
  let minute2 = (duration % 60) + minute;

  // buat arrival
  let date2 = date;
  date2.setHours(hour2, minute2);

  // console.log(
  //   "after",
  //   Math.floor(duration / 60),
  //   "hour",
  //   Math.floor(duration % 60),
  //   "minute : ",
  //   date2.toLocaleDateString("ID", options),
  //   "\n"
  // );

  let result = {
    departure: date,
    arrival: date2,
  };

  // console.log(result);
  return result;
}

function randomHour() {
  const min = Math.ceil(0);
  const max = Math.floor(23);

  const result = Math.floor(Math.random() * (max - min + 1)) + min;
  return result;
}

function randomMinute() {
  const min = Math.ceil(0);
  const max = Math.floor(59);

  const random = Math.floor(Math.random() * (max - min + 1)) + min;
  const sisa = random % 5;

  const result = random - sisa;
  return result;
}

function randomDuration() {
  // mininal 1 jam
  const min = Math.ceil(60);
  // max 12 jam
  const max = Math.floor(720);

  const random = Math.floor(Math.random() * (max - min + 1)) + min;
  const sisa = random % 5;

  const result = random - sisa;

  return result;
}

module.exports = {
  randomDate,
};
