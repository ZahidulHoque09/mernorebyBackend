const express = require("express");
const app = express();
const AllRoutes = require("./Route/index");

/* ==== We will use middleware to use all the router from routes======= */
app.use(express.json());
app.use(
  AllRoutes
); /* === Just use one name api/vi  to use common purpose its used on browser==== */

module.exports = { app };
