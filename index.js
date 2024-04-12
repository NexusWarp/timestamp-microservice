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
  
  // Check if the parameter is a number (not a string with a hyphen)
  if (!isNaN(parseInt(param)) && !param.includes("-")) {
    let unixTimestamp = parseInt(param);
    let fixDate = new Date(unixTimestamp);
    
    // Check if the date is valid
    if (isNaN(fixDate.getTime())) {
      res.json({ error: "Invalid Date" });
    } else {
      res.json({ unix: unixTimestamp, utc: fixDate.toUTCString() });
    }
  } else {
    // Handle dates given as strings (e.g. "2015-12-25")
    let fixDate = new Date(param);
    
    // Check if the date is valid
    if (isNaN(fixDate.getTime())) {
      res.json({ error: "Invalid Date" });
    } else {
      res.json({ unix: fixDate.getTime(), utc: fixDate.toUTCString() });
    }
  }
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
