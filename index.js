const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path")
const Chat = require("./models/chat.js");
const methodOverride = require('method-override');

app.set("view engine","ejs");
app.set("views", path.join(__dirname,"/views"));


app.use(express.json()) // for json
app.use(express.urlencoded({ extended: true })) // for form data
app.use(methodOverride('_method'));

main()
.then(()=>{
    console.log("Connection Established");
})
.catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/chatguru');
}  

const port = 8080;

app.listen(port,()=>{
    console.log("Server listening to port : ",port);
})
app.get("/",(req,res)=>{
    res.send("working");
})

//INDEX ROUTE
app.get("/chats", async (req,res)=>{
    let chats = await Chat.find();
    res.render("index.ejs",{ chats });
})
app.get("/chats/new", (req,res)=>{
    res.render("new.ejs");
})
app.post("/chats",(req,res)=>{
    let { from, message, to } = req.body;
    let newChat = new Chat({
        from: from,
        to: to,
        message: message,
        createdAt: new Date()
    })
    newChat.save().then((r)=>{
        console.log(r);
    })
    .catch((e)=>{
        console.log(e);
    })
    res.redirect("/chats");
})

app.get("/chats/:id/edit",async (req,res)=>{
    let { id } = req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs",{ chat });
})

app.put("/chats/:id",async (req,res)=>{
    let { id } = req.params;
    let { message} = req.body;
    Chat.findOneAndUpdate({_id: id},{message: message},{runValidators: true, new: true})
    res.redirect("/chats");
})

app.delete("/chats/:id",async (req,res)=>{
    let { id } = req.params;
    await Chat.findOneAndDelete({_id: id})
    res.redirect("/chats");
})