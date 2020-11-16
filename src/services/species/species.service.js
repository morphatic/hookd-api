// Initializes the `species` service on path `/species`
const { Species } = require('./species.class');
const createModel = require('../../models/species.model');
const hooks = require('./species.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/species', new Species(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('species');

  service.hooks(hooks);
};
