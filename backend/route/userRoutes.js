const express = require('express');
const router = express.Router()


const userModel = require('../model/userModel');
module.exports = router;

//Get all Users
router.get('/', async (req, res) => {
    try{
        const data = await userModel.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Get User by ID 
router.get('/:id', async (req, res) => {
    try{
        const data = await userModel.findById(req.params.id);
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Update User by ID
router.patch('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await userModel.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Create new User
router.post('/', async (req, res) => {
    
    const data = new userModel({
        name: req.body.name,
        lastName: req.body.lastName,
        dateOfBirth: new Date(req.body.dateOfBirth).toString(),
        location: req.body.location,
    })

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})

//delete  User
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const user = await userModel.findByIdAndDelete(id);
        res.send(user);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});
  