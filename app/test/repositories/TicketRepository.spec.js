describe("TicketRepository", () => {
  beforeEach(() => {
    jest.resetModules();
  });
  describe("createTicket", () => {
    const totalPrice = 1000000;
    const invoice = "QWERT26122022";
    const flight1 = { id: 2 };
    const seat1 = "37B";
    const user = {
      id: 1,
      name: "user",
    };
    const testCases = [
      // oneway
      ["oneway", null, null],
      // roundtrip
      ["roundtrip", { id: 1 }, "36B"], // [flightId, seat]
    ];

    test.each(testCases)(
      "should return created flight",
      async (flightType, flight2, seat2) => {
        const boardingPassData1Id = 1;
        const boardingPassData1 = {
          flight_id: flight1.id,
          passenger_id: user.id,
          seat: seat1,
          has_checked_in: true,
          has_boarded: true,
        };
        const flightDetailId = 1;
        const flightDetailData = {
          boarding_pass_pergi: boardingPassData1Id,
        };
        let boardingPassData2Id;
        let boardingPassData2;
        if (flight2) {
          boardingPassData2Id = 2;
          boardingPassData2 = {
            flight_id: flight2.id,
            passenger_id: user.id,
            seat: seat2,
            has_checked_in: true,
            has_boarded: true,
          };
          flightDetailData.boarding_pass_pulang = boardingPassData2Id;
        }
        const ticketId = 1;
        const ticketData = {
          total_price: totalPrice,
          invoice_number: invoice,
          flight_type: flightType,
          passenger_id: user.id,
          flight_details: flightDetailId,
          has_read: false,
        };
        const resultData = {
          id: ticketId,
          username: user.name,
          invoiceNumber: ticketData.invoice_number,
          boardingPasses: {
            boarding_pass_pergi: { flight: flight1, seat: seat1 },
          },
          flightType: ticketData.flight_type,
          totalPrice: ticketData.total_price,
        };
        if (flight2) {
          resultData.boardingPasses.boarding_pass_pulang = {
            flight: flight2,
            seat: seat2,
          };
        }
        const mockBoardingPass = {
          create: jest.fn(async (args) => {
            if (args.flight_id === flight2?.id) {
              return { ...args, id: boardingPassData2Id };
            }
            return { ...args, id: boardingPassData1Id };
          }),
        };
        const mockFlightDetail = {
          create: jest
            .fn()
            .mockReturnValue(
              Promise.resolve({ ...flightDetailData, id: flightDetailId })
            ),
        };
        const mockTicket = {
          create: jest
            .fn()
            .mockReturnValue(Promise.resolve({ id: ticketId, ...ticketData })),
        };
        const mockUser = {
          decrement: jest.fn().mockReturnValue(Promise.resolve(true)),
        };
        jest.mock("../../models", () => {
          return {
            BoardingPass: mockBoardingPass,
            Flight_Detail: mockFlightDetail,
            Ticket: mockTicket,
            User: mockUser,
          };
        });
        const ticketRepository = require("../../repositories/ticketRepository");
        const result = await ticketRepository.createTicket(
          user,
          totalPrice,
          invoice,
          flightType,
          flight1,
          seat1,
          flight2,
          seat2
        );
        expect(mockBoardingPass.create).toHaveBeenCalledWith(
          boardingPassData1,
          { returning: true }
        );
        if (flight2) {
          expect(mockBoardingPass.create).toHaveBeenCalledWith(
            boardingPassData2,
            { returning: true }
          );
        }
        expect(mockFlightDetail.create).toHaveBeenCalledWith(flightDetailData, {
          returning: true,
        });
        expect(mockTicket.create).toHaveBeenCalledWith(ticketData, {
          returning: true,
        });
        expect(mockUser.decrement).toHaveBeenCalledWith("saldo", {
          by: totalPrice,
          where: {
            id: user.id,
          },
        });
        expect(result).toEqual(resultData);
      }
    );
  });

  describe("getTickets", () => {
    const userId = 1;
    const boardingPassData = {
      flight_id: 1,
      passenger_id: 1,
      seat: "34D",
      has_checked_in: true,
      has_boarded: true,
    };
    const ticketData = {
      total_price: 200000,
      invoice_number: "invoicestring",
      flight_type: "roundtrip",
      passenger: {
        name: "user",
        phone: "08123456789",
        address: "jl.jalan",
        email: "sfdhjsfdhsfdsh",
      },

      flight_detail: {
        boarding_pass_pergi: 1,
        boarding_pass_pulang: 2,
      },
      has_read: false,
    };
    function ticketObjDeepCopy() {
      return JSON.parse(JSON.stringify(ticketData));
    }
    const ticketDatas = [ticketObjDeepCopy(), ticketObjDeepCopy()];

    const testCases = [
      // no user id (get all) and empty result
      [null, []],
      // get by userid with result
      [userId, ticketDatas],
    ];

    test.each(testCases)(
      "should return ticket(s) data",
      async (userId, tickets) => {
        const mockTicket = {
          findAll: jest.fn().mockReturnValue(Promise.resolve(tickets.slice())),
        };
        const mockBoardingPass = {
          findOne: jest.fn().mockReturnValue(Promise.resolve(boardingPassData)),
        };
        const mockUser = {};
        const mockFlightDetail = {};
        const mockFlight = {};
        const mockAirplane = {};

        const ticketQueryOption = {
          attributes: { exclude: ["flight_details", "passenger_id"] },
          include: [
            {
              model: mockUser,
              as: "passenger",
              attributes: ["name", "phone", "address", "email"],
            },
            { model: mockFlightDetail, as: "flight_detail" },
          ],
          order: [["createdAt", "DESC"]],
          raw: true,
          nest: true,
        };
        if (userId) {
          ticketQueryOption.where = {
            passenger_id: userId,
          };
        }

        jest.mock("../../models", () => {
          return {
            BoardingPass: mockBoardingPass,
            Ticket: mockTicket,
            User: mockUser,
            Flight_Detail: mockFlightDetail,
            Flight: mockFlight,
            Airplane: mockAirplane,
          };
        });
        const ticketRepository = require("../../repositories/ticketRepository");
        const result = await ticketRepository.getTickets(userId);

        expect(mockTicket.findAll).toHaveBeenCalledWith(ticketQueryOption);
        if (tickets.length === 0) {
          return expect(result).toEqual([]);
        }

        // ticket result expect data
        const ticketsCopy = [ticketObjDeepCopy(), ticketObjDeepCopy()];
        for (let index = 0; index < ticketsCopy.length; index++) {
          let ticket = ticketsCopy[index];

          const boardingPassesId = [
            ticket.flight_detail.boarding_pass_pergi,
            ticket.flight_detail.boarding_pass_pulang,
          ];

          let boardingPasses = [];

          for (let boardingPassId of boardingPassesId) {
            expect(mockBoardingPass.findOne).toHaveBeenCalledWith({
              where: { id: boardingPassId },
              attributes: ["seat"],
              include: {
                model: mockFlight,
                as: "flight",
                include: { model: mockAirplane, as: "airplane" },
                attributes: { exclude: ["airplane_id"] },
              },
            });

            boardingPasses.push(boardingPassData);
          }

          boardingPasses = {
            boarding_pass_pergi: boardingPasses[0],
            boarding_pass_pulang: boardingPasses[1],
          };

          ticket.boardingPasses = boardingPasses;

          tickets[index] = ticket;
          delete tickets[index].flight_detail;
        }
        expect(result).toEqual(tickets);
      }
    );
  });
});
