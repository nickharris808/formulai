import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './pages/index';
import ProfileEditor from './components/ProfileEditor';

const App = () => {
  return (
    <Router>
      <div className="App">
        <header>
          <h1>Personalized Shopify Store</h1>
        </header>
        <main>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/profile" component={ProfileEditor} />
          </Switch>
        </main>
        <footer>
          <p>&copy; 2023 Personalized Shopify Store</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;