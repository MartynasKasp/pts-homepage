import React, { Component } from 'react';
import ReactDom from 'react-dom';

require('@fortawesome/fontawesome-free/css/all.min.css');
require('@fortawesome/fontawesome-free/js/all.js');

class App extends Component {
    render() {
        return (
            <div className="container-fluid">
                <h1>Admin Back Office</h1>
            </div>
        );
    }
}

ReactDom.render(<App />, document.getElementById('root'));