const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const bodyParser = require("body-parser")

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }))



//Connet DB
mongoose.connect(process.env.MONGO_URL)
    .then(() => { console.log("DB connected") })
    .catch((err) => { console.log(err) })

const dicSchema = new mongoose.Schema({
    word: String,
    ipa: String
});
// const { Schema } = mongoose;
// const schema = new Schema();
const Krdictionary = mongoose.model("krdictionary", dicSchema)


app.get("/", (req, res) => {
    let dataUpdate = []
    Krdictionary.find().then((data) => {
            // console.log(data[1]._id)
            res.render("index", ({ mongoDB: data, itemUpate: dataUpdate }))
        }).catch((err) => { console.log(err) })

    
    // Find value by id    
        const idText =  req.query.id
        if(idText != undefined){
            const idTexts = idText.trim()
            Krdictionary.findById(idTexts)
            .then((r)=>{
                dataUpdate = r
                // console.log(r)
            }).catch((e)=>{
                console.log(`Errer is ${e}`)
            })
        }
})




app.post("/", (req,res)=>{
    // const txtIpa = req.body.textIpa
    const id = req.query.id
    if(id != undefined){
     const newId = {_id: id.trim()}
     if(req.body.textIpa.length<0){
        console.log("is smal")
     }else{
        console.log(req.body.textIpa.length)
     }
     
    const updateDoc = {$set:{ipa: req.body.textIpa}}
    
    Krdictionary.updateOne(newId, updateDoc)
    .then((result)=>{console.log(`Data update: ${result.acknowledged}`)})
    .catch((err)=>{console.log(`Update error is ${err}`)})

    }
    
    res.redirect("/")
    
    // console.log(txtIpa)
    // console.log(dataUpdate)
})


const port = process.env.PORT || 2000;
app.listen(port, () => {
    console.log(`port is ${port}`)
})