import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { message } from 'antd';
import { connect } from 'react-redux';

import Navbar from './components/Navbar';
import SignInModal from './components/SignInModal';
import SignUpModal from './components/SignUpModal';
import DomainsList from './components/DomainsList';

const App = (props) => {
  const { alert, authenticated, fetch } = props;

  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  useEffect(() => {
    fetch();
  }, []);

  useEffect(() => {
    if (authenticated) {
      setShowSignIn(false);
      setShowSignUp(false);
    }
  }, [authenticated]);

  useEffect(() => {
    if (alert.type === 'error') message.error(alert.message, 3);
    if (alert.type === 'success') message.success(alert.message, 3);
  }, [alert]);

  return (
    <div className="App">
      <Navbar
        isGuess={!authenticated}
        onSignIn={() => setShowSignIn(true)}
        onSignUp={() => setShowSignUp(true)}
      />

      {!authenticated && (
        <>
          <SignInModal
            isGuess={!authenticated}
            visible={showSignIn}
            onClose={() => setShowSignIn(false)}
          />

          <SignUpModal
            isGuess={!authenticated}
            visible={showSignUp}
            onClose={() => setShowSignUp(false)}
          />
        </>
      )}

      <DomainsList />
    </div>
  );
};

App.propTypes = {
  alert: PropTypes.shape({
    message: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
  }).isRequired,
  authenticated: PropTypes.bool.isRequired,
  fetch: PropTypes.func.isRequired
};

const mapState = (state) => ({
  alert: state.alert,
  authenticated: state.auth.authenticated
});

const mapDispatch = (dispatch) => ({
  fetch: () => dispatch.website.fetchAPI()
});

export default connect(mapState, mapDispatch)(App);
