const port = process.env.PORT || 5000; //Line 3
const cors = require("cors");
var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var t_diff = '';    // time difference in seconds
var date1 = '';
var date2 = '';
var time_diff = ''; //total time difference

// create a GET route
app.get('/express_backend', (req, res) => {
  // console.log(data);
  res.send({
    express: 'EXPRESS BACKEND IS CONNECTED TO REACT!!!',
    date1: date1,
    date2: date2,
    t_diff: t_diff,
    total_diff: time_diff
  });
});

// Post route to get the time data from the front end
app.post('/store-data', (req, res) => {
  
  // console.log(JSON.stringify(req.body))
  date1 = new Date(req.body.time1);
  date2 = new Date(req.body.time2);
  // console.log(date1)

  // Calculation of time difference
  timeDifference(date1, date2);
  res.send();
});

// Function to calculate time difference in seconds as well as complete days-time difference
function timeDifference(date1, date2) {
  var difference = date1.getTime() - date2.getTime();
  // console.log(difference);
  t_diff = difference / 1000;
  var daysDifference = Math.floor(difference / 1000 / 60 / 60 / 24);
  difference -= daysDifference * 1000 * 60 * 60 * 24

  var hoursDifference = Math.floor(difference / 1000 / 60 / 60);
  difference -= hoursDifference * 1000 * 60 * 60

  var minutesDifference = Math.floor(difference / 1000 / 60);
  difference -= minutesDifference * 1000 * 60

  var secondsDifference = Math.floor(difference / 1000);

  time_diff = (
    daysDifference + ' day(s) ' +
    hoursDifference + ' hour(s) ' +
    minutesDifference + ' minute(s) ' +
    secondsDifference + ' second(s) ');

  // console.log(time_diff);
}

app.listen(port, () => console.log(`Listening on port ${port}`));
