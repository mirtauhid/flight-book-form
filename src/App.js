import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Faq from './Faq';
import Header from './Header';
import Home from './Home';

const App = () => {
    return (
        <div>
            <Router>
                <Header />
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route path="/faq">
                        <Faq />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
};

export default App;
