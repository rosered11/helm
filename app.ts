import express, { Express } from "express"
import mongoose from "mongoose"
import cors from "cors"
import aaa from "./routers"
import bodyParser from "body-parser"
// var bodyParser = require('body-parser');

const app: Express = express()

const PORT: string | number = process.env.PORT || 4000

 app.use(bodyParser.json()); app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())
// app.use(require('connect').bodyParser());
app.use(aaa)

// const uri: string = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@clustertodo.raz9g.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
const uri: string = `mongodb://root:root@localhost:30500/demo?retryWrites=true&w=majority`
const options = { useNewUrlParser: true, useUnifiedTopology: true }
mongoose.set("useFindAndModify", false)

mongoose
  .connect(uri, options)
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    )
  )
  .catch(error => {
    throw error
  })