import  express  from "express";

const  app  = express()

 app.get("/", (req, res)=>{
    res.send("Hello world")
    console.log("hello")

 })

 const PORT  = 5000

 app.listen("PORT", () =>{
    console.log(
        `App running on PORT: ${PORT}`
    )
 } )