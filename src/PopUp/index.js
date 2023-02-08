import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

import "./index.css";

export default ({ title, children, onClose = () => { } }) => {
    return <div className="popup" onClick={(event) => event.target.classList.contains("popup") && onClose()}>
        <div>
            <div className="header">
                <h3>{title}</h3>
                <h3 className="close" onClick={onClose}><FontAwesomeIcon icon={faClose} /></h3>
            </div>
            <div className="body">
                {children}
            </div>
        </div>
    </div>;
}
