const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userModel = require("./Model/userSchema");
const PORT = 5
const app = express();
const BASE_URL = `mongodb+srv://talha185133:StCKt4Fi5qk4T8h5@cluster0.nvzkt0f.mongodb.net/USER_DATA`
mongoose.connect(BASE_URL)

    .then((res) => console.log("Mongoose Connected"))
    .catch((err) => console.log("Mongoose Not Connected"))

app.use(cors());
app.use(express.json())

app.get('/api/check', (req, res) => {
    res.send("All Good");
})
// app.get('/api/user',(req,res)=>{
//     res.send("ok")
// })

const DB = [
    {
        id: 1,
        name: "talha",
        Course: "developer"
    },
    {
        id: 2,
        name: "ali",
        Course: "developer"
    },
    {
        id: 3,
        name: "saad",
        Course: "developer"
    },
]


// app.post('/api/user', (req, res) => {
//     const body = req.body
//     console.log("Body ", body);

//     res.json({
//         name: "Talha",
//         email: "talha18513@gmail.com",
//         data: body
//     })
// })

// app.get("/api/user/:name", (req, res) => {

//     // console.log(name);

//     let { name } = req.params
//     name = name.toLowerCase();
//     const DBFilyer = DB.filter((user) => {
//         return user.name === name
//     })
//     console.log(DBFilyer);

//     if (DBFilyer.length > 0) {
//         res.json({
//             status: true,
//             message: "Successfully",
//             user: { ...DBFilyer[0] }
//         })
//     } else {
//         res.json({
//             status: false,
//             message: "False",
//             // user: { ...DBFilyer[0] }
//         })
//     }


// })

app.get("/api/users", (req, res) => {
    let { name } = req.query;
    console.log(name);
    name = name.toLowerCase();
    const DBFilyer = DB.filter((user) => {
        return user.name === name
    })
    console.log(DBFilyer);

    if (DBFilyer.length > 0) {
        res.json({
            status: true,
            message: "Successfully",
            user: { ...DBFilyer[0] }
        })
    } else {
        res.json({
            status: false,
            message: "False",
            // user: { ...DBFilyer[0] }
        })
    }
})

// put

app.put("/api/user/:name", (req, res) => {
    let { name } = req.params;
    name = name.toLowerCase()

    const filterRsponse = DB.filter((user) => user.name === name)
    filterRsponse[0]['Course'] = "MERN"
    res.json({
        status: true,
        Mesasge: "All okay",
        user: { ...filterRsponse[0] }
    })
    console.log(filterRsponse);

})

// ===========CURD API post

app.post("/api/user", (req, res) => {
    const { name, email, password, mobile } = req.body;
    if (!name || !email || !password || !mobile) {
        res.json({
            Message: "Required fields are missing "
        })
        return
    }


    // send data on DB

    const objToSend = {
        name,
        email,
        password,
        phone: mobile
    }
    console.log(objToSend);

    userModel.create(objToSend)
        .then((response) => {
            res.json({
                status: true,
                message: "Data Added",
                data: response
            })
            console.log("response ", response);
        })
        .catch((err) => {
            res.json({
                status: false,
                message: "Internal Sserver Error",
            })
            console.log("err ", err);
        })
})

// =======get
/*
    find,
    findOne,
    findById
*/


// for all Data

app.get("/api/user", (req, res) => {
    const findQuery = {}

    userModel.find(findQuery)
        .then((response) => {
            console.log("response ", response);
            res.json({
                status: true,
                message: "Data Added",
                data: response
            })
        })
        .catch((err) => {
            res.json({
                status: false,
                message: "Internal Sserver Error",
            })
            console.log("err ", err);
        })
})



// app.get("/api/user", (req, res) => {
//     const findQuery = {
//         phone:3152666263
//     }
//     userModel.find(findQuery)
//         .then((response) => {
//             console.log("response ", response);
//             res.json({
//                 status: true,
//                 message: "Data Added",
//                 data: response
//             })
//         })
//         .catch((err) => {
//             res.json({
//                 status: false,
//                 message: "Internal Sserver Error",
//             })
//             console.log("err ", err);
//         })
// })



// app.get("/api/user", (req, res) => {
//     const findQuery = {
//         name:"saad",
//         password:"12345"
//     }
//     userModel.find(findQuery)
//         .then((response) => {
//             console.log("response ", response);
//             res.json({
//                 status: true,
//                 message: "Data Added",
//                 data: response
//             })
//         })
//         .catch((err) => {
//             res.json({
//                 status: false,
//                 message: "Internal Sserver Error",
//             })
//             console.log("err ", err);
//         })
// })

// for specific record

// app.get("/api/user/:id", (req, res) => {

//     const {id} = req.params
//     // console.log(query);
    
//     const findQuery = {
//         _id:id
//     }
//     userModel.findOne(findQuery)
//         .then((response) => {
//             console.log("response ", response);
//             res.json({
//                 status: true,
//                 message: "Data Added",
//                 data: response
//             })
//         })
//         .catch((err) => {
//             res.json({
//                 status: false,
//                 message: "Internal Sserver Error",
//             })
//             console.log("err ", err);
//         })
// })

// for unique record (only find through id otherwise error)


app.get("/api/user/:id", (req, res) => {

    const {id} = req.params
    // console.log(query);
    
    const findQuery = {
        _id:id
    }
    userModel.findById(findQuery)
        .then((response) => {
            console.log("response ", response);
            res.json({
                status: true,
                message: "Data Added",
                data: response
            })
        })
        .catch((err) => {
            res.json({
                status: false,
                message: "Internal Sserver Error",
            })
            console.log("err ", err);
        })
})

// put is use to update specific data ({kiss ko update karna hai}findById,  {kiss say update karna hai} update)

app.put("/api/user",(req,res)=>{
    const {id,...updatedData}= req.body;
    console.log(id ,"id");
    // console.log(data ,"data");
    userModel.findByIdAndUpdate(id,updatedData,{new:true}) // for updated data new true (optional)
    .then((response) => {
        console.log("response ", response);
        res.json({
            status: true,
            message: "Data Added",
            data: response
        })
    })
    .catch((err) => {
        res.json({
            status: false,
            message: "Internal Sserver Error",
        })
    })
})


// delete
// findByIdAndDelete (only through id)

app.delete("/api/user/:id",(req,res)=>{
    const {id} = req.params
    if(!id){
        res.json({
            message:"ID is required"
        })
        return
    }

    userModel.findByIdAndDelete(id)
    .then((response) => {
        console.log("response ", response);
        res.json({
            status: true,
            message: "Data Deleted",
            data: response
        })
    })
    .catch((err) => {
        res.json({
            status: false,
            message: "Internal Sserver Error",
        })
    })


})


app.listen(PORT, () => console.log(`Your server is running on a localhost ${PORT}`))