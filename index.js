const express = require("express")
const mongoose= require("mongoose")
const cors = require("cors")
const userRoutes = require("./routes/user.routes")
const filmsRoutes = require("./routes/film.routes")

require("dotenv").config();
const app = express()

const port = process.env.PORT || 3000;
const host = process.env.HOST;

var corsOptions = {
    origin: host,
    methods: 'GET,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

app.use(express.json())

app.set("secretKey", process.env.JWTSECRET)


mongoose.connect(process.env.conectStream)
.then(() =>{
    console.log('Conexión con base de datos exitosa')
})
.catch((err)=>{
    console.log(err,"Error al conectar con base de datos")
})


app.use("/api/users", userRoutes)
app.use("/api/films", filmsRoutes)

app.listen(port, () =>{
    console.log(`API funcionando en puerto ${port}`)
})
