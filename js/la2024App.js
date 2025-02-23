import Manager from "./la2024Model.js";
import La2024Controller from "./la2024Controller.js";
import La2024View from "./la2024View.js";

const La2024App = new La2024Controller(Manager.getInstancia(), new La2024View());
export default La2024App;

