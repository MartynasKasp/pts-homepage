import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Provider } from 'react-redux';

import Header from './layout/Header';
import Content from './layout/Content';
import ContactForm from './layout/ContactForm';

require('@fortawesome/fontawesome-free/css/all.min.css');
require('@fortawesome/fontawesome-free/js/all.js');

import store from './store';

class App extends Component {

    render() {
        return (
            <Provider store={store}>
                <Router>
                    <div className="container-fluid">
                        <Header />
                        <div className="row mt-3 d-flex justify-content-center">
                            <div className="col-8 col-sm-4 col-xl-1 p-2 navbar-item">
                                <Link to="/">Pagrindinis</Link>
                            </div>
                            <div className="col-8 col-sm-4 col-xl-1 p-2 navbar-item">
                                    <Link to="/contact">Susisiekti</Link>
                            </div>
                        </div>
                        <Route path="/" exact component={Content}/>
                        <Route path="/contact" component={ContactForm} />
                    </div>
                </Router>
            </Provider>
        );
    }
}

ReactDom.render(<App />, document.getElementById('root'));