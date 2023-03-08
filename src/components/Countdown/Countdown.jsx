import { useEffect, useState } from "react";
import "./Countdown.css";

function Countdown({ timer, style }) {
  const [count, setCount] = useState(timer);

  useEffect(() => {
    setCount(() => timer);
    const id = setInterval(() => {
      setCount((pre) => (pre > 1 ? pre - 1 : timer));
    }, 1000);

    return () => {
      clearInterval(id);
    };
  }, [timer]);

  return (
    <>
      <div className="countdown" style={style}>{count ? `${count}`.padStart(2, "0") : "00"}</div>
    </>
  );
}

export default Countdown;