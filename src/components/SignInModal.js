import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Input, Button } from 'antd';
import { connect } from 'react-redux';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
};

const SignInModal = (props) => {
  const { signin, visible, onClose } = props;

  const [loading, setLoading] = useState(false);

  const handleFinish = (values) => {
    setLoading(true);

    const { email, password } = values;

    signin({ email, password }).then(() => setLoading(false));
  };

  return (
    <Modal
      title="Sign In"
      visible={visible}
      onCancel={() => onClose()}
      footer={[
        <Button
          form="signin-form"
          key="submit"
          htmlType="submit"
          type="primary"
          loading={loading}
        >
          Submit
        </Button>
      ]}
    >
      <Form
        {...layout}
        id="signin-form"
        name="signin-form"
        onFinish={(values) => handleFinish(values)}
      >
        <Form.Item
          label="E-mail address"
          name="email"
          rules={[{ required: true, message: 'The email address is required.' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'The password is required.' }]}
        >
          <Input.Password />
        </Form.Item>
      </Form>

      {JSON.stringify(alert)}
    </Modal>
  );
};

SignInModal.propTypes = {
  signin: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

const mapDispatch = (dispatch) => ({
  signin: (user) => dispatch.auth.signinAPI(user)
});

export default connect(null, mapDispatch)(SignInModal);
