const express = require('express');
const router = express.Router()
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs"); 
const userModel = require('../model/userModel');


// another name for router in each routes file?
module.exports = router;


//register method 
router.post('/register', async (req, res) => {
    const { error } = userModel.validate(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(req.body.password, salt)
    const data = new userModel({
        username: req.body.username,
        password: hashPassword,
        email: req.body.email,

    })
    let user = await userModel.findOne({ email: req.body.email })
    if (user) {
        return res.status(400).send('User already exisits. Please sign in')
    } else {
        try {
            const dataToSave = await data.save();
            res.status(200).json(dataToSave)
        }
        catch (error) {
            res.status(400).json({message: error.message})
        }
    }

})

//login method
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Authentication failed' });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Authentication failed' });
        }
        // Generate a JWT token
        const token = jwt.sign({ userId: user._id }, 'secretKey', { expiresIn: '3h', });
            
        res.status(200).json({ token });

    }
    catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'An error occurred while logging in' });
    }
    

})

//change password method
router.post('/newPassword', async (req, res) => {
    const {email, oldPassword, newPassword, repeatPassword}=req.body;

    if(newPassword.length < 3){
        return res.status(401).json({ error: 'Password need to have minimum 3 characters ' });
        
    }
    if (newPassword!== repeatPassword){
        return res.status(401).json({ error: 'Password is not match.' });
    
    }
    if(newPassword == repeatPassword && newPassword.length>3) {
        try {
            const user = await userModel.findOne({ email });
            if (!user) {
                return res.status(400).send('User does not exisits.') 
            }
            const passwordMatch = await bcrypt.compare(oldPassword, user.password);
            if (!passwordMatch) {
                return res.status(401).json({ error: 'Authentication failed, wrong password' });
            }
            let hashedNewPassword = await bcrypt.hash(newPassword,10);

            let update_success;
            const isNewOldPasswordMatch = await bcrypt.compare(newPassword, user.password);

            if(!isNewOldPasswordMatch) {
                update_success = await userModel.updateOne({_id:user._id},{password:hashedNewPassword});
            } else {
                return res.status(401).json({ error: 'New password should not be the same as old password.' });

            }
            if(update_success){
                res.send(user)
            }
        }
        catch (error) {
            console.log(error)
        }
    } 
})

//lost password method
router.post('/lostPassword', async (req, res) => {
    const { email }=req.body;

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).send('User does not exisits.') 
        }

        const generatedPass =(Math.random() + 1).toString(36).substring(7);
        const hashedNewPassword = await bcrypt.hash(generatedPass,10);

        const  update_success = await userModel.updateOne({_id:user._id},{password:hashedNewPassword});

        if(update_success){
            res.send({user, newPassword: generatedPass})
        } else {
            return res.status(401).json({ error: 'Password updating failed' });
        }
    }
    catch (error) {
        console.log(error)
    }
})

