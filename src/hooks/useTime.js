import { useEffect, useState } from "react";

export default function useTime() {
  const [currentTime, setCurrentTime] = useState("");

  const getCurrentTime = () => {
    const date = new Date();
    let hr = date.getHours();
    let min = date.getMinutes();
    // let amOrPm = hr >= 12 ? "pm" : "am";
    // hr = hr % 12;
    // hr = hr ? hr : 12;
    hr = hr < 10 ? "0" + hr : hr;
    min = min < 10 ? "0" + min : min;
    setCurrentTime(`${hr}:${min}`);
  };

  useEffect(()=>{
    getCurrentTime();
  },[])

  return {
    currentTime,
  };
}
