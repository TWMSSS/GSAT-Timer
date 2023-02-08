import { createRoot } from "react-dom/client";

import PopUp from "./PopUp";

let popupRender;
export const initPopUp = () => {
    if (popupRender) return;

    let pop = document.createElement("div");
    pop.id = "popup";
    document.body.appendChild(pop);

    popupRender = createRoot(document.querySelector("#popup"))
}

export const GSAT_NAME = "113年學測";
export const GSAT_EST_TIME = new Date(process.env.GSAT_EST || "2024/01/20");
export const calcTime = (milisec) => {
    var day = Math.floor(milisec / (1000 * 60 * 60 * 24));
    var hour = Math.floor(milisec / (1000 * 60 * 60)) % 24;
    var min = Math.floor(milisec / (1000 * 60)) % 60;
    var sec = Math.floor(milisec / 1000) % 60;

    return [
        day,
        hour,
        min,
        sec
    ];
}

// From https://stackoverflow.com/a/5915122
export const randomGetArray = (array) => {
    return array[Math.floor(Math.random() * array.length)];
}

export const gasText = () => {
    const TEXT = [
        "堅持到底！",
        "加油努力讀書吧！",
        "努力不懈勇取佳績！",
        "十年寒窗無人問，一舉成名天下知！",
        "不嘗試過，怎麼知道！",
        "只有放棄嘗試的，才是失敗者！",
        "每天只看目標，別老想障礙！",
        "人生最大的敵人是自己怯懦！",
        "永不放棄是你夢想實現的唯一秘訣！",
        "付出才會傑出！",
        "你的努力是希望之光！"
    ];

    return randomGetArray(TEXT);
}
export const showPopUp = (title, children, onClose = () => { }) => {
    if (!popupRender) initPopUp();

    popupRender.render(<PopUp title={title} onClose={() => {
        popupRender.render(<></>);
        onClose();
    }}>{children}</PopUp>);
}