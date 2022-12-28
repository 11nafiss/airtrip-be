const tickets = [
  {
    total_price: 200000,
    invoice: "invoice",
    flight_type: "oneway",
    flight_details: 1,
    passenger_id: 1,
  },
  {
    total_price: 200000,
    invoice: "invoice",
    flight_type: "oneway",
    flight_details: 2,
    passenger_id: 1,
  },
];
const mockResponse = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn().mockReturnThis(),
};
const mockNext = jest.fn().mockReturnThis();
const user = {
  name: "user",
};

describe("TicketController", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  describe("handleCreateTicket", () => {
    const ticket = tickets[0];
    const testCases = [
      // case error
      new Error("data not found"),
      ticket,
    ];
    test.each(testCases)(
      "should call res.status and res.json",
      async (serviceReturnValue) => {
        const { RecordNotFoundError } = require("../../errors");
        if (serviceReturnValue instanceof Error) {
          serviceReturnValue = new RecordNotFoundError(
            serviceReturnValue.message
          );
        }

        const mockTicketService = {
          createTicket: jest
            .fn()
            .mockReturnValue(Promise.resolve(serviceReturnValue)),
        };
        const mockRequest = {
          body: ticket,
          user: user,
        };

        jest.mock("../../services/ticketService", () => mockTicketService);

        const controllers = require("../../controllers");

        await controllers.api.v1.ticketController.handleCreateTicket(
          mockRequest,
          mockResponse,
          mockNext
        );

        if (serviceReturnValue instanceof RecordNotFoundError) {
          expect(mockResponse.status).toHaveBeenCalledWith(404);
          expect(mockResponse.json).toHaveBeenCalledWith({
            message: serviceReturnValue.message,
          });
          return;
        }

        expect(mockResponse.status).toHaveBeenCalledWith(201);
        expect(mockResponse.json).toHaveBeenCalledWith({
          data: serviceReturnValue,
        });
      }
    );
  });

  describe("handleTicketHistory", () => {
    it("should call res.status(200) and res.json with tickets data", async () => {
      const mockTicketService = {
        getTickets: jest.fn().mockReturnValue(Promise.resolve(tickets)),
      };
      const mockRequest = {
        user: { id: 1 },
      };

      jest.mock("../../services/ticketService", () => mockTicketService);

      const controllers = require("../../controllers");

      await controllers.api.v1.ticketController.handleTicketHistory(
        mockRequest,
        mockResponse,
        mockNext
      );

      expect(mockTicketService.getTickets).toHaveBeenCalledWith(
        mockRequest.user.id
      );
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({ data: tickets });
    });
  });

  describe("handleGetTickets", () => {
    it("should call res.status(200) and res.json with all tickets data", async () => {
      const mockTicketService = {
        getTickets: jest.fn().mockReturnValue(Promise.resolve(tickets)),
      };

      jest.mock("../../services/ticketService", () => mockTicketService);

      const controllers = require("../../controllers");

      await controllers.api.v1.ticketController.handleGetTickets(
        {},
        mockResponse,
        mockNext
      );
      expect(mockTicketService.getTickets).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({ data: tickets });
    });
  });
});
