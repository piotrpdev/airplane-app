'use strict';

import cloudinary from 'cloudinary';

import { createRequire } from "module";
const require = createRequire(import.meta.url);

try {
  const env = require("../.data/.env.json");
  cloudinary.config(env.cloudinary);
}
catch(e) {
  logger.info('You must provide a Cloudinary credentials file - see README.md');
  process.exit(1);
}

import logger from '../utils/logger.js';
import JsonStore from './json-store.js';

const airlineStore = {

  store: new JsonStore('./models/airline-store.json', { airlineCollection: [] }),
  collection: 'airlineCollection',

  getAllAirlines() {
    return this.store.findAll(this.collection);
  },

  getAirline(id) {
    return this.store.findOneBy(this.collection, (collection => collection.id === id));
  },
  
  getUserAirlines(userid) {
    return this.store.findBy(this.collection, (airline => airline.userid === userid));
  },


  removeFlight(id, flightId) {
    const arrayName = "flights";
    this.store.removeItem(this.collection, id, arrayName, flightId);
  },

  removeAirline(id) {
    const airline = this.getAirline(id);
    this.store.removeCollection(this.collection, airline);
  },

  removeAllAirlines() {
    this.store.removeAll(this.collection);
  },
  async addAirline(airline, response) {
    function uploader() {
      return new Promise(function(resolve, reject) {  
        cloudinary.uploader.upload(airline.picture.tempFilePath, function(result, err) {
          if (err) {console.log(err);}
          resolve(result);
        });
      });
    }
    let result = await uploader();
    logger.info('cloudinary result', result);
    airline.picture = result.url;

    this.store.addCollection(this.collection, airline);
    response();
  },

  addFlight(id, flight) {
    const arrayName = "flights";
    this.store.addItem(this.collection, id, arrayName, flight);
  },
  editFlight(id, flightId, updatedFlight) {
    const arrayName = "flights";
    this.store.editItem(this.collection, id, flightId, arrayName, updatedFlight);
  },

};

export default airlineStore;
