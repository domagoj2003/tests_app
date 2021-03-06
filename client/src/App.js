import React, { Component } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import store from "./store";
import PrivateRoute from "./components/common/PrivateRoute";
import setAuthToken from "./utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Results from "./components/result-list/Results";
import Grades from "./components/examboard/Grades";
import Subjects from "./components/examboard/Subjects";
import Sections from "./components/examboard/Sections";
import CreateProfile from "./components/create-profile/CreateProfile";
import Board from "./components/profileboard/Board";
import EditProfile from "./components/edit-profile/EditProfile";
import EditQuestion from "./components/edit-question/EditQuestion";
import HandleGrades from "./components/handle-data/HandleGrades";
import HandleSubjects from "./components/handle-data/HandleSubjects";
import HandleSections from "./components/handle-data/HandleSections";
import ActionBoard from "./components/handle-data/ActionBoard";
import QuestionForm from "./components/handle-data/QuestionForm";
import SubjectForm from "./components/handle-data/SubjectForm";
import TestBoard from "./components/test-board/TestBoard";
import Profiles from "./components/profiles/Profiles";

import "./App.css";

// Check for token
if (localStorage.jwtToken) {
  // set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and expiration
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout uset
    store.dispatch(logoutUser());
    // Redirect to Login page
    window.location.href = "/prijava";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container" id="app">
              <Route exact path="/registracija" component={Register} />
              <Route exact path="/prijava" component={Login} />
              <Route exact path="/profil" component={Board} />
              <Route exact path="/rezultati" component={Results} />
              <Route exact path="/profili" component={Profiles} />
              <Switch>
                <PrivateRoute exact path="/razred" component={Grades} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/predmeti" component={Subjects} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/poglavlje" component={Sections} />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/kreiraj-profil"
                  component={CreateProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/uredi-profil"
                  component={EditProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/ploca" component={HandleGrades} />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/ploca-predmeti"
                  component={HandleSubjects}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/ploca-poglavlja"
                  component={HandleSections}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/ploca-upravljanje"
                  component={ActionBoard}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/novo-pitanje"
                  component={QuestionForm}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/novi-predmet"
                  component={SubjectForm}
                />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/test" component={TestBoard} />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/uredi-pitanje"
                  component={EditQuestion}
                />
              </Switch>
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
