import "antd/dist/antd.css";
import axios from "axios";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AddEmployee from "./components/AddEmployee/AddEmployee";
import Header from "./components/Header/Header";
import UploadEmployees from "./components/UploadEmployees/UploadEmployees";
import Employee from "./pages/employee";
import store from "./redux/store";

axios.defaults.baseURL = "http://localhost:5000";

const App = () => {
  return (
    <>
      <Provider store={store}>
        <Router>
          <Header />
          <Switch>
            <Route exact path="/">
              <Employee />
            </Route>
            <Route exact path="/add-employee">
              <AddEmployee />
            </Route>
            <Route exact path="/upload-employees">
              <UploadEmployees />
            </Route>
          </Switch>
        </Router>
      </Provider>
    </>
  );
};

export default App;
