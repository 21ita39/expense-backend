
var express = require('express') // import express
var cors = require('cors')
var app = express();
app.use(cors());
const mongoose = require('mongoose');
mongoose
// .connect('mongodb+srv://Preethi:Sl7w70g8SGW4Su1v@cluster0.pppeqsv.mongodb.net/ExpenseTracker')
.connect('mongodb+srv://Preethi:OkIUwbMDUfqgawz3@cluster0.pppeqsv.mongodb.net/ExpenseTracker')
.then(()=>console.log("Connected to MongoDB"));

const expenseschema = new mongoose.Schema({
    date: {type:String, required:true},
    category: {type:String, required:true},
    amount: {type:Number, required:true},
});
let Expenses = mongoose.model("Expenses", expenseschema);
app.use(express.json())
var arr = [{name:"Preethi"},{name:"Sandhiya"}];
app.get("/api",async (req,res)=>{
    const Expense = await Expenses.find();
    res.json(Expense);
});

app.post('/api',(req,res)=>{
    const {date,category,amount} = req.body;
    const newItem = new Expenses({date : new Date().toLocaleDateString(),category,amount});
    newItem.save();
    res.status(200).json(newItem)
});


app.put('/api/:id', async(req, res) => {
    let _id = req.params.id;
    console.log(_id);
    const itemToUpdate = await Expenses.findByIdAndUpdate(_id,req.body);
    if(!itemToUpdate) return res.status(404).send("not found");
    res.send("modified")
});


app.delete('/api/:id', async (req, res) => {
        let _id = req.params.id;
        // console.log(_id);
        const deletedItem = await Expenses.findByIdAndDelete(_id);

        if (!deletedItem) return res.status(404).send("not found");
        res.send("deleted");  
});
app.listen(3001, ()=>{
    console.log('Server is running on port 3001');
})