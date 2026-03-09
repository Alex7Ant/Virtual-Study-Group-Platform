const express = require('express');
const router = express.Router();
const { sequelize } = require('../config/db.config');

// Test database connection
router.get('/test-db', async (req, res) => {
    try {
        // Try to authenticate with the database
        await sequelize.authenticate();
        res.json({ success: true, message: 'Database connection successful' });
    } catch (error) {
        console.error('Database connection failed:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Database connection failed',
            error: error.message 
        });
    }
});

// Test query
router.get('/test-query', async (req, res) => {
    try {
        // Try to execute a simple query
        const [results] = await sequelize.query('SELECT 1 + 1 as result');
        res.json({ 
            success: true, 
            message: 'Query executed successfully',
            result: results[0].result 
        });
    } catch (error) {
        console.error('Query execution failed:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Query execution failed',
            error: error.message 
        });
    }
});

module.exports = router; 