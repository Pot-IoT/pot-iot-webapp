export const removeDeviceRequest = ({ imei, userToken }) => {
  return fetch("//115.29.191.198:8080/removeDevice?token=" + userToken, {
    method: "POST",
    body: JSON.stringify({ imei }),
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

export const getFileDownloadLinkRequest = ({ curID, userToken }) =>
  fetch(
    `https://w0zawosezd.execute-api.eu-west-2.amazonaws.com/prod/fileList/${curID}`,
    { method: "GET", headers: { Authorization: userToken } }
  );

export const deleteFileRequest = ({ curID, fileName, userToken }) =>
  fetch(
    `https://w0zawosezd.execute-api.eu-west-2.amazonaws.com/prod/fileList/${curID}/${fileName}`,
    { method: "DELETE", headers: { Authorization: userToken } }
  );
