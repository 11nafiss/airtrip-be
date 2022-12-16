const {
  Flight_Detail,
  Ticket,
  User,
  BoardingPass,
  Flight,
} = require("../models");

async function createTicket(
  user,
  totalPrice,
  invoice,
  flightType,
  flight1,
  seat1,
  flight2,
  seat2
) {
  try {
    async function createBoardingPass(user, flight, seat) {
      return await BoardingPass.create(
        {
          flight_id: flight.id,
          passenger_id: user.id,
          seat: seat,
          has_checked_in: true,
          has_boarded: true,
        },
        {
          returning: true,
        }
      );
    }

    const flightDetailsArgs = {};
    const boardingPassPergi = await createBoardingPass(user, flight1, seat1);
    flightDetailsArgs.boarding_pass_pergi = boardingPassPergi.id;

    // create second boarding pass on round trip flight
    if (flight2) {
      const boardingPassPulang = await createBoardingPass(user, flight2, seat2);
      flightDetailsArgs.boarding_pass_pulang = boardingPassPulang.id;
    }

    const flightDetail = await Flight_Detail.create(flightDetailsArgs, {
      returning: true,
    });

    const ticket = await Ticket.create(
      {
        total_price: totalPrice,
        invoice_number: invoice,
        flight_type: flightType,
        passenger_id: user.id,
        flight_details: flightDetail.id,
      },
      { returning: true }
    );

    const result = {
      username: user.name,
      invoiceNumber: ticket.invoice_number,
      boardingPasses: [{ flight: flight1, seat: seat1 }],
      flightType: ticket.flight_type,
      totalPrice: ticket.total_price,
    };

    if (flight2) {
      result.boardingPasses.push({
        flight: flight2,
        seat: seat2,
      });
    }

    // kurangi saldo
    await User.decrement("saldo", {
      by: totalPrice,
      where: {
        id: user.id,
      },
    });

    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

module.exports = {
  createTicket,
};
