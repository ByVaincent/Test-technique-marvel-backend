const express = require ("express")
const app = express();
const cors = require("cors")

app.use(express.json())
app.use(cors())


//routes imports
const charactersRte = require ("./routes/charactersRoute")
const comicsRte = require("./routes/comicsRoute")

app.get("/", (req, res) => {
    
res.status(200).json("Bienvenue!")
})



app.use(charactersRte)


app.use(comicsRte)




app.all("*", (req, res) => {

res.status(404).json("Not found!")
    
})



app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running!");
    
})