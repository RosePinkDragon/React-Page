// ** This is a basic code with no animations.
// !! This is just for ref purposes with the dropdown menu

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import GlobalStyle from "./GlobalStyles";
import Home from "./pages";
import SignInPage from "./pages/signin";

import "./App.css";

import GlobalStyle from "./GlobalStyles";
import Home from "./pages";
import SignInPage from "./pages/signin";

function App() {
  return (
    <Router>
      <GlobalStyle />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/signin" component={SignInPage} exact />
      </Switch>
    </Router>
  );
}

export default App;
