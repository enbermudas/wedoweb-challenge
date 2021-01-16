const Website = (sequelize, Sequelize) => {
  const model = sequelize.define('website', {
    url: {
      type: Sequelize.STRING
    }
  });

  return model;
};

export default Website;
