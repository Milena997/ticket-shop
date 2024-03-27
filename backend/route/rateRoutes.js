const express = require('express');
const router = express.Router()


const rateModel = require('../model/rateModel');

module.exports = router;

//Get all Rates
router.get('/', async (req, res) => {
    try{
        const data = await rateModel.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Add rate   body: eventid, userid, score
router.post('/', async (req, res) => {

    const data = new rateModel({
            eventId :req.body.eventId,
            userId : req.body.userId,
            reviewScore : req.body.reviewScore
    })

    try{
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch(error){
        res.status(400).json({message: error.message})
    }
})

//delete  Rate 
router.delete('/:id', async (req, res) => {
    const { id } = req.params;


    try {
        const rate = await rateModel.findByIdAndDelete(id);
        res.send(rate);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

//Get averageScore rate score (:id eventId)
router.get('/:eventId', async (req, res) => {
    try {
        const eventId = req.params.eventId;

        const result = await  rateModel.find()
        const eventRatingList = result.filter( rate => rate.eventId === eventId)

        const totalScore = eventRatingList.reduce((total, obj) => total + obj.reviewScore, 0);

       const averageScore = totalScore / eventRatingList.length;

        res.send({averageScore: averageScore})
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//update rate 
router.patch('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await rateModel.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})
