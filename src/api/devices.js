export const removeDeviceRequest = (imei, pin_code, userToken) => {
  return fetch("//115.29.191.198:8080/removeDevice?token=" + userToken, {
    method: "POST",
    body: JSON.stringify({ imei, pin_code }),
  });
};

export const modifyDeviceName = ({ imei, name, userToken }) => {
  return fetch("//115.29.191.198:8080/changeDeviceName?token=" + userToken, {
    method: "POST",
    body: JSON.stringify({ imei, name }),
  });
};

export const modifyDeviceDescription = ({ imei, description, userToken }) => {
  return fetch(
    "//115.29.191.198:8080/changeDeviceDescription?token=" + userToken,
    {
      method: "POST",
      body: JSON.stringify({ imei, description }),
    }
  );
};

export const newDeviceCommand = ({ imei, command, userToken }) => {
  return fetch("//115.29.191.198:8080/addDeviceCommand?token=" + userToken, {
    method: "POST",
    body: JSON.stringify({ imei, command }),
  });
};

export const getFileDownloadLinkRequest = (imei) =>
  fetch(
    "https://w0zawosezd.execute-api.eu-west-2.amazonaws.com/prod/fileList/64e2d105-4913-4b82-q214-0e5fe8qcd5fe",
    { method: "GET" }
  );
