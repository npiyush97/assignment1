const express = require('express')
const app = express()
const db = require('nedb')
const port = process.env.PORT || 3000
app.listen(port,()=>`Running on port:${port}'`)
app.use(express.static('public'))
app.use(express.json())

let database = new db('relation.db')
database.loadDatabase()

app.get('/person',(req,res)=>{
   database.find({},(err,data)=>{
    if(err){
        console.log(err)
    }
    res.send(data)
   })     
})

app.get('/relation',(req,res)=>{
    database.find({},(err,data)=>{
     if(err){
         console.log(err)
     }
     res.json(data)
    })     
 })
 

app.post('/relation',(request,response)=>{
    let {select1,select2} = request.body
    database.find({name:select1},(err,data)=>{
        if(err){
            console.log(err)
        }
        if(data[0].friend){
            if(data[0].friend.includes(select2)){
                response.json({status:"already have relation"})
            }    
            else{
                database.update({name:select1},{$push:{friend:select2}})
                database.update({name:select2},{$push:{friend:select1}})
                response.json({status:"success"})                
            }
        }
        else{
            database.update({name:select1},{$push:{friend:select2}})
            response.json({status:"success"})
        }
    })
})

app.post('/person',(request,response)=>{
    let data = request.body
    let name = data.name
    database.insert({name})
    response.json({
        status:"Success"
    })
})
