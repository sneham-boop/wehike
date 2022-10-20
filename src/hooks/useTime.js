import { useEffect, useState } from "react";

export default function useTime() {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const date = new Date();
    let hr = date.getHours();
    let min = date.getMinutes();
    let amOrPm = hr >= 12 ? "pm" : "am";
    hr = hr % 12;
    hr = hr ? hr : 12;
    min = min < 10 ? "0" + min : min;
    setCurrentTime(`${hr} + ":" + ${min} + " " + ${amOrPm}`);
  }, []);

  return {
    currentTime,
  };
}
