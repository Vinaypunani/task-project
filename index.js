const express = require('express')
const path = require('path')
const fs = require('fs')
const { join } = require('path')
const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname,'public')))

app.get('/', (req, res)=>{
    fs.readdir(`./files`,(err,files)=>{
        res.render("index", {files : files})
    })
})

app.get('/file/:name', (req, res)=>{
    fs.readFile(`./files/${req.params.name}`, (err, data)=>{
        res.render("task", {file_name : req.params.name, data : data})
    })
})

app.get('/edit/:filename', (req, res)=>{
    res.render('edit', {filename: req.params.filename});
})

app.post('/edit', (req, res)=>{
    fs.rename(`./files/${req.body.oldtitle}`, `./files/${req.body.newtitle}`, (err)=>{
        res.redirect('/')
    })
})

app.post('/create',(req,res)=>{
    if(req.body.title){
        fs.writeFile(`./files/${req.body.title.split(" ").join("")}.txt`, req.body.details, (err)=>{
            res.redirect('/');
        })
    }else{
        res.redirect('/');
    }
})

app.listen(port)