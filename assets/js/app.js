import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './layout/Header';
import Content from './layout/Content';
import ContactForm from './layout/ContactForm';

require('@fortawesome/fontawesome-free/css/all.min.css');
require('@fortawesome/fontawesome-free/js/all.js');

class App extends Component {
    render() {
        return (
            <Router>
                <div className="container-fluid">
                    <Header socialLinks={window.REP_LOG_APP_PROPS.socialLinks} />
                    <Route path="/" exact component={Content}/>
                    <Route path="/contact" component={ContactForm} />
                </div>
            </Router>
        );
    }
}

ReactDom.render(<App />, document.getElementById('root'));