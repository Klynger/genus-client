import React from 'react';
// import axios from '../utils/HTTPClient';
import SubjectForm from '../InstitutionPage/CreatePage/SubjectForm';
import GradeForm from '../InstitutionPage/CreatePage/GradeForm';
import styled from 'styled-components';

const LandingContainer = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  min-height: 100vh;
  min-width: 100vw;
  width: 100%;
`;

// const queryHello = {
//   query: `
//     query {
//       getHello,
//       getP1
//     }
//   `,
// };

// const btnStyle = {
//   marginLeft: '10px',
//   marginTop: '10px',
// };

class TestingPage extends React.Component {
  constructor() {
    super();
    this.state = {
      msg: '',
      open: false,
    };

    this.handleClick = this.handleClick.bind(this);
    this.onClose = this.onClose.bind(this);
  }
 
  handleClick() {
    this.setState(prevstate => ({ ...prevstate, open: !prevstate.open }));
  }

  onClose() {
    this.setState({
      open: false,
    });
  }

  // call() {
    // axios.post('/', queryHello)
    //   .then((data) => {
    //     this.setState({
    //       msg: `${data.data.data.getHello} ${data.data.data.getP1}`,
    //     });
    //   });
  // }

  render() {
    return (
      <LandingContainer>
        TestingPage works
        <div>
          <button
            type="submit"
            onClick={this.handleClick}
          >
            Click Here
          </button>
          {/* <SubjectForm open={this.state.open} onClose={this.onClose} /> */}
          <GradeForm open={this.state.open} onClose={this.onClose} />
          <p>{this.state.msg}</p>
        </div>
      </LandingContainer>
    );
  }
}

export default TestingPage;
