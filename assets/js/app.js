import React, { Component } from 'react';
import ReactDom from 'react-dom';
import Header from './layout/Header';

class App extends Component {
    render() {
        return (
            <div className="container-fluid">
                <div className="row header">
                    <Header />
                </div>
            </div>
        );
    }
}

ReactDom.render(<App />, document.getElementById('root'));