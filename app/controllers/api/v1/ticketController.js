const { RecordNotFoundError } = require("../../../errors");
const ticketService = require("../../../services/ticketService");

async function handleCreateTicket(req, res, next) {
  // req.body = {flightId, flightId2, flightType}
  try {
    const result = await ticketService.createTicket(req.user, req.body);
    if (result instanceof RecordNotFoundError) {
      return res.status(404).json({ message: result.message });
    }
    res.status(201).json({ data: result });
  } catch (error) {
    next(error);
  }
}

async function handleTicketHistory(req, res, next) {
  // no request body
  try {
    const tickets = await ticketService.getTickets(req.user.id);
    res.status(200).json({ data: tickets });
  } catch (error) {
    console.log(error);
    next(error);
  }
}

async function handleGetTickets(req, res, next) {
  try {
    const tickets = await ticketService.getTickets();
    res.status(200).json({ data: tickets });
  } catch (error) {
    console.log(error);
    next(error);
  }
}
module.exports = { handleCreateTicket, handleTicketHistory, handleGetTickets };
