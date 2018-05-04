import ReactDOM from 'react-dom';
import React from 'react';
// import App from './App.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (<div>YO</div>)
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));