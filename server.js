//To print a helloworld message by sending a req to server

// var http = require('http'); //import http module
// var module = require("./newModule");
// var url = require('url')
// var fs = require('fs')

// http.createServer((req,res)=>{
    // //res.write(req.url)// to pass the parameter from the url
    // var queryObj = url.parse(req.url, true).query;
    // //console.log({queryObj})
    // var add = module.add(parseInt(queryObj.a),parseInt(queryObj.b));
    // var sub = module.sub(parseInt(queryObj.a),parseInt(queryObj.b));
    // var mul = module.mul(parseInt(queryObj.a),parseInt(queryObj.b));
    // var div = module.div(parseInt(queryObj.a),parseInt(queryObj.b));
    // res.write("Sum:"+String(add)+"\n")
    // res.write("Diff:"+String(sub)+"\n")
    // res.write("Mul:"+String(mul)+"\n")
    // res.write("Div:"+String(div)+"\n")//to print sum of 2 numbers

    /*===== For read =====*/
    /*fs.readFile("demo.html",(err,data)=>{
        res.write(data)
        res.end()//end() method is used to end the response and send the data to the client
    })*/


    /* ===== For write ===== */ 
//     data = "Welcome to KIT"
//     fs.writeFile("test.txt",data,function(err){
//         console.log(err)
//     });
//     /* ===== To append a new one ===== */
//     fs,fs.appendFile("test.txt","Appended new data",(err)=>{
//         if(err) throw err;
//     });
//     /* ===== To delete ===== */
//     fs.unlink("test2.txt",()=>{
//         console.log("file deleted");
//     });
//     res.end();
// }).listen(8080 ,  () =>{
//     console.log("Server Started...")
// })

var express = require('express') // import express
var cors = require('cors')
var app = express();
app.use(cors());
const mongoose = require('mongoose');
mongoose
.connect('mongodb+srv://Preethi:Sl7w70g8SGW4Su1v@cluster0.pppeqsv.mongodb.net/ExpenseTracker')
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

/*app.put('/update/:index', (req, res) => {
    let index = req.params.index;
    let newName = req.body.name;
    
    if (index < 0 || index >= arr.length) {
        res.status(400).send('Invalid index');
    } else {
        arr[index].name = newName;
        console.log(arr)
        res.send(`Name at index ${index} updated to ${newName}`);
    }
});*/

app.put('/api/:id', async(req, res) => {
    let _id = req.params.id;
    console.log(_id);
    const itemToUpdate = await Expenses.findByIdAndUpdate(_id,req.body);
    if(!itemToUpdate) return res.status(404).send("not found");
    res.send("modified")
});


/*app.delete('/delete/:index', (req, res) => {
    let index = req.params.index;
    
    if (index < 0 || index >= arr.length) {
        res.status(400).send('Invalid index');
    } else {
        arr.splice(index, 1); // Remove element at the specified index
        res.send(`Name at index ${index} deleted`);
    }
});
*/


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