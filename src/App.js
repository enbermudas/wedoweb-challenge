import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { message } from 'antd';
import Navbar from './components/Navbar';
import SignInModal from './components/SignInModal';
import { connect } from 'react-redux';

const App = (props) => {
  const { alert } = props;

  useEffect(() => {
    if (alert.type === 'error') message.error(alert.message, 3);
    if (alert.type === 'success') message.success(alert.message, 3);
  }, [alert]);

  return (
    <div className="App">
      <Navbar />

      <SignInModal />
    </div>
  );
};

App.propTypes = {
  alert: PropTypes.shape({
    message: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired
  }).isRequired
};

const mapState = (state) => ({
  alert: state.alert
});

export default connect(mapState)(App);
