const express = require("express");
const dotenv = require("dotenv");
const { connectToDatabase } = require("../config/db");
const bookingRoutes = require("./routes/booking.routes");
const seatTypeRoutes = require("./routes/seatType.routes");
const {runasync} = require("./models/index");

dotenv.config();

const app = express();
const port = process.env.PORT;
app.use(express.json())

connectToDatabase();

app.use("/booking",bookingRoutes)
app.use("/seat-type",seatTypeRoutes)


// const ifEmailAlreadyExists = (email,data) => {
//     return data.find(item => item.email == email);
// }
// const findById = (id,data) => {
//     return data.find(item => item.id == id);
// }
// const trimFields = (field) => {
//     return field ? field.trim() : "";
// }

// const errorMessages = {
//     fieldsRequired : "name and email are required",
//     emailAlreadyExists : "email already exists",
//     recordNotFound : "record not found"
// }

// const successMessages = {
//     recordFetched : "record fetched successfully",
//     addedSuccessfully : "added successfully",
//     updatedSuccessfully : "updated successfully using put",
//     deletedSuccessfully : "deleted successfully"
// }

// let dummyData =[];

// // get all
// app.get("/",(req,res) => {
//     return res.json({
//         message : "express server running successfully :)",
//         data : dummyData
//     })
// })

// // get one
// app.get("/:id",(req,res)=>{
//     const {id} = req.params;

//     const data = findById(id,dummyData);

//     if (data) {
//         return res.json({
//             message: successMessages.recordFetched,
//             data 
//         })
//     }
//     else{
//         return res.json({
//             message: errorMessages.recordNotFound
//         })
//     }
// })

// // add one
// app.post("/",(req ,res) => {
//     let {name,email} = req.body;
//     name = name ? name.trim() : "";
//     email = email ? email.trim() : "";
//     if(!name || !email){
//         return res.json({
//             message : errorMessages.fieldsRequired
//         })
//     }
//     if(ifEmailAlreadyExists(email,dummyData)){
//         return res.json({
//             message : errorMessages.emailAlreadyExists
//         })
//     }
//     const id = dummyData[dummyData.length - 1] ? dummyData[dummyData.length - 1].id + 1 : 1;

//     dummyData.push({
//         id ,
//         name :name,
//         email :email
//     });

//     return res.json({
//         message : successMessages.addedSuccessfully,
//         data : dummyData
//     })
// })

// app.put("/:id",(req,res) => {
//     const {id} = req.params;
//     let {name,email} = req.body;

//     name = trimFields(name);
//     email = trimFields(email);

//     const data = findById(id,dummyData);

//     if(!data){
//         return res.json({
//             message : errorMessages.recordNotFound
//         })
//     }
//     if(data.email == email){
//         return res.json({
//             message : errorMessages.emailAlreadyExists
//         })
//     }

//     if(name && name.length > 0)
//         data.name = name;
//     if(email && email.length > 0)
//         data.email = email;
    
//     return res.json({
//         message : successMessages.updatedSuccessfully,
//         data : dummyData
//     })
// })

// app.delete("/:id",(req,res) => {
//     const {id} = req.params;
//     const data = findById(id,dummyData);
//     if(!data){
//         return res.json({
//             message : errorMessages.recordNotFound
//         })
//     }
//     dummyData = dummyData.filter(item => item.id != id)
//     return res.json({
//         message : successMessages.deletedSuccessfully,
//         data: dummyData
//     })
// })

app.listen(port, async () => {
    await runasync();
    console.log(`server running on port ${port}`)
})


// add

// first blacnk Array

// on add API, add in array
// get all all data in array return
// get by id 
// deelted by id,
// update by id, 