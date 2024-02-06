'use strict';

import logger from '../utils/logger.js';
import userStore from '../models/user-store.js';
import airlineStore from "../models/airline-store.js";
import { v4 as uuidv4 } from 'uuid';


//create an accounts object
const accounts = {

  //index function to render index page
  index(request, response) {
    
    logger.info("start rendering");
    
    const loggedInUser = accounts.getCurrentUser(request);
    
    if (!loggedInUser) {
      // app statistics calculations

      const airlines = airlineStore.getAllAirlines();

      let numAirlines = airlines.length;

      let numFlights = 0;

      for (let item of airlines) {
        numFlights += item.flights.length;
      }

      const averageflights = numFlights / airlines.length;


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


      // create view data object (contains data to be sent to the view e.g. page title)
      const viewData = {
        title: "Welcome to the Airline App!",
        totalAirlines: numAirlines,
        totalFlights: numFlights,
        averageFlightsPerAirline: Math.round(averageflights),
        airlineWithMostFlights: airlineWithMostFlights?.airlineName,
        airlineWithLeastFlights: airlineWithLeastFlights?.airlineName,
      };

      // render the start view and pass through the data
      response.render("index", viewData);
    } else response.redirect('/start')
  },

  //login function to render login page
  login(request, response) {
    const error = request.query?.error;
    const viewData = {
      title: 'Login to the Service',
      error
    };
    response.render('login', viewData);
  },

  //logout function to render logout page
  logout(request, response) {
    response.cookie('airline', '');
    response.redirect('/');
  },

 //signup function to render signup page
  signup(request, response) {
    const viewData = {
      title: 'Login to the Service',
    };
    response.render('signup', viewData);
  },

 //register function to render the registration page for adding a new user
  async register(request, response) {
    const user = request.body;
    user.id = uuidv4();
    user.picture = request.files.picture;
    await userStore.addUser(user);
    logger.info('registering' + user.email);
    
    response.cookie('airline', user.email);
    logger.info('logging in ' + user.email);
    response.redirect('/start');
  },

  //authenticate function to check user credentials and either render the login page again or the start page.
  authenticate(request, response) {
    const user = userStore.getUserByEmail(request.body.email);
    if (user && user.password == request.body.password) {
      response.cookie('airline', user.email);
      logger.info('logging in ' + user.email);
      response.redirect('/start');
    } else {
      response.redirect('/login?error=true');
    }
  },

 //utility function getCurrentUser to check who is currently logged in
  getCurrentUser (request) {
    const userEmail = request.cookies.airline;
    return userStore.getUserByEmail(userEmail);
  }
}

export default accounts;
