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
 
  if (req.params.date.includes("-")) {
    let param = req.params.date;
    let fixDate = new Date(param);
    if (fixDate == "Invalid Date") {
      res.json({ error: "Invalid Date" });
    } else {
      let milisec = fixDate.getTime();
      res.json({ unix: milisec, utc: `${fixDate.toUTCString()}` });
    }
  } else {
    console.log(req.params.date.length);
    let param = parseInt(req.params.date);
    let fixDate = new Date(param);
    if(fixDate == "Invalid Date"){
      res.json({ error: "Invalid Date" });
      
    }else{
      
      res.json({ unix: param, utc: `${fixDate.toUTCString()}` });
    }

  }

  
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
