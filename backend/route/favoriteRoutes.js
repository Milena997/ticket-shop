const express = require('express');
const router = express.Router()
const passport = require('passport');



const favoriteModel = require('../model/favoriteModel');
const eventModel = require('../model/eventModel');


module.exports = router;

//Get all favorites events for person
router.get('/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const { id } = req.params;

    try{
        const data = await favoriteModel.findOne({ userId: id }).populate('eventIdsList');
        res.send(data);
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Add rfavorite
router.post('/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const { id } = req.params;
    const user = await favoriteModel.findOne({ userId: id });
   

    try{
        if (!user) {
            const data = new favoriteModel({
                userId : id,
                eventIdsList :[...req.body.eventId]
            })
            const dataToSave = await data.save();
            res.status(200).json(dataToSave)
        }
        else {
            if(!user.eventIdsList.includes(req.body.eventId)) {

                const updatedData ={userId: id, eventIdsList: [...user.eventIdsList, req.body.eventId]};
                const options = { new: true };
                const result = await favoriteModel.findByIdAndUpdate(
                    user._id, updatedData, options
                )
                res.send(result)
            }
            res.status(400).json({message: 'event is already in a list'})
        }
        
    }
    catch(error){
        res.status(400).json({message: error.message})
    }
})

//delete  Rate 
router.delete('/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const { id } = req.params;

    const user = await favoriteModel.findOne({ userId: id });

    if (!user) {
        return res.status(401).json({ error: `User doesn't exist` });
    }
  

    try {
        const updatedData ={userId: id, eventIdsList: user.eventIdsList.filter((item) => item !== req.body.eventId)};
        const options = { new: true };
        const result = await favoriteModel.findByIdAndUpdate(
            user._id, updatedData, options
        )
        res.send(result)
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});


