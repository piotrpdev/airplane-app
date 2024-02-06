'use strict';

import { randomUUID } from 'crypto';

// import all required modules
import logger from '../utils/logger.js';
import airlineStore from '../models/airline-store.js';
import accounts from './accounts.js';


const airline = {
  index(request, response) {    
    const loggedInUser = accounts.getCurrentUser(request);
    
    if (loggedInUser) {
        const airlineId = request.params.id;
      
        logger.debug('Airline id = ' + airlineId);
      
        const viewData = {
          title: 'Airline',
          airline: airlineStore.getAirline(airlineId),
          fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
          picture: loggedInUser.picture
        };
      
        response.render('airline', viewData);
    } else response.redirect('/');
  },
  addFlight(request, response) {
    const airlineId = request.params.id;
    const airline = airlineStore.getAirline(airlineId);
    const newFlight = {
      id: randomUUID(),
      pnr: request.body.pnr,
      source: request.body.source,
      destination: request.body.destination,
      duration: request.body.duration,
    };
    airlineStore.addFlight(airlineId, newFlight);
    response.redirect('/airline/' + airlineId);
  },
  deleteFlight(request, response) {
    const airlineId = request.params.id;
    const flightId = request.params.flightid;
    logger.debug(`Deleting Flight ${flightId} from Airline ${airlineId}`);
    airlineStore.removeFlight(airlineId, flightId);
    response.redirect('/airline/' + airlineId);
  },
  deleteAirline(request, response) {
    const airlineId = request.params.id;
    logger.debug(`Deleting Airline ${airlineId}`);
    airlineStore.removeAirline(airlineId);
    response.redirect('/dashboard');
  },
  updateFlight(request, response) {
    const airlineId = request.params.id;
    const flightId = request.params.flightid;
    logger.debug("updating flight " + flightId);
    const updatedFlight = {
      id: flightId,
      pnr: request.body.pnr,
      source: request.body.source,
      destination: request.body.destination,
      duration: request.body.duration
    };
    airlineStore.editFlight(airlineId, flightId, updatedFlight);
    response.redirect('/airline/' + airlineId);
  }
};

export default airline;
