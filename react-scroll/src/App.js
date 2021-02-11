// ** This is a basic code with no animations.
// !! This is just for ref purposes with the dropdown menu

import { BrowserRouter as Router } from 'react-router-dom';
import GlobalStyle from './GlobalStyles';
import Home from './pages';



function App() {

  return (
    <Router>
      <GlobalStyle/>
      <Home/>
    </Router>
  );
}

export default App;
