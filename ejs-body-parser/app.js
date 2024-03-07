const express = require("express");
const app = express();
const bodyParser = require("body-parser");
// Read file ejs
app.set("view engine", "ejs");
//Get value from body
app.use(bodyParser.urlencoded({extended: true}));
// Read file css and javaScript
app.use(express.static("public"));

let myData = []
app.get("/", (req,res)=>{
    res.render("index",({myTable: myData}));
})
app.get("/:name",(req,res)=>{
    const name = req.params.name;
    res.render("form");
})
app.get("/form", (req, res)=>{
    res.render("form")
})

app.post("/form",(req, res)=>{
    const data = {
        name: req.body.nameValue,
        phones: req.body.numValue
    }
    myData.push(data)
    res.redirect("/form")
})

const port = 2500;
app.listen(port, ()=>{
    console.log("Server runnig port" + port);
})