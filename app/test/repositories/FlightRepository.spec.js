describe("flightsRepository", () => {
  beforeEach(() => {
    jest.resetModules();
  });
  function createFlightModel() {
    const flights = require("../helper/flightsDataExample");
    const flight = flights[0];
    flight.from = flight.from_airport.id;
    flight.to = flight.to_airport.id;
    flight.airplane = flight.airplane.id;
    return flight;
  }
  const airportRequiredAttributes = [
    "id",
    "iata",
    "name",
    "address",
    "country_code",
  ];

  describe("findFlights", () => {
    it("should return flights data", async () => {
      const flights = require("../helper/flightsDataExample");

      const mockFlightModel = {
        findAll: jest.fn().mockReturnValue(flights),
      };

      jest.mock("../../models", () => {
        return { Flight: mockFlightModel, Airport: {}, Airplane: {} };
      });
      const { Airport, Airplane } = require("../../models");
      const flightsRepository = require("../../repositories/flightsRepository");
      const { Op } = require("sequelize");
      const searchParams = {
        departureDate: new Date(),
        from: 1,
        to: 2,
        flightClass: "economy",
      };
      const result = await flightsRepository.findFlights(
        searchParams.departureDate,
        searchParams.from,
        searchParams.to,
        searchParams.flightClass
      );

      expect(mockFlightModel.findAll).toHaveBeenCalledWith({
        attributes: {
          exclude: ["from", "to", "airplane_id"],
        },
        where: {
          departure: {
            [Op.gte]: searchParams.departureDate,
          },
          from: searchParams.from,
          to: searchParams.to,
          flight_class: searchParams.flightClass,
        },
        include: [
          {
            model: Airport,
            as: "from_airport",
            attributes: airportRequiredAttributes,
          },
          {
            model: Airport,
            as: "to_airport",
            attributes: airportRequiredAttributes,
          },
          { model: Airplane, as: "airplane" },
        ],
      });
      expect(result).toBe(flights);
    });
  });

  describe("findReturnFlights", () => {
    it("should return flights data", async () => {
      const flights = require("../helper/flightsDataExample");

      const mockFlightModel = {
        findAll: jest.fn().mockReturnValue(flights),
      };

      jest.mock("../../models", () => {
        return { Flight: mockFlightModel, Airport: {}, Airplane: {} };
      });
      const { Airport, Airplane } = require("../../models");
      const flightsRepository = require("../../repositories/flightsRepository");
      const { Op } = require("sequelize");
      const searchParams = {
        returnFlightDate: new Date(),
        arrivalDate: new Date(),
        from: 1,
        to: 2,
        flightClass: "economy",
      };
      const result = await flightsRepository.findReturnFlights(
        searchParams.returnFlightDate,
        searchParams.arrivalDate,
        searchParams.from,
        searchParams.to,
        searchParams.flightClass
      );

      expect(mockFlightModel.findAll).toHaveBeenCalledWith({
        attributes: {
          exclude: ["from", "to", "airplane_id"],
        },
        where: {
          departure: {
            [Op.gte]: searchParams.returnFlightDate,
            [Op.gt]: searchParams.arrivalDate,
          },
          from: searchParams.to,
          to: searchParams.from,
          flight_class: searchParams.flightClass,
        },
        include: [
          {
            model: Airport,
            as: "from_airport",
            attributes: airportRequiredAttributes,
          },
          {
            model: Airport,
            as: "to_airport",
            attributes: airportRequiredAttributes,
          },
          { model: Airplane, as: "airplane" },
        ],
      });
      expect(result).toBe(flights);
    });
  });

  describe("list", () => {
    it("should return list of flights", async () => {
      const flights = require("../helper/flightsDataExample");

      const mockFlightModel = {
        findAll: jest.fn().mockReturnValue(flights),
      };

      jest.mock("../../models", () => {
        return { Flight: mockFlightModel, Airport: {}, Airplane: {} };
      });
      const { Airport, Airplane } = require("../../models");
      const flightsRepository = require("../../repositories/flightsRepository");

      const result = await flightsRepository.list();

      expect(mockFlightModel.findAll).toHaveBeenCalledWith({
        attributes: {
          exclude: ["from", "to", "airplane_id"],
        },
        order: [["createdAt", "DESC"]],
        include: [
          {
            model: Airport,
            as: "from_airport",
            attributes: airportRequiredAttributes,
          },
          {
            model: Airport,
            as: "to_airport",
            attributes: airportRequiredAttributes,
          },
          { model: Airplane, as: "airplane" },
        ],
      });
      expect(result).toBe(flights);
    });
  });

  describe("createFlight", () => {
    it("should return created flight data", async () => {
      const flightToBeCreated = createFlightModel();

      const mockFlightModel = {
        create: jest.fn().mockReturnValue(flightToBeCreated),
      };

      jest.mock("../../models", () => {
        return { Flight: mockFlightModel, Airport: {}, Airplane: {} };
      });

      const flightsRepository = require("../../repositories/flightsRepository");

      const result = await flightsRepository.createFlight(flightToBeCreated);

      expect(mockFlightModel.create).toHaveBeenCalledWith(flightToBeCreated);
      expect(result).toBe(flightToBeCreated);
    });
  });

  describe("updateFlight", () => {
    it("should return updated flight data", async () => {
      const updateArgs = createFlightModel();
      const updateReturnValue = [1, [updateArgs]];
      const flightId = 1;
      const mockFlightModel = {
        update: jest.fn().mockReturnValue(updateReturnValue),
      };

      jest.mock("../../models", () => {
        return { Flight: mockFlightModel, Airport: {}, Airplane: {} };
      });
      const { Airport, Airplane } = require("../../models");
      const flightsRepository = require("../../repositories/flightsRepository");

      const result = await flightsRepository.updateFlight(flightId, updateArgs);

      expect(mockFlightModel.update).toHaveBeenCalledWith(updateArgs, {
        where: { id: flightId },
        returning: true,
        include: [
          {
            model: Airport,
            as: "from_airport",
            attributes: airportRequiredAttributes,
          },
          {
            model: Airport,
            as: "to_airport",
            attributes: airportRequiredAttributes,
          },
          { model: Airplane, as: "airplane" },
        ],
      });

      expect(result).toBe(updateReturnValue[1]);
    });
  });

  describe("getFlightById", () => {
    it("should return flight data by id", async () => {
      const flight = require("../helper/flightsDataExample")[0];
      const id = 1;

      const mockFlightModel = {
        findByPk: jest.fn().mockReturnValue(flight),
      };

      jest.mock("../../models", () => {
        return { Flight: mockFlightModel, Airport: {}, Airplane: {} };
      });
      const { Airport, Airplane } = require("../../models");
      const flightsRepository = require("../../repositories/flightsRepository");

      const result = await flightsRepository.getFlightById(id);

      expect(mockFlightModel.findByPk).toHaveBeenCalledWith(id, {
        attributes: {
          exclude: ["from", "to", "airplane_id"],
        },
        include: [
          {
            model: Airport,
            as: "from_airport",
            attributes: airportRequiredAttributes,
          },
          {
            model: Airport,
            as: "to_airport",
            attributes: airportRequiredAttributes,
          },
          { model: Airplane, as: "airplane" },
        ],
      });
      expect(result).toBe(flight);
    });
  });

  describe("deleteFlight", () => {
    it("should return number of destroyed rows", async () => {
      const id = 1;
      const destroyedRows = 1;
      const mockFlightModel = {
        destroy: jest.fn().mockReturnValue(destroyedRows),
      };

      jest.mock("../../models", () => {
        return { Flight: mockFlightModel, Airport: {}, Airplane: {} };
      });
      const flightsRepository = require("../../repositories/flightsRepository");

      const result = await flightsRepository.deleteFlight(id);

      expect(mockFlightModel.destroy).toHaveBeenCalledWith({ where: { id } });
      expect(result).toBe(destroyedRows);
    });
  });
});
