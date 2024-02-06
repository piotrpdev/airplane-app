'use strict';

import { randomUUID } from 'crypto';

// import all required modules
import logger from '../utils/logger.js';
import airlineStore from '../models/airline-store.js';
import accounts from './accounts.js';


// create dashboard object
const dashboard = {

  // index method - responsible for creating and rendering the view
  index(request, response) {

    // display confirmation message in log
    const loggedInUser = accounts.getCurrentUser(request);
    if (loggedInUser) {
      logger.info('dashboard rendering');

      // create view data object (contains data to be sent to the view e.g. page title)
      const viewData = {
        title: 'Airline App Dashboard',
        airlines: airlineStore.getUserAirlines(loggedInUser.id),
        fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
        picture: loggedInUser.picture
      };

      // render the dashboard view and pass through the data
      logger.info('about to render', viewData.airlines);
      response.render('dashboard', viewData);
    } else response.redirect('/');
  },
  addAirline(request, response) {
    const date = new Date();
    const loggedInUser = accounts.getCurrentUser(request);
    const newAirline = {
      id: randomUUID(),
      userid: loggedInUser.id,
      airlineName: request.body.airlineName,
      airlineIcao: request.body.airlineIcao,
      picture: request.files.picture,
      date,
      flights: [],
    };
    airlineStore.addAirline(newAirline, function() {
      response.redirect("/dashboard");
    });
  },
};

// export the dashboard module
export default dashboard;
