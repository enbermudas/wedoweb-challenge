import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Input, Button } from 'antd';
import { connect } from 'react-redux';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
};

const SignUpModal = (props) => {
  const { signup, visible, onClose } = props;

  const [loading, setLoading] = useState(false);

  const handleFinish = (values) => {
    setLoading(true);

    const { username, email, password } = values;

    signup({ username, email, password }).then(() => setLoading(false));
  };

  return (
    <Modal
      title="Sign Up"
      visible={visible}
      onCancel={() => onClose()}
      footer={[
        <Button
          form="signup-form"
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
        id="signup-form"
        name="signup-form"
        onFinish={(values) => handleFinish(values)}
      >
        <Form.Item label="Username" name="username" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item
          label="E-mail address"
          name="email"
          rules={[{ required: true, type: 'email' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Password" name="password" rules={[{ required: true }]}>
          <Input.Password />
        </Form.Item>
      </Form>

      {JSON.stringify(alert)}
    </Modal>
  );
};

SignUpModal.propTypes = {
  signup: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

const mapDispatch = (dispatch) => ({
  signup: (user) => dispatch.auth.signupAPI(user)
});

export default connect(null, mapDispatch)(SignUpModal);
