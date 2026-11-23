const express=require("express");
const app=express();
const path=require("path");
const method=require("method-override");
const mysql=require("mysql2");
const port=8080;
 
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(method("_method"));
app.use(express.static(path.join(__dirname,"Public")))
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"Ejs"))

const connection=mysql.createConnection({
    host:"localhost",
    user:"root",
    database:"users",
    password:"Pass@04"
})

app.get("/fetch",(req,res)=>{
    try{
let q='select * from languages'
connection.query(q,(err,result)=>{
res.render("fetch.ejs",{result})
})
}
catch(ex){
    console.log("somthing went wrong");
}
})

app.post("/fetch",(req,res)=>{

    const {word}=req.body;
    let q=`insert into languages(word) values(?)`
    connection.query(q,[word],(err,result)=>{
        res.redirect("/fetch");
    })
})

app.delete("/fetch/:id",(req,res)=>{
    const {id}=req.params;
    let q=`delete from languages where id=${id}`
    connection.query(q,(err,result)=>{
res.redirect("/fetch");
    })
})
    app.get("/update/:id",(req,res)=>{
        const {id}=req.params;
        let q=`select * from languages where id=?`;
        connection.query(q,[id],(err,result)=>{
 res.render("update.ejs",{result:result[0]})
        })
})

app.patch("/fetch/:id",(req,res)=>{
    const {id}=req.params;
    const {word}=req.body;
    let q=`update languages 
    set word= ?
    where id= ?`
    connection.query(q,[word,id],(err,result)=>{
        res.redirect("/fetch");
    })
})

app.listen(port,()=>{
    console.log("server is started");
})
