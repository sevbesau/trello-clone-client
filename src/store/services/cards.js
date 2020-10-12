import feathersClient, { makeServicePlugin, BaseModel } from '../../feathers-client';

class Card extends BaseModel {
  static modelName = 'Card';

  static instanceDefaults() {
    return {
      title: '',
      description: '',
      order: 0,
      archived: false,
      listId: '',
      boardId: '',
      members: [],
    };
  }
}
const servicePath = 'cards';
const servicePlugin = makeServicePlugin({
  Model: Card,
  service: feathersClient.service(servicePath),
  servicePath,
});

// Setup the client-side Feathers hooks.
feathersClient.service(servicePath).hooks({
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
});

export default servicePlugin;
