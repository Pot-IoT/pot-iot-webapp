import React from "react";
import {
  SignalCellularOff,
  SignalCellular1Bar,
  SignalCellular2Bar,
  SignalCellular3Bar,
  SignalCellular4Bar,
  BatteryUnknown,
  BatteryFull,
  Battery90,
  Battery80,
  Battery60,
  Battery50,
  Battery30,
  Battery20,
  BatteryAlert,
  Power,
  CheckCircleRounded,
  HighlightOffRounded,
} from "@material-ui/icons";

export const showSignalStrength = (signalStrength) => {
  switch (signalStrength) {
    case 4:
      return <SignalCellular4Bar />;
    case 3:
      return <SignalCellular3Bar />;
    case 2:
      return <SignalCellular2Bar />;
    case 1:
      return <SignalCellular1Bar />;
    default:
      return <SignalCellularOff />;
  }
};

export const showBatteryRemaining = (battery) => {
  if (battery == -1) {
    return <Power />;
  }
  switch (Math.floor(battery / 10)) {
    case 10:
    case 9:
      return <BatteryFull />;
    case 8:
      return <Battery90 />;
    case 7:
      return <Battery80 />;
    case 6:
    case 5:
      return <Battery60 />;
    case 4:
      return <Battery50 />;
    case 3:
    case 2:
      return <Battery30 />;
    case 1:
      return <Battery20 />;
    case 0:
      return <BatteryAlert />;
    default:
      return <BatteryUnknown />;
  }
};

export const showDeviceStatus = (status) => {
  if (status > 0) {
    return <CheckCircleRounded style={{ color: "green" }} />;
  } else {
    return <HighlightOffRounded style={{ color: "red" }} />;
  }
};
