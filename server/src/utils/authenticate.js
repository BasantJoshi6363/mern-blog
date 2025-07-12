import jwt from "jsonwebtoken"
const authenticate = async(req,res,next)=>{
try {
    const token = req.headers.authorization;
    let user = jwt.verify(token,"thisissecret");
    req.user = user;
    next()
} catch (error) {
    return res.status(500).json({
        success : false,
        message : error.message
    })
}
}
export default authenticate;