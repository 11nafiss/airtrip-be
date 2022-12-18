const ticketRepository = require("../repositories/ticketRepository");
const flightRepository = require("../repositories/flightsRepository");

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
  try {
    const invoiceNumber = generateInvoiceId();
    const flightType =
      createArgs.flightType.charAt(0).toUpperCase() +
      createArgs.flightType.slice(1);
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
    return result;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

async function getTicketsHistory(userId) {
  try {
    const result = await ticketRepository.getTicketsHistory(userId);
    return result;
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = {
  createTicket,
  getTicketsHistory,
};
