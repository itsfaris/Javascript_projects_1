import express from 'express'
import bodyParser from 'body-parser'


class BlogFunc {
    constructor(title, id, content) {
        this.title = title,
            this.id = id,
            this.content = content
    }
}

var blogs=[{"title":"My first blog", "id":1,"content":"sasd"},{"title":"My second Blog","id":2,"content":"asdasdasd"}]

blogs.push(new BlogFunc("Title3",3,"some content"))



const app = express()

app.use(express.static("public"))

app.use(bodyParser.urlencoded({extended:true}))




app.get("/",(req,res)=>{
    res.render("home.ejs",{blogs:blogs})
})


app.get("/write",(req,res)=>{
    res.render("write.ejs")
})

app.get("/about",(req,res)=>{
    res.render("about.ejs")
})


app.get("/blog/:index",(req,res)=>{
    console.log(req.params.index)
    let index = req.params.index-1
    res.render("blog.ejs",{title:blogs[index]["title"],content:blogs[index]["content"]})
})


app.post("/blog",(req,res)=>{
    console.log(req.body)
    let numOfpost = blogs.length
    blogs.push(new BlogFunc(req.body.title,numOfpost,req.body.content))
    res.redirect("/")
})

app.get("/contact",(req,res)=>{
    res.render("contact.ejs")
})

app.get("/search",(req,res)=>{
    console.log(req.query.query)
    console.log(typeof req.query.query)
    const search_string = req.query.query.toLowerCase()
    console.log(search_string)
    let search_resullt = blogs.filter(blog=>blog.title.toLowerCase().includes(search_string)||
                                        blog.content.toLowerCase().includes(search_string))

    if (search_resullt.length > 0){
    res.render("home.ejs",{blogs:search_resullt})
    }
    else{
        res.render("home.ejs",{blogs:{"nomatch":1}})
    }
})

app.listen(3000,()=>{
    console.log("up")
})

