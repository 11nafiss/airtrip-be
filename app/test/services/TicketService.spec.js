describe("TicketService", () => {
  beforeEach(() => {
    jest.resetModules();
  });
  const flights = require("../helper/flightsDataExample");
  const flight1 = flights[0];
  const flight2 = flights[1];
  const createArgs = {
    flightId: flight1.id,
    flightId2: null,
    flightType: "Oneway",
  };
  const ticketData = {
    id: 1,
    invoice: "invoice",
    total_price: 312432432,
  };
  const user = {};
  const testCases = [
    // case flight1 not found
    [null, flight2, createArgs],
    // case with flight 2, but flight 2 not found
    [flight1, null, { ...createArgs, flightId2: flight2.id }],
    [flight1, null, createArgs],
    [flight1, flight2, { ...createArgs, flightId2: flight2.id }],
  ];
  describe("createTicket", () => {
    test.each(testCases)(
      "should return data",
      async (flightData1, flightData2, createArgs) => {
        const mockFlightRepo = {
          getFlightById: jest.fn(async (id) => {
            switch (id) {
              case 1:
                return flightData1;
              case 2:
                return flightData2;
            }
          }),
        };
        const mockTicketRepo = {
          createTicket: jest.fn().mockReturnValue(Promise.resolve(ticketData)),
        };

        jest.mock("../../repositories/flightsRepository", () => {
          return mockFlightRepo;
        });
        jest.mock("../../repositories/ticketRepository", () => {
          return mockTicketRepo;
        });

        const { RecordNotFoundError } = require("../../errors");
        const ticketService = require("../../services/ticketService");

        const result = await ticketService.createTicket(user, createArgs);

        expect(mockFlightRepo.getFlightById).toHaveBeenCalledWith(
          createArgs.flightId
        );
        if (!flightData1) {
          return expect(result).toEqual(
            new RecordNotFoundError(`flight id ${createArgs.flightId}`)
          );
        }

        let totalPrice = flightData1.price;
        let flight2IdSeat = [null, null];

        if (createArgs.flightId2) {
          flight2IdSeat = [flightData2, expect.any(String)];
          expect(mockFlightRepo.getFlightById).toHaveBeenCalledWith(
            createArgs.flightId2
          );
          if (!flightData2) {
            return expect(result).toEqual(
              new RecordNotFoundError(`flight id ${createArgs.flightId2}`)
            );
          }
          totalPrice += flightData2.price;
        }

        // user, totalPrice, invoiceNum, flightType, flight, seat1, flight2, seat2
        expect(mockTicketRepo.createTicket).toHaveBeenCalledWith(
          user,
          totalPrice,
          expect.any(String),
          createArgs.flightType,
          flightData1,
          expect.any(String),
          ...flight2IdSeat
        );
        expect(result).toEqual(ticketData);
      }
    );
  });

  describe("getTickets", () => {
    it("should return tickets data", async () => {
      const mockTicketRepo = {
        getTickets: jest.fn().mockReturnValue(Promise.resolve(ticketData)),
      };
      const userid = 1;

      jest.mock("../../repositories/ticketRepository", () => {
        return mockTicketRepo;
      });
      const ticketService = require("../../services/ticketService");

      const result = await ticketService.getTickets(userid);

      expect(mockTicketRepo.getTickets).toHaveBeenCalledWith(userid);
      expect(result).toEqual(ticketData);
    });
  });
});
