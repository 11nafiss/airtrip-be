const ticketRepository = require("../repositories/ticketRepository");
const flightRepository = require("../repositories/flightsRepository");
const notificationRepository = require("../repositories/notificationRepository");

const { customAlphabet } = require("nanoid");
const { RecordNotFoundError } = require("../errors");
const nanoid = customAlphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZ", 5);
function generateInvoiceId() {
  const uid = nanoid();
  const now = new Date();
  return uid + now.getDate() + now.getMonth() + now.getFullYear();
}
function generateSeat() {
  const col = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
  return (
    Math.floor(Math.random() * 52 + 1).toString() +
    col[Math.floor(Math.random() * col.length)]
  );
}

async function createTicket(user, createArgs) {
  const invoiceNumber = generateInvoiceId();
  const flightType =
    createArgs.flightType.charAt(0).toUpperCase() +
    createArgs.flightType.slice(1);

  // get flights
  const flight = await flightRepository.getFlightById(createArgs.flightId);
  if (!flight) {
    return new RecordNotFoundError(
      `flight id ${createArgs.flightId} not found!`
    );
  }
  const seat1 = generateSeat();
  let totalPrice = flight.price;

  let flight2 = null;
  let seat2 = null;
  if (createArgs.flightId2) {
    flight2 = await flightRepository.getFlightById(createArgs.flightId2);
    if (!flight2) {
      return new RecordNotFoundError(
        `flight id ${createArgs.flightId2} not found!`
      );
    }
    seat2 = generateSeat();
    totalPrice += flight2.price;
  }

  // create ticket
  const result = await ticketRepository.createTicket(
    user,
    totalPrice,
    invoiceNumber,
    flightType,
    flight,
    seat1,
    flight2,
    seat2
  );

  // create notification
  let notificationMessage = `Pemesanan tiket rute ${flight.from_airport.iata} ke ${flight.to_airport.iata}`;
  if (flight2) {
    notificationMessage += ` dan ${flight2.from_airport.iata} ke ${flight2.to_airport.iata} `;
  }
  notificationMessage += "berhasil!";

  notificationRepository.createNotification(
    user.id,
    result.id,
    notificationMessage
  );

  return result;
}

async function getTickets(userId) {
  const result = await ticketRepository.getTickets(userId);
  return result;
}

module.exports = {
  createTicket,
  getTickets,
};
