//Import libraries
const express = require("express")
const cors = require("cors")
const knexFile = require ("./knexFile").development;
const knex = require("knex")(knexFile);

//Setup APP
const app = express()
app.use(cors())
app.use(express.json()) // => allows us to access req.body

/** *********************** Middleware **************************** */
const AppRouter = require("./Routers/AppRouter");

/** *********************** Configure Router **************************** */
app.use("/api", new AppRouter(express, knex).router());


/** *********************** App Listen  **************************** */
app.listen(process.env.PORT, () => {
    console.log(`running on port ${process.env.PORT}`)
});