'use strict';

// import all required modules
import logger from '../utils/logger.js';
import developerStore from '../models/developer-store.js';
import userStore from '../models/user-store.js';
import commentStore from "../models/comment-store.js";
import accounts from './accounts.js';
import { v4 as uuidv4 } from 'uuid';

function capitalizeFirstLetters(str) {
  return str
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}


// create dashboard object
const about = {

  // index method - responsible for creating and rendering the view
  index(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    
    if (loggedInUser) {
      // display confirmation message in log
      logger.info('about rendering'); 
      
      const users = userStore.getAllUsers();
      const storedComments = commentStore.getAllComments();
      
      // https://dev.to/_bigblind/quick-tip-transform-an-array-into-an-object-using-reduce-2gh6
      const userDetails = users.reduce((acc, user) => {
          let {id, picture, firstName, lastName} = user;
          const fullName = capitalizeFirstLetters(firstName + ' ' + lastName)
          return {...acc, [id]: {...(acc[id] || {}), picture, fullName}};
      }, {});
      
      const comments = storedComments.map(({ userid, ...rest }) => ({ ...rest, userid, ...userDetails[userid] }));

      // create view data object (contains data to be sent to the view e.g. page title)
      const viewData = {
        title: 'Airline App About',
        developers: developerStore.getAllDevelopers(),
        fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
        picture: loggedInUser.picture,
        comments
      };

      // render the dashboard view and pass through the data
      logger.info('about to render', viewData.developers);
      response.render('about', viewData);
    } else response.redirect('/'); 
  },
  async addComment(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    
    if (loggedInUser) {
      const comment = request.body;
      comment.id = uuidv4();
      comment.userid = loggedInUser.id;
      comment.date = new Date();
      logger.info('adding comment with id: ' + comment.id);
      await commentStore.addComment(comment);
      logger.info('added comment with id: ' + comment.id);

      response.redirect('/about');
    } else response.redirect('/'); 
  }
};

// export the dashboard module
export default about;
