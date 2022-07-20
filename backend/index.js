//Import libraries
const express = require("express")
const cors = require("cors")
const knexFile = require ("./knexFile").development;
const knex = require("knex")(knexFile);
const jwt = require("jsonwebtoken")
const auth = require("./auth")
require("dotenv").config();

//Setup APP
const app = express()
app.use(cors())
app.use(express.json()) // => allows us to access req.body
auth(knex).initialize();

/** *********************** Middleware **************************** */
const AppRouter = require("./Routers/AppRouter");
const AuthRouter = require("./Routers/AuthRouter");

/** *********************** Configure Router **************************** */
app.use("/api", new AppRouter(express, knex, jwt).router());
app.use("/auth", new AuthRouter(express, knex, jwt).router())


/** *********************** App Listen  **************************** */
app.listen(process.env.PORT, () => {
    console.log(`running on port ${process.env.PORT}`)
});