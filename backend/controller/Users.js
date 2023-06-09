import Users from "../models/UserModel.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
 
export const getUser = async(req, res) => {
    try {
        const users = await Users.findAll()
        res.json(users)
    } catch (error) {
        console.log(error)
    }
}

export const Register= async(req, res) => {
    const { name, email, password, confirmpassword} = req.body

    if (password !== confirmpassword) return res.status(400).json({msg:"Password dan Confirm Password tidak cocok"})
    const salt = await bcrypt.genSalt()
    const hashPassword = await bcrypt.hash(password, salt)
    try {
        await Users.create({
            name:name,
            email:email,
            password:hashPassword
        })
        res.json({msg:"Registrasi berhasil"})
    } catch (error) {
        console.log(error)
    }
}

export const Login = async(req, res) =>{
    try {
        const user = await Users.findAll({
            where:{
                email:req.body.email
            }
        })
        const match = await bcrypt.compare(req.body.password, user[0].password )
        if(!match) return res.status(400).json({msg:"Wrong Password"})
        const userId = user[0].id
        const name = user[0].name
        const email = user[0].email
        const accesstoken = jwt.sign({userId, name, email}, process.env.ACCESS_TOKEN_SECRET,{
            expiresIn:"20s"
        })
        const refreshtoken = jwt.sign({userId, name, email}, process.env.REFRESH_TOKEN_SECRET,{
            expiresIn:"1d"
        })
        await Users.update({refresh_token: refreshtoken},{
            where : {
                id : userId
            }
        })
        res.cookie ('refreshToken', refreshtoken,{
            httpOnly : true,
            maxAge : 24 * 60 * 60 * 1000,
            // secure : true         
        })
        res.json({accesstoken})
    } catch (error) {
        res.status(404).json({msg:"Email tidak ditemukan"})
    }
}