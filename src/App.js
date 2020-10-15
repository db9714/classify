import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
// import configureStore from "./utils/store";
import { persistor, store } from "./utils/store";
import "./App.css";

import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login.js";
import ActivateAccount from "./pages/ActivateAccount.js";
import ForgotPassword from "./pages/ForgotPassword.js";

import ChangePassword from "./pages/ChangePassword";
import Signup from "./pages/Signup.js";

import Dashboard from "./pages/Dashboard";

global.navigate = null;

function App() {
  return (
    <div className="app">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router>
            <Switch>
              <Route exact path="/" component={Login} />
              <Route exact path="/forgotpassword" component={ForgotPassword} />
              <Route exact path="/activateaccount/:uid/:token" component={ActivateAccount} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/dashboard" component={Dashboard} />
			  <Route exact path="/firstPage" component={firstPage} />

              {/* <ProtectedRoute exact path="/changepassword" component={ChangePassword} /> */}
            </Switch>
          </Router>
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;
