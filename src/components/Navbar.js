import React from 'react';
import PropTypes from 'prop-types';
import { PageHeader, Button } from 'antd';
import { connect } from 'react-redux';
import './Navbar.css';

const Navbar = (props) => {
  const { isGuess, onSignIn, onSignUp, logout } = props;

  return (
    <PageHeader
      id="page-navbar"
      className="navbar"
      title="We Do Web"
      subTitle="Domain checker!"
      extra={
        isGuess
          ? [
              <Button key="1" onClick={() => onSignIn()}>
                Sign In
              </Button>,
              <Button key="2" type="primary" onClick={() => onSignUp()}>
                Join us!
              </Button>
            ]
          : [
              <Button key="1" onClick={() => logout()}>
                Logout
              </Button>
            ]
      }
    />
  );
};

Navbar.propTypes = {
  isGuess: PropTypes.bool.isRequired,
  onSignIn: PropTypes.func.isRequired,
  onSignUp: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired
};

const mapDispatch = (dispatch) => ({
  logout: () => dispatch.auth.logout()
});

export default connect(null, mapDispatch)(Navbar);
