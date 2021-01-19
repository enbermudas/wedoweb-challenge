import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, List, Form, Input, Button, Divider } from 'antd';
import { connect } from 'react-redux';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 }
};

const DomainsList = (props) => {
  const { sites, create } = props;

  const handleFinish = (values) => {
    const { url } = values;
    create({ url });
  };

  return (
    <Row style={{ margin: '24px 0' }}>
      <Col span={12} offset={6}>
        <Form
          {...layout}
          id="create-form"
          name="create-form"
          onFinish={(values) => handleFinish(values)}
        >
          <Form.Item label="Website URL" name="url" rules={[{ required: true }]}>
            <Input placeholder="www.example.com" />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Col>

      <Divider />

      <Col span={12} offset={6}>
        <List
          bordered
          dataSource={sites}
          renderItem={(item, i) => (
            <List.Item key={i}>
              <List.Item.Meta
                title={item.domain}
                description={`This domain has been visited ${item.cnt} times.`}
              />
            </List.Item>
          )}
        />
      </Col>
    </Row>
  );
};

DomainsList.propTypes = {
  sites: PropTypes.arrayOf(
    PropTypes.shape({
      domain: PropTypes.string.isRequired,
      cnt: PropTypes.number.isRequired
    })
  ).isRequired,
  create: PropTypes.func.isRequired
};

const mapState = (state) => ({
  sites: state.website.sites
});

const mapDispatch = (dispatch) => ({
  create: (url) => dispatch.website.createAPI(url)
});

export default connect(mapState, mapDispatch)(DomainsList);
