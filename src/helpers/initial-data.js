export const initCatState = {
  categories: ["restaurants", "supermarkets", "escape rooms"]
};

export const initLocState = {
  locations: [
    {
      name: "Upland",
      address: "345 Park Ave S, New York, NY 10010, USA",
      coordinates: {
        latitude: "40.7415505",
        longitude: "-73.9851675"
      },
      category: "restaurants"
    },
    {
      name: "CEBO Madrid Restaurant",
      address: "Carrera de S. Jerónimo, 34, 28014 Madrid, Spain",
      coordinates: {
        latitude: "40.41636",
        longitude: "-3.69863"
      },
      category: "restaurants"
    },
    {
      name: "Escape the Room NYC",
      address: "24 W 25th St floor 8, New York, NY 10010, USA",
      coordinates: {
        latitude: "40.743293",
        longitude: "-73.99040959999999"
      },
      category: "escape rooms"
    },
    {
      name: "Escape Room Manchester",
      address: "1-7 Chapel St, Manchester M3 7NJ, UK",
      coordinates: {
        latitude: "53.4857252",
        longitude: "-2.2458747"
      },
      category: "escape rooms"
    },
    {
      name: "Carrefour Market",
      address: "79 Rue de Seine, 75006 Paris, France",
      coordinates: {
        latitude: "48.8535748",
        longitude: "2.337083"
      },
      category: "supermarkets"
    }
  ]
};
