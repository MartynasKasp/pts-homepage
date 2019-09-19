import React, { Component } from 'react';
import ReactDom from 'react-dom';
import Header from './layout/Header';
import Content from './layout/Content';

require('@fortawesome/fontawesome-free/css/all.min.css');
require('@fortawesome/fontawesome-free/js/all.js');

class App extends Component {
    render() {
        return (
            <div className="container-fluid">
                <Header socialLinks={window.REP_LOG_APP_PROPS.socialLinks} />
                <Content />
            </div>
        );
    }
}

ReactDom.render(<App />, document.getElementById('root'));