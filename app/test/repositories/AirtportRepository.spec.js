const airports = [
  {
    id: 7242,
    iata: "TBJ",
    icao: "DTKA",
    name: "Tabarka–Aïn Draham International Airport",
    location: "Tabarka, Tunisia",
    website: "http://www.oaca.nat.tn/",
  },
  {
    id: 4079,
    iata: "LCG",
    icao: "LECO",
    name: "A Coruña Airport",
    location: "A Coruña, Galicia, Spain",
    website: "http://www.aena.es/es/aeropuerto-a-coruna/index.html",
  },
];
describe("AirportRepository", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  describe("getAirports", () => {
    it("should return all airports", async () => {
      const mockAirportModel = {
        findAll: jest.fn().mockReturnValue(airports),
      };

      jest.mock("../../models", () => {
        return { Airport: mockAirportModel };
      });
      const airportRepository = require("../../repositories/airportsRepository");

      const result = await airportRepository.getAirports();

      expect(mockAirportModel.findAll).toHaveBeenCalled();
      expect(result).toBe(airports);
    });
  });
});
