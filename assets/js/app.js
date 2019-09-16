import React, { Component } from 'react';
import ReactDom from 'react-dom';
import Header from './layout/Header';
import Content from './layout/Content';

class App extends Component {
    render() {
        return (
            <div className="container-fluid">
                <div className="row header">
                    <Header />
                </div>
                <div id="content" className="row">
                    <Content />
                </div>
            </div>
        );
    }
}

ReactDom.render(<App />, document.getElementById('root'));