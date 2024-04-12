// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});
app.get("/api",(req,res)=>{
  let curDate = new Date();
    let curMilisec = curDate.getTime();
    res.json({ unix: curMilisec, utc: `${curDate.toUTCString()}` });
})
// your first API endpoint...
app.get("/api/:date", function (req, res) {
  let param = req.params.date;
  let fixDate;

  // Check if the parameter is a number or a numeric string
  if (!isNaN(param)) {
      // Convert the numeric parameter to a number and create a Date object from it
      let timestamp = parseInt(param, 10);
      fixDate = new Date(timestamp);
  } else {
      // Create a Date object from the string parameter
      fixDate = new Date(param);
  }

  // Check if the Date object is valid
  if (isNaN(fixDate.getTime())) {
      res.json({ error: "Invalid Date" });
  } else {
      // Return the Unix timestamp and UTC date
      res.json({
          unix: fixDate.getTime(),
          utc: fixDate.toUTCString()
      });
  }
});


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
