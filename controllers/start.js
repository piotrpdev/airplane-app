"use strict";

// import all required modules
import logger from "../utils/logger.js";

import airlineStore from "../models/airline-store.js";
import userStore from '../models/user-store.js';

import accounts from './accounts.js';

function capitalizeFirstLetters(str) {
  return str
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}


// create start object
const start = {
  // index method - responsible for creating and rendering the view
  index(request, response) {
    // display confirmation message in log
    const loggedInUser = accounts.getCurrentUser(request);
    const users = userStore.getAllUsers();
    
    if (loggedInUser) {
    logger.info("start rendering");

    // app statistics calculations

    const airlines = airlineStore.getAllAirlines();

    let numAirlines = airlines.length;

    let numFlights = 0;

    for (let item of airlines) {
      numFlights += item.flights.length;
    }
      
    const userFlightsArr = {};
      
    for (const airline of airlines) {
      const userFlights = userFlightsArr[airline.userid];
      
      if (userFlights == null) {
        userFlightsArr[airline.userid] = 0;
      } else {
        userFlightsArr[airline.userid] = userFlights + 1;
      }
    }

    // This is the average for users who have made at least one airline
    const averageflights = numFlights / Object.keys(userFlightsArr).length;
    
    // https://stackoverflow.com/a/27376421
    const userWithMostFlights = userStore.getUserById(Object.keys(userFlightsArr).reduce((a, b) => userFlightsArr[a] > userFlightsArr[b] ? a : b));
      
    const userWithLeastFlights = userStore.getUserById(Object.keys(userFlightsArr).reduce((a, b) => userFlightsArr[a] < userFlightsArr[b] ? a : b));


    // E2

    let airlineWithMostFlights;

    for (const airline of airlines) {
      if (airline.flights.length > (airlineWithMostFlights?.flights.length || -1)) {
        airlineWithMostFlights = airline;
      }
    }

    // E3

    let airlineWithLeastFlights;

    for (const airline of airlines) {
      if (
        airline.flights.length <
        (airlineWithLeastFlights?.flights.length || Number.MAX_SAFE_INTEGER)
      ) {
        airlineWithLeastFlights = airline;
      }
    }
    
    ///////////////
    // USER STATS
    ///////////////
      
    const userAirlines = airlineStore.getUserAirlines(loggedInUser.id);
      
    let userTotalFlights = 0;

    for (let item of userAirlines) {
      userTotalFlights += item.flights.length;
    }

    const userAverageFlights = userTotalFlights / userAirlines.length;


    // E2

    let userAirlineWithMostFlights;

    for (const airline of userAirlines) {
      if (airline.flights.length > (userAirlineWithMostFlights?.flights.length || -1)) {
        userAirlineWithMostFlights = airline;
      }
    }

    // E3

    let userAirlineWithLeastFlights;

    for (const airline of userAirlines) {
      if (
        airline.flights.length <
        (userAirlineWithLeastFlights?.flights.length || Number.MAX_SAFE_INTEGER)
      ) {
        userAirlineWithLeastFlights = airline;
      }
    }


    // create view data object (contains data to be sent to the view e.g. page title)
    const viewData = {
      title: "Welcome to the Airline App!",
      totalAirlines: numAirlines,
      totalFlights: numFlights,
      averageFlightsPerAirline: Math.round(averageflights),
      airlineWithMostFlights: airlineWithMostFlights?.airlineName,
      airlineWithLeastFlights: airlineWithLeastFlights?.airlineName,
      userWithMostFlights: capitalizeFirstLetters(userWithMostFlights.firstName + ' ' + userWithMostFlights.lastName),
      userWithLeastFlights: capitalizeFirstLetters(userWithLeastFlights.firstName + ' ' + userWithLeastFlights.lastName),
      fullname: capitalizeFirstLetters(loggedInUser.firstName + ' ' + loggedInUser.lastName),
      picture: loggedInUser.picture,
      userTotalAirlines: userAirlines.length,
      userTotalFlights,
      userAverageFlights: Math.round(userAverageFlights),
      userAirlineWithMostFlights: userAirlineWithMostFlights?.airlineName,
      userAirlineWithLeastFlights: userAirlineWithLeastFlights?.airlineName
    };

    // render the start view and pass through the data
    response.render("start", viewData);
    } else response.redirect('/');
  },
};

// export the start module
export default start;
