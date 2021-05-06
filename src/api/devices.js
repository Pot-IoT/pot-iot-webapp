export const removeDeviceRequest = (imei, pin_code, userToken) => {
  return fetch("http://api.pot-iot.com:8080/removeDevice?token=" + userToken, {
    method: "POST",
    body: JSON.stringify({ imei, pin_code }),
  });
};

export const modifyDeviceName = ({ imei, name, userToken }) => {
  return fetch(
    "http://api.pot-iot.com:8080/changeDeviceName?token=" + userToken,
    {
      method: "POST",
      body: JSON.stringify({ imei, name }),
    }
  );
};

export const modifyDeviceDescription = ({ imei, description, userToken }) => {
  return fetch(
    "http://api.pot-iot.com:8080/changeDeviceDescription?token=" + userToken,
    {
      method: "POST",
      body: JSON.stringify({ imei, description }),
    }
  );
};

export const newDeviceCommand = ({ imei, command, userToken }) => {
  return fetch(
    "http://api.pot-iot.com:8080/addDeviceCommand?token=" + userToken,
    {
      method: "POST",
      body: JSON.stringify({ imei, command }),
    }
  );
};

export const getFileDownloadLinkRequest = ({ curID, userToken }) =>
  fetch(
    `https://w0zawosezd.execute-api.eu-west-2.amazonaws.com/prod/fileList/${curID}`,
    { method: "GET", headers: { Authorization: userToken } }
  );
