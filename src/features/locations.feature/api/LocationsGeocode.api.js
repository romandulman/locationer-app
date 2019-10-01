import Geocode from "react-geocode";

Geocode.setApiKey("AIzaSyDmUG0WjafiyBPJO6zSJ0tr6bLbAfATU7U");
Geocode.setLanguage("en");
Geocode.setRegion("es");
Geocode.enableDebug();

export const getCoords = address => {
  return new Promise((resolve, reject) => {
    Geocode.fromAddress(address).then(
      response => {
        const { lat, lng } = response.results[0].geometry.location;
        const data = { lat, lng };
        resolve(data);
      },
      error => {
        console.error(error);
        reject(error);
      }
    );
  });
};
