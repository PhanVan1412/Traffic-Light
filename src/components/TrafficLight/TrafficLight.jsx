import React, { useState, useEffect, useCallback } from 'react';
import { Stage, Layer, Rect, Circle} from 'react-konva';
import Countdown from '../Countdown/Countdown';
import './TrafficLight.css';



const TrafficLight = () => {
  const [redTimer, setRedTimer] = useState(20);
  const [yellowTimer, setYellowTimer] = useState(5);
  const [greenTimer, setGreenTimer] = useState(10);

    const Lights = {
      Red: {
        color: "red",
        timer: redTimer,
      },
      Yellow: {
        color: "yellow",
        timer: yellowTimer,
      },
      Green: {
        color: "green",
        timer: greenTimer,
      },
    };
    
    const [lightOn, setLightOn] = useState("gray");

    const turnOn = useCallback(() => {
      if (lightOn === Lights.Green) {
        setLightOn(() => Lights.Yellow);
        return;
      }
  
      if (lightOn === Lights.Yellow) {
        setLightOn(() => Lights.Red);
        return;
      }
  
      if (lightOn === Lights.Red) {
        setLightOn(() => Lights.Green);
        return;
      }
    });
  
    useEffect(() => {
      const timeoutId = setTimeout(() => {
        turnOn();
        console.log(turnOn())
      }, lightOn.timer*1000);
      return () => {
        return clearTimeout(timeoutId);
      };
    }, [lightOn, turnOn]);

    const handleStart = () => {
      setLightOn(Lights.Green);
      console.log(lightOn);
      
    }

    const handlePause = () => {
      setLightOn("gray");
    }
     
  return (
    <>
       <div className="container">
            <div className="traffic-light">
                <Stage width={600} height={window.innerHeight} className="">
                    <Layer>
                        <Rect x={20} y={50} width={80} height={240} fill="black" shadowBlur={10} />
                        <Circle x={60} y={100} radius={25} fill={lightOn === Lights.Red ? Lights.Red.color : "gray"} stroke="white" />
                        <Circle x={60} y={160} radius={25} fill={lightOn === Lights.Yellow ? Lights.Yellow.color : "gray"} stroke="white" /> 
                        <Circle x={60} y={220} radius={25} fill={lightOn === Lights.Green ? Lights.Green.color : "gray"} stroke="white" />  
                        <Rect x={55} y={290} width={10} height={300} fill="black" shadowBlur={10} />
                        <Rect x={20} y={590} width={80} height={20} fill="black" shadowBlur={10} />
                    </Layer>
                </Stage>
            </div>
            <div className="display-signal">
              {/*count down*/}
              <div className="time-list">
                <Countdown timer={lightOn.timer} style={{color: lightOn.color}}/>
              </div>
              {/*form*/}
              <form onSubmit={handleStart}>
                <label>
                  <span style={{color: "red"}}>Input red timer: </span>
                  <input type="number" value={redTimer}  onChange={(e) => setRedTimer(e.target.value)}></input>
                </label>
                <label>
                  <span style={{color: "yellow"}}>Input yellow timer: </span>
                  <input type="number" value={yellowTimer}  onChange={(e) => setYellowTimer(e.target.value)}></input>
                </label>
                <label>
                  <span style={{color: "green"}}>Input green timer: </span>
                  <input type="number" value={greenTimer}  onChange={(e) => setGreenTimer(e.target.value)}></input>
                </label>
              </form>
              <div className="control-signal">
                  <button className="start" onClick={handleStart}>Start</button>
                  <button className="pause" onClick={handlePause}>Pause</button>
              </div>
            </div>
       </div>
    </>
  )
}

export default TrafficLight;