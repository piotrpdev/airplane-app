// use javascript in strict mode
'use strict';
import logger from "./utils/logger.js";

// import all required modules
import express from "express";

import exphbs from "express-handlebars";
import fileUpload from "express-fileupload";
import cookieParser from "cookie-parser";
import routes from "./routes.js";

// initialise project
const app = express();

// static files output to public folder
app.use(express.static("public"));

import bodyParser from "body-parser";
app.use(bodyParser.urlencoded({ extended: false, }));
app.use(cookieParser());

app.use(fileUpload({useTempFiles: true}));

import dayjs from 'dayjs'
import isLeapYear from 'dayjs/plugin/isLeapYear.js' // import plugin
import relativeTime from 'dayjs/plugin/relativeTime.js'
import 'dayjs/locale/en-ie.js' // import locale

dayjs.extend(isLeapYear) // use plugin
dayjs.extend(relativeTime) // use plugin
dayjs.locale('en-ie') // use locale

// use handlebars as view engine
const handlebars = exphbs.create({ extname: ".hbs",
  helpers: {
      uppercase: (inputString) => {
          return inputString.toUpperCase();
      },
      formatDate: (date) => {
              let dateCreated = new Date(date);
              let options = {year: "numeric", month: "long", day: "2-digit"};

              return `${dateCreated.toLocaleDateString("en-IE",options)}`;
      },
      calcTotal: (arr) => {
          let minutes = 0;
          arr.forEach(flight => minutes += parseFloat(flight.duration)); 
        
          const hours = Math.floor(minutes / 60);
          const mins = minutes % 60;

          let timeString = '';
          if (hours > 0) {
            timeString += `${hours} ${hours === 1 ? 'hr' : 'hrs'} `;
          }
          if (mins > 0) {
            timeString += `${mins} ${mins === 1 ? 'min' : 'mins'}`;
          }
          if (timeString === '') {
            timeString = 'No flights';
          }
        
          return timeString;
      },
      yearsEmployed: (year) => {
        const currentYear = new Date().getFullYear();
        const years = currentYear - parseInt(year);
        return years + " years employed";
      },
      timeSince: (date) => {
        return dayjs(date).fromNow();
      }
  }
});
app.engine(".hbs", handlebars.engine);
app.set("view engine", ".hbs");

// http://expressjs.com/en/starter/basic-routing.html
// import routes file and use this for routing
app.use("/", routes);

// listen for requests :)
const listener = app.listen(process.env.PORT || 3000, function() {
  logger.info("Your app is listening on port " + listener.address().port);
});

