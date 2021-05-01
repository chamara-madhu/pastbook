import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Dashboard from "./views/Dashboard";
import SelectBestNine from "./views/SelectBestNine";
import ChangeOrderAndConfirm from "./views/ChangeOrderAndConfirm";
import "./styles/main.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Dashboard} />
        <Route path="/select-best-nine" exact component={SelectBestNine} />
        <Route path="/change-order" exact component={ChangeOrderAndConfirm} />
      </Switch>
    </Router>
  );
}

export default App;
