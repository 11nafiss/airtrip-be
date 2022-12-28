describe("TicketRepository", () => {
  describe("createTicket", () => {
    const totalPrice = 1000000;
    const invoice = "QWERT26122022";
    const flight1 = 2;
    const seat1 = "37B";
    const user = {
      id: 1,
    };
    const testCases = [
      // oneway
      ["oneway"],
      // roundtrip
      ["roundtrip", 1, "36B"], // [flightId, seat]
    ];
    test.each(testCases)(
      "should return created flight",
      async (flightType, flight2, seat2) => {
        const boardingPassData1Id = 1;
        const boardingPassData1 = {
          flight_id: flight1,
          passenger_id: user.id,
          seat: seat1,
          has_checked_in: true,
          has_boarded: true,
        };
        const flightDetailId = 1;
        const flightDetailData = {
          boarding_pass_pergi: boardingPassData1Id,
        };
        if (flight2 && seat2) {
          const boardingPassData2Id = 2;
          const boardingPassData2 = {
            flight_id: flight2,
            passenger_id: user.id,
            seat: seat2,
            has_checked_in: true,
            has_boarded: true,
          };
          flightDetailData.boarding_pass_pulang = boardingPassData2Id;
        }

        const ticketData = {
          total_price: totalPrice,
          invoice_number: invoice,
          flight_type: flightType,
          passenger_id: user.id,
          flight_details: flightDetailData.id,
          has_read: false,
        };
        const mockBoardingPass = {
          create: jest.fn(async (args, opt) => {
            return args;
          }),
        };

        const mockFlightDetail = {
          create: jest.fn().mockReturnValue(Promise.resolve(flightDetailData)),
        };

        const mockTicket = {
          create: jest.fn().mockReturnValue(Promise.resolve(ticketData)),
        };

        const mockUser = {
          decrement: jest.fn().mockReturnValue(Promise.resolve(true)),
        };

        jest.mock("../../models", () => {
          return {
            BoardingPass: mockBoardingPass,
            FlightDetail: mockFlightDetail,
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

        expect(mockBoardingPass.create).toHaveBeenCalledWith(boardingPassData1);
        if (flight2) {
          expect(mockBoardingPass.create).toHaveBeenCalledWith(
            boardingPassData2
          );
        }
        expect(mockFlightDetail.create).toHaveBeenCalledWith(flightDetailData);
        expect(mockTicket.create).toHaveBeenCalledWith(ticketData);
        expect(mockUser.decrement).toHaveBeenCalledWith(totalPrice);
      }
    );
  });
});
