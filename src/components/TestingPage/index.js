import React from 'react';
import axios from '../utils/HTTPClient';

const queryHello = {
  query: `
    query {
      getHello,
      getP1
    }
  `
};

const btnStyle = {
  marginLeft: '10px',
  marginTop: '10px'
};

class TestingPage extends React.Component {
  constructor() {
    super();
    this.state = {
      msg: ''
    };
  }

  call() {
    axios.post('/', queryHello)
      .then((data) => {
        console.log('data', data);
        this.setState({
          msg: `${data.data.data.getHello} ${data.data.data.getP1}`
        });
      });
  }

  render() {
    return (
      <div>
        TestingPage works
        <div>
          <button style={btnStyle} onClick={() => this.call()}> Click Here </button>
          <p>{this.state.msg}</p>
        </div>
      </div>
    );
  }
}

export default TestingPage;
