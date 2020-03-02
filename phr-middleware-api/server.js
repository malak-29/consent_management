const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const cors = require("cors");
const ip = "130.147.175.221";
const port = 8099;


app.use(cors());
app.options('*',cors());

app.use(bodyParser.json());

require("./routes")(app);
app.listen(port,ip,() => {
  console.log("we are listening on " + port);
});
