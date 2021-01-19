import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, List } from 'antd';
import { connect } from 'react-redux';

const DomainsList = (props) => {
  const { sites } = props;

  return (
    <Row style={{ margin: '24px 0' }}>
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
  ).isRequired
};

const mapState = (state) => ({
  sites: state.website.sites
});

export default connect(mapState)(DomainsList);
