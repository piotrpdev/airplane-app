'use strict';

// import all required modules
import logger from '../utils/logger.js';
import accounts from './accounts.js';

// create dashboard object
const contact = {

  // index method - responsible for creating and rendering the view
  index(request, response) {
    
    const loggedInUser = accounts.getCurrentUser(request);
    
    if (loggedInUser) {
      // display confirmation message in log
      logger.info('contact rendering');

      // create view data object (contains data to be sent to the view e.g. page title)
      const viewData = {
        title: 'Airline App Contact',
        fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
        picture: loggedInUser.picture
      };

      response.render('contact', viewData);
    } else response.redirect('/');
  },
};

// export the dashboard module
export default contact;
