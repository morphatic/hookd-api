const app = require('../../src/app');

describe('\'species\' service', () => {
  it('registered the service', () => {
    const service = app.service('species');
    expect(service).toBeTruthy();
  });
});
