"use strict";

// import express and initialise router
import express from "express";
const router = express.Router();

// import controllers
import { start, dashboard, about, contact, airline, accounts } from "./controllers/index.js";

router.get('/', accounts.index);
router.get('/login', accounts.login);
router.get('/signup', accounts.signup);
router.get('/logout', accounts.logout);
router.post('/register', accounts.register);
router.post('/authenticate', accounts.authenticate);

// connect routes to controllers
router.get('/start', start.index);
router.get("/dashboard", dashboard.index);
router.get("/about", about.index);
router.get("/contact", contact.index);
router.get('/airline/:id', airline.index);

router.post('/dashboard/addairline', dashboard.addAirline);
router.post('/airline/:id/addflight', airline.addFlight);

router.get('/airline/:id/deleteFlight/:flightid', airline.deleteFlight);
router.get('/airline/:id/deleteAirline', airline.deleteAirline);

router.post('/airline/:id/updateflight/:flightid', airline.updateFlight);

router.post('/about/addcomment', about.addComment)

// export router module
export default router;
