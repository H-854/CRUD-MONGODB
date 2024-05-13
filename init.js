const mongoose = require("mongoose");
const Chat = require("./models/chat.js");

main()
.then(()=>{
    console.log("Connection Established");
})
.catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/chatguru');
}  

Chat.insertMany([
    {
        from: "user1",
        to: "user2",
        message: "Hello, how are you?",
        createdAt: "2024-05-12T08:30:00Z"
    },
    {
        from: "user2",
        to: "user1",
        message: "I'm doing well, thank you!",
        createdAt: "2024-05-12T08:35:00Z"
    },
    {
        from: "user1",
        to: "user2",
        message: "That's great to hear!",
        createdAt: "2024-05-12T08:40:00Z"
    },
    {
        from: "user2",
        to: "user1",
        message: "Do you have any plans for the weekend?",
        createdAt: "2024-05-12T08:45:00Z"
    },
    {
        from: "user1",
        to: "user2",
        message: "Not really, just relaxing at home. What about you?",
        createdAt: "2024-05-12T08:50:00Z"
      },
      {
        from: "user2",
        to: "user1",
        message: "I'm thinking of going hiking. The weather should be nice.",
        createdAt: "2024-05-12T08:55:00Z"
      }
  ])
