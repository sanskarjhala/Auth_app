const express =require('express');
const router = express.Router();

const { login , signup} = require('../controllers/Auth');
const  {auth , isStudent , isAdmin} = require("../middlewares/auth");
const { isValidObjectId } = require('mongoose');


router.post('/login' , login);
router.post('/signup' , signup);


router.get('/test' , auth, (req, res) => {
    res.json(
        {
            success:true,
            message:"welcome to trresting route"
        }
    )
})


//protected 
router.get('/students',auth , isStudent , (req, res) => {
    res.json(
        {
            success:true,
            message:"welcome to student route"
        }
    )
})

router.get('/admin' , auth , isAdmin,(req, res) => {
    res.json(
        {
            success:true,
            message:"welcome to Admin route"
        }
    )
})


module.exports = router;