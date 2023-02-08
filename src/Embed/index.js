import { useState, useEffect } from "react";

import { GSAT_EST_TIME, calcTime } from "../util";

import "./index.css";

export default () => {
    const [time, setTime] = useState(calcTime(GSAT_EST_TIME.getTime() - Date.now()));

    useEffect(() => {
        let timer = setInterval(() => {
            setTime(calcTime(GSAT_EST_TIME.getTime() - Date.now()));
        }, 100);

        return () => clearInterval(timer);
    }, []);

    return <div className="embed">
        <div className="titleBox">
            <p style={{
                fontSize: "2rem"
            }}>距離<span style={{
                fontSize: "3.5rem",
                fontWeight: 800,
                padding: "0 10px"
                }}>113年學測</span>剩下</p>
        </div>
        <div className="timerBox">
            <div><div>{String(time[0]).padStart(2, '0')}<span>天</span></div></div>
            <div><div>{String(time[1]).padStart(2, '0')}<span>小時</span></div></div>
            <div><div>{String(time[2]).padStart(2, '0')}<span>分鐘</span></div></div>
            <div><div>{String(time[3]).padStart(2, '0')}<span>秒</span></div></div>
        </div>
    </div>;
}