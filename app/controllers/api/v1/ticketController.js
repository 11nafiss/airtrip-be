const { RecordNotFoundError } = require("../../../errors");
const ticketService = require("../../../services/ticketService");

async function handleCreateTicket(req, res, next) {
  // req.body = {flightId, flightId2, flightType}
  try {
    const result = await ticketService.createTicket(req.user, req.body);
    if (result instanceof RecordNotFoundError) {
      return res.status(404).json({ message: result.message });
    }
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    req.error;
    next();
  }
}

module.exports = { handleCreateTicket };
