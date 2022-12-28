const flights = [
  {
    id: 1,
    departure: new Date(),
    arrival: new Date(),
    price: 200000,
    from_airport: {
      id: 1,
      iata: "TBJ",
      name: "Tabarka–Aïn Draham International Airport",
      location: "Tabarka, Tunisia",
    },
    to_airport: {
      id: 2,
      iata: "CGK",
      name: "Soekarno–Hatta International Airport",
      location: "Jakarta, Indonesia",
    },
    description: "lorem ipsum",

    airplane: {
      id: 2,
      model_number: "boring 646",
    },
  },
  {
    id: 2,
    departure: new Date(),
    arrival: new Date(),
    price: 200000,
    from_airport: {
      id: 1,
      iata: "TBJ",
      name: "Tabarka–Aïn Draham International Airport",
      location: "Tabarka, Tunisia",
    },
    to_airport: {
      id: 2,
      iata: "CGK",
      name: "Soekarno–Hatta International Airport",
      location: "Jakarta, Indonesia",
    },
    description: "lorem ipsum",

    airplane: {
      id: 2,
      model_number: "boring 737",
    },
  },
];
module.exports = flights;
