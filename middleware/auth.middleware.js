const jwt = require("jsonwebtoken")
const User = require("../models/user.model")
require("dotenv").config();

async function isAuthenticated(req, res, next) {
  try {
    const token = req.query.token;
    if (!token) {
      return res.status(401).json({ msg: "no estás autenticado" });
    } else {
      const tokenDecoded = jwt.verify(token, process.env.JWTSECRET);
      const userId = tokenDecoded.userId;
      console.log(tokenDecoded);
      const foundUser = await User.findById(userId);
      if (!foundUser) {
        return res.status(401).json({ msg: "token no valido" });
      } else {
        next();
      }
    }
  } catch (error) {
    res.status(500).json({ msg: "error interno del servidor", error});
  }
}

async function isAdmin(req, res, next){
    const token = req.query.token
    if(!token){
        return res.status(401).json({msg: "no estás autenticado"})
    } else {
        const tokenDecoded = jwt.verify(token, process.env.JWTSECRET)
        const userId = tokenDecoded.userId
        const foundUser = await User.findById(userId)
        if(!foundUser){
           return res.status(401).json({msg: "token no valido"})
        } else{
            if(foundUser.role === "admin" || foundUser.role === "adminPro"){
              next()
            } 
            else {
              return res.status(403).json({msg: "no eres admin"})
            }
        }
    }
}

async function isAdminPro(req, res, next){
    const token = req.query.token
    if(!token){
        return res.status(401).json({msg: "no estás autenticado"})
    } else {
        const tokenDecoded = jwt.verify(token, process.env.JWTSECRET)
        const userId = tokenDecoded.userId
        const foundUser = await User.findById(userId)
        if(!foundUser){
           return res.status(401).json({msg: "token no valido"})
        } else{
            if(foundUser.role !== "adminPro"){
                return res.status(403).json({msg: "no eres un admin con derechos de modificación de base de datos"})

            } else{
                next()
            }
        }
    }
}

module.exports = {
    isAuthenticated,
    isAdmin,
    isAdminPro
}