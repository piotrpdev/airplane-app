'use strict';

import JsonStore from './json-store.js';

const developerStore = {

  // import the airline collection object
  store: new JsonStore('./models/developer-store.json', { developers: [] }),
  collection: 'developers',

  // function to get all of the airlines
  getAllDevelopers() {
    return this.store.findAll(this.collection);
  },

};

// export the airlineStore object so it can be used elsewhere
export default developerStore;
