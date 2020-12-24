export const getDeviceListRequest = (userToken) => {
  return fetch("//115.29.191.198:8080/deviceList?token=" + userToken, {
    method: "GET",
  });
};
