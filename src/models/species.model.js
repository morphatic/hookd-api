// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const species = sequelizeClient.define('species', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    common_name: {
      type: DataTypes.STRING
    },
    color: {
      type: DataTypes.STRING,
      defaultValue: 'blue'
    }
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  species.associate = function (models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
    species.hasMany(models.posts, { foreignKey: { field: 'speciesId', allowNull: false }, onDelete: 'cascade' });
  };

  return species;
};
