import { useEffect, useState } from "react";

export default function useTime() {
  const [currentTime, setCurrentTime] = useState("");

  const getCurrentTime = () => {
    const date = new Date();
    let hr = date.getHours();
    let min = date.getMinutes();
    hr = hr < 10 ? "0" + hr : hr;
    min = min < 10 ? "0" + min : min;
    setCurrentTime(`${hr}:${min}`);
  };

  const formatTime = (date) => {
      let hours = date.getHours();
      let minutes = date.getMinutes();
      let ampm = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12;
      hours = hours ? hours : 12; 
      minutes = minutes < 10 ? '0'+minutes : minutes;
      let strTime = hours + ':' + minutes + ' ' + ampm;
      return strTime;
  };

  useEffect(()=>{
    getCurrentTime();
  },[])

  return {
    currentTime,
    formatTime
  };
}
