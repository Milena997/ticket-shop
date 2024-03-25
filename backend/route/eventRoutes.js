const express = require('express');
const router = express.Router()


const eventModel = require('../model/eventModel');
module.exports = router;

//Get all Events
router.get('/', async (req, res) => {
    try{
        const data = await eventModel.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Get Event by ID 
router.get('/:id', async (req, res) => {
    try{
        const data = await eventModel.findById(req.params.id);
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Update Event by ID
router.patch('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await eventModel.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Create new Event
router.post('/', async (req, res) => {
    
    const data = new eventModel({
        eventName: req.body.eventName,
        eventDescription: req.body.eventDescription,
        eventDate: req.body.eventDate,
        eventLocation: req.body.eventLocation,
        eventImage: req.body.eventImage

    })

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})

//delete  Event
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const event = await eventModel.findByIdAndDelete(id);
        res.send(event);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});