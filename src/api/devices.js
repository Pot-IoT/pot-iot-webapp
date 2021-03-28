export const removeDeviceRequest = (imei, pin_code, userToken) => {
  return fetch("//115.29.191.198:8080/removeDevice?token=" + userToken, {
    method: "POST",
    body: JSON.stringify({ imei, pin_code }),
  });
};
