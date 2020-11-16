// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const posts = sequelizeClient.define('posts', {
    picture: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING
    },
    is_private: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  posts.associate = function (models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
    posts.belongsTo(models.users, { foreignKey: { field: 'userId', allowNull: false }, onDelete: 'cascade' });
    posts.belongsTo(models.species, { foreignKey: { field: 'speciesId', allowNull: false }, onDelete: 'cascade' });
    posts.belongsTo(models.locations, { foreignKey: { field: 'locationId', allowNull: false }, onDelete: 'cascade' });
  };

  return posts;
};
