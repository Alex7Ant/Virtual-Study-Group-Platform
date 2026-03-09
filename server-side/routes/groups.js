 const express = require('express');
 const router = express.Router();
 const StudyGroup = require('../models/StudyGroup');
 const User = require('../models/User');
 const auth = require('../middleware/auth');

 // Create a study group 
 router.post('/', auth, async (req,res) => {
    try {
        const { name, topic, description } = req.body;

        const group = await StudyGroup.create({
            name,
            topic,
            description,
            createdBy: req.user.id
        });

        res.status(201).json(group);
    }

    catch (error){
        res.status(400).json({ error: error.message });
    }
 });

 // Get recommended groups 
 router.get('/recommendations', auth, async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id);
        const userInterests = user.interests;

        const recommendedGroups = await StudyGroup.findAll({
            where: {
                topic: userInterests
            },

            include: [{
                model: User,
                attributes: ['id', 'username']
            }
        ]

        });

        res.json(recommendedGroups)
    }

    catch(error){
        res.status(500).json({ error: error.message });
    }
 });

 module.exports = router; 