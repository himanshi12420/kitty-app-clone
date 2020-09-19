const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var jsdom = require("jsdom");
const{ JSDOM } = jsdom;
const{ window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;
var $ = require("jquery")(window);

const app = express();

var people = [];
var event_name = "";
var name = "";
var email = "";
var money = "";
var what_for = "";
var personMoney = [];
var options = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));

app.get("/", function(req, res) {



  res.render("form", {
    person: people,
    mEvent_name: event_name,
    mEmail: email,
    mName: name
  });
})

app.post("/", function(req, res) {
  var person = req.body.name_2;
  event_name = req.body.event_name;
  name = req.body.name;
  email = req.body.email;

  people.push(person);
  res.redirect("/");
})

app.get("/expense", function(req, res) {


  res.render("expense", {
    person: people,
    mName: name,
    mEvent_name: event_name
  })
});

app.post("/expense", function(req, res) {

  if (!people.includes(name)) {
    people.unshift(name);
  }

  options.push(req.body);
  //console.log(options);

  res.redirect("/expense");
})

app.get("/overview", function(req, res) {

  var totalMoney = 0;

  for (var i = 1; i < people.length+1; i++) {
    var money = Number(options[i].money);
    totalMoney = totalMoney + money;
  };

for(var i=1; i< people.length+1; i++){
  if(options[i].pName == people[i-1])
  var myCost = totalMoney/(people.length);
  var paidByMe = options[i].money;
  var owed = paidByMe-myCost;
  what_for = options[i].what_for;
};

  res.render("overview", {
    mEvent_name: event_name,
    person: people,
    mTotalMoney: totalMoney,
    mMyCost : myCost,
    mPaidByMe : paidByMe,
    mOwed: owed,
    mWhatFor: what_for
  });
})

app.post("/overview", function(req, res) {



//  console.log(req.body)

  res.redirect("overview");
})

app.get("/money_given", function(req, res) {
  res.render("money_given", {
    person: people,
    mName: name,
    mEvent_name: event_name
  });
})


app.get("/income", function(req, res) {
  res.render("income", {
    person: people,
    mName: name,
    mEvent_name: event_name
  });
})







app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});
