import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShare, faCode } from "@fortawesome/free-solid-svg-icons";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import html2canvas from "html2canvas";

import { calcTime, gasText, GSAT_EST_TIME, GSAT_NAME, showPopUp } from "../util";

import "./index.css";

export default () => {
    const [time, setTime] = useState(calcTime(GSAT_EST_TIME.getTime() - Date.now()));
    const [text] = useState(gasText());
    const [hide, setHide] = useState(false);

    async function capture() {
        setHide(true);
    }

    useEffect(() => {
        let timer = setInterval(() => {
            setTime(calcTime(GSAT_EST_TIME.getTime() - Date.now()));
        }, 100);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (!hide) return;

        html2canvas(document.querySelector(".centerBox > div")).then(e => e.toBlob((blob) => {
            if (typeof navigator.share === "undefined") {
                if ("clipboard" in navigator) {
                    navigator.clipboard.write([
                        new ClipboardItem({
                            [blob.type]: blob
                        })
                    ]).then(e => showPopUp("成功！", <p>已複製到剪貼簿</p>));
                } else {
                    let url = URL.createObjectURL(blob);
                    let doc = document.createElement("a");
                    doc.href = url;
                    doc.download = "est.png";
                    doc.click();
                }
            } else {
                const ftime = time.map(e => String(e).padStart(2, "0"));
                navigator.share({
                    title: "分享計時器",
                    text: `你知道嗎? 距離「${GSAT_NAME}」還剩下 ${ftime[0]}天 ${ftime[1]}小時 ${ftime[2]}分鐘 ${ftime[3]}秒 喔! 送你一句勵志的話: ${text}`,
                    files: [
                        new File([blob], "est.png", {
                            type: blob.type
                        })
                    ]
                });
            }
            setHide(false);
        }));
    }, [hide]);

    return <div className="centerBox">
        <div>
            <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
            }}>
                <div className="titleBox">
                    <p style={{
                        fontSize: "1.5rem"
                    }}>距離<span style={{
                        fontSize: "3rem",
                        fontWeight: 800,
                        padding: "0 10px"
                        }}>{GSAT_NAME}</span>剩下</p>
                </div>

                <div className="funcBox" style={{
                    display: hide ? "none" : "block"
                }}>
                    <FontAwesomeIcon icon={faShare} size="3x" onClick={capture} />
                    <FontAwesomeIcon icon={faCode} size="3x" onClick={() => {
                        const iframeScript = `<iframe src='${location.protocol}//${location.host}${location.pathname}${location.pathname.endsWith("/#/") ? "embed" : "#/embed"}' style='border: 0;'></iframe>`;
                        showPopUp("嵌入倒計時器", <div>
                            <p>您可以將此倒計時器以iframe的方式嵌入至您的網站中</p>
                            <p>盡量使用動態大小來讓頁面不至於走板。</p>
                            <SyntaxHighlighter language="html" style={atomOneDark}>{iframeScript}</SyntaxHighlighter>
                        </div>)
                    }} />
                </div>
            </div>
            <div className="timerBox">
                <span>{String(time[0]).padStart(2, '0')}<span>天</span></span>
                <span>{String(time[1]).padStart(2, '0')}<span>小時</span></span>
                <span>{String(time[2]).padStart(2, '0')}<span>分鐘</span></span>
                <span>{String(time[3]).padStart(2, '0')}<span>秒</span></span>
            </div>
            <div className="extraBox">
                <p>{text}</p>
                <p>HLHSInfo Developers</p>
            </div>
        </div>
    </div>;
}