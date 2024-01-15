const express = require("express");
const mongoose = require("mongoose");
const cookies = require("cookie-parser");

const path = require ('path');
const authRoutes = require("./authentication/auth-routes");
const partnerRoutes = require("./partners/partner-routes");
const sponsorRoutes = require("./sponsors/sponsor-routes");
const speakerRoutes = require("./speakers/speaker-routes");
const eventRoutes = require("./events/event-routes");
const ticketRoutes = require("./tickets/ticket-routes");
const cartRoutes = require("./cart/cart-routes");
const orderRoutes = require("./orders/order-routes");
const homeRoutes = require("./homeRoutes");

const session = require('express-session');

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 
app.use(cookies());
app.use(session({
  secret: "mfwb5isSessionSecretKey2133",
  saveUninitialized:true,
  cookie: { maxAge: 900000 }, // 15 minute in milisecunde
  resave: false
}));

app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'public'));

const MONGO_DB_CONNECTION_STRING =
  "mongodb+srv://iacobisabela726:SweetCookie19*@proiectnodejs.mfwb5is.mongodb.net/?retryWrites=true&w=majority";
  
app.use(authRoutes);
app.use(partnerRoutes);
app.use(sponsorRoutes);
app.use(speakerRoutes);
app.use(eventRoutes);
app.use(ticketRoutes);
app.use(homeRoutes);
app.use(cartRoutes);
app.use(orderRoutes);

mongoose
  .connect(MONGO_DB_CONNECTION_STRING)
  .then(() => {
    app.listen(port, () => {
      console.log("Server listening on port ", port);
    });
  })
  .catch((err) => console.log(err));
