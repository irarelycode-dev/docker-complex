import logo from "./logo.svg";
import "./App.css";

//libraries
import { BrowserRouter as Router, Link, Route } from "react-router-dom";

//components
import Fib from "./Fib";
import Otherpage from "./otherpage";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <div>
            <Link to="/">Home</Link>
            <Link to="/otherpage">Other Page</Link>
          </div>
          <div>
            <Route exact path="/" component={Fib} />
            <Route path="/otherpage" component={Otherpage} />
          </div>
        </header>
      </div>
    </Router>
  );
}

export default App;
