const express = require("express");
const bodyparser = require("body-parser");

let items= [];
let workitems= [];
const app = express();
app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("public"));
app.get("/", function(req, res) {

  let today = new Date();

  let options = { weekday: 'long', month: 'long', day: 'numeric' };
  let day= today.toLocaleDateString("en-US", options);

  res.render('list',{typeOfList: day ,newListItems: items});

});

app.get("/work", function(req,res){
  res.render('list',{typeOfList: "work list" ,newListItems: workitems});
})

app.post("/", function(req,res) {
let item= req.body.newItem;

if(req.body.list=== 'work'){
  workitems.push(item);
  res.redirect("/work");
}
else{
  items.push(item);
  res.redirect("/");
}

});





app.listen(3000, function() {
  console.log("Server started on port 3000.");
});
