// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const locations = sequelizeClient.define('locations', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    street: {
      type: DataTypes.STRING
    },
    city: {
      type: DataTypes.STRING
    },
    state: {
      type: DataTypes.STRING
    },
    zip: {
      type: DataTypes.STRING
    },
    type: {
      type: DataTypes.ENUM(['lake', 'river', 'ocean'])
    },
    lat: {
      type: DataTypes.FLOAT
    },
    lon: {
      type: DataTypes.FLOAT
    },
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  locations.associate = function (models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
    locations.belongsToMany(models.users, { through: 'spots' });
  };

  return locations;
};
