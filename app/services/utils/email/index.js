const nodemailer = require("nodemailer");
const handlebars = require("nodemailer-express-handlebars");
const path = require("path");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

transporter.use(
  "compile",
  handlebars({
    viewEngine: {
      extname: ".handlebars",
      defaultLayout: false,
    },
    viewPath: path.resolve(__dirname),
  })
);

function formatDate(date) {
  let dateStrings = date
    .toLocaleString("en-GB", { dateStyle: "long", timeStyle: "short" })
    .split(" at ");
  return `${dateStrings[0]}, ${dateStrings[1]}`;
}

function sendOrderNotification(toEmail, invoice, flight1, flight2, total) {
  /*flight = {from : {iata, date, name}, to:{iata, date, name}} */
  flight1.from.date = formatDate(flight1.from.date);
  flight1.to.date = formatDate(flight1.to.date);
  if (flight2) {
    flight2.from.date = formatDate(flight2.from.date);
    flight2.to.date = formatDate(flight2.to.date);
  }

  let details = {
    from: process.env.EMAIL_USER,
    to: toEmail,
    subject: "Airtrip-Pemesanan anda berhasil!",
    template: "index",
    context: {
      invoice,
      flight1,
      flight2,
      total,
    },
  };
  transporter.sendMail(details).then((info, err) => {
    if (err) {
      return console.log("Nodemailer error: " + JSON.stringify(err));
    }

    console.log(`Email sent to ${info.accepted}!`);
  });
}

module.exports = { sendOrderNotification };
