import React from 'react';
import { PageHeader, Button } from 'antd';
import './Navbar.css';

const Navbar = () => {
  return (
    <PageHeader
      id="page-navbar"
      className="navbar"
      title="We Do Web"
      subTitle="Domain checker!"
      extra={[
        <Button key="1">Sign In</Button>,
        <Button key="2" type="primary">
          Join us!
        </Button>
      ]}
    />
  );
};

export default Navbar;
