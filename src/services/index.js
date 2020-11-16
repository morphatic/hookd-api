const users = require('./users/users.service.js');
const locations = require('./locations/locations.service.js');
const species = require('./species/species.service.js');
const posts = require('./posts/posts.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(locations);
  app.configure(species);
  app.configure(posts);
};
