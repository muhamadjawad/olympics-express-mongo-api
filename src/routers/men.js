const express = require('express')
const router = new express.Router()

const MensRanking = require("../models/mens")

// POST 
router.post("/mens", async (req, res, next) => {
    try {
        const body = req.body

        const newRecord = new MensRanking(body)
        const insertMens = await newRecord.save()
        res.status(201).send(insertMens)
    }
    catch (error) {
        next(error)
        // res.status(
        //     400
        // ).send(error)

    }
})

// GET ALL
router.get("/mens", async (req, res) => {

    try {
        const sort = req.body.sort;
        let allMensRecord;
        if (sort) {
            allMensRecord = await MensRanking.find({}).sort({ "ranking": 1 });
        }
        else {
            allMensRecord = await MensRanking.find({})
        }

        res.status(200)
            .send(allMensRecord)

    }
    catch (error) { }
})

// GET ONE
router.get("/mens/:id", async (req, res) => {

    try {
        const _id = req.params.id
        const MenRecord = await MensRanking.findById({
            _id: _id
            // or _id
        });
        res
            .status(200)
            .send(MenRecord)

    }
    catch (error) {
        res.status(400).
            send(error)
    }
})

// UPDATE 
router.patch("/mens/:id", async (req, res) => {

    try {
        const _id = req.params.id
        const body = req.body

        const MenRecord = await MensRanking.findByIdAndUpdate({
            _id
            // or_id: _id
        },
            body,
            { new: true }

        );
        res
            .send(MenRecord)

    }
    catch (error) {
        res.status(500).
            send(error)
    }
})

// DELETE 
router.delete("/mens/:id", async (req, res) => {


    try {
        const _id = req.params.id
        const MenRecord = await MensRanking.findByIdAndDelete({
            _id
            // or_id: _id
        });
        res
            .send(MenRecord)

    }
    catch (error) {
        res.status(500).
            send(error)
    }

})


module.exports = router