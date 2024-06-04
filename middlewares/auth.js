//auth , isStudent , isAdmin

const jwt  = require('jsonwebtoken');
require('dotenv').config();


exports.auth = (req,res,next) => {
    try {
        //token extract jwt
        const token = req.body.token;

        if(!token){
            return res.status(401).json(
                {
                    success:false,
                    message:"token missing",
                }
            )
        }

        //verify token 
        try {
            const decode = jwt.verify(token , process.env.JWT_SECRET);
            console.log("decoded token -> ",decode);

            req.user = decode;

        } catch (error) {
            console.log(error);
            return res.status(401).json({
                success:false,
                message:"token is invalid",
            })
        }

        next();

    } catch (error) {
        return res.status(401).json(
            {
                success:false,
                message:"something went wring while verifying jwt token "
            }
        )
    }
}


exports.isStudent = (req,res,next) => {
    try {

        // console.log(req.user.role)
        if(req.user.role !== "Student"){
            return res.status(401).json(
                {
                    success:false,
                    message:"this is protected route for student "
                }
            )
        }

        next();

    } catch (error) {
        return res.status(500).json(
            {
                success:false,
                message:"user role cannot be varified"
            }
        )
    }

}

exports.isAdmin = (req,res,next) => {
    try {

        if(req.user.role !== "Admin"){
            return res.status(401).json(
                {
                    success:false,
                    message:"this is protected route for student "
                }
            )
        }

        next();

    } catch (error) {
        return res.status(500).json(
            {
                success:false,
                message:"user role cannot be varified"
            }
        )
    }

}