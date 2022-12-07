const flights = [
  {
    id: 1,
    departure_date: new Date(),
    from: {
      id: 1,
      iata: "TBJ",
      name: "Tabarka–Aïn Draham International Airport",
      location: "Tabarka, Tunisia",
    },
    to: {
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
    departure_date: new Date(),
    from: {
      id: 1,
      iata: "TBJ",
      name: "Tabarka–Aïn Draham International Airport",
      location: "Tabarka, Tunisia",
    },
    to: {
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
