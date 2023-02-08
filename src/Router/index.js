import { Routes, Route, HashRouter } from "react-router-dom";

import Main from "../Main";
import Embed from "../Embed";

export default () => {
    return <HashRouter>
        <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/embed" element={<Embed />} />
        </Routes>
    </HashRouter>
}