export const getDeviceListRequest = (userToken) => {
  return fetch("//115.29.191.198:8080/deviceList?token=" + userToken, {
    method: "GET",
  });
};
export const addNewDeviceRequest = (deviceDetails, userToken) => {
  return fetch("//115.29.191.198:8080/addDevice?token=" + userToken, {
    method: "POST",
    body: JSON.stringify(deviceDetails),
  });
};

export const getCommandLogRequest = (userToken, imei, logTime) => {
  return fetch(
    `//115.29.191.198:8080/commandLog?token=${userToken}&imei=${imei}&log_time=${logTime}`,
    {
      method: "GET",
    }
  );
};
