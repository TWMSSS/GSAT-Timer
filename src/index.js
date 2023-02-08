import { createRoot } from "react-dom/client";

import App from "./App";
import { initPopUp } from "./util";

initPopUp();
createRoot(document.querySelector("#app")).render(<App />);