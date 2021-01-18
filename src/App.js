import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { message } from 'antd';
import Navbar from './components/Navbar';
import SignInModal from './components/SignInModal';
import { connect } from 'react-redux';

const App = (props) => {
  const { alert, authenticated } = props;

  const [showSignIn, setShowSignIn] = useState(false);

  useEffect(() => {
    if (authenticated) setShowSignIn(false);
  }, [authenticated]);

  useEffect(() => {
    if (alert.type === 'error') message.error(alert.message, 3);
    if (alert.type === 'success') message.success(alert.message, 3);
  }, [alert]);

  return (
    <div className="App">
      <Navbar isGuess={!authenticated} onSignIn={() => setShowSignIn(true)} />

      <SignInModal
        isGuess={!authenticated}
        visible={showSignIn}
        onSignIn={() => setShowSignIn(false)}
        onClose={() => setShowSignIn(false)}
      />
    </div>
  );
};

App.propTypes = {
  alert: PropTypes.shape({
    message: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
  }).isRequired,
  authenticated: PropTypes.bool.isRequired
};

const mapState = (state) => ({
  alert: state.alert,
  authenticated: state.auth.authenticated
});

export default connect(mapState)(App);
