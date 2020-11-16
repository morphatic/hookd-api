// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const users = sequelizeClient.define('users', {
    email: {
      type: DataTypes.STRING,
      allowNull: false, // this means field is required
      unique: true
    },
    username: {
      type: DataTypes.STRING,
      unique: true
    },
    first_name: {
      type: DataTypes.STRING
    },
    last_name: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING
    },
    phone: {
      type: DataTypes.STRING
    },
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  users.associate = function (models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
    users.belongsToMany(models.locations, { through: 'spots' });
    users.hasMany(models.posts, { foreignKey: { field: 'userId', allowNull: false }, onDelete: 'cascade' });
    users.belongsToMany(models.posts, { through: 'likes'} );
    users.belongsToMany(models.users, { through: 'friends', as: 'friend' } );
  };

  return users;
};
