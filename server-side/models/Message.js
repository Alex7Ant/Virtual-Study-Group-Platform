const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const { Sequelize } = require('sequelize');
const config = require('./db.config.js');

const sequelize = new Sequelize('JustStudy', 'root', 'alex@mySql7', {
    host: 'localhost',
    dialect: 'mysql',
    port: '3306',
    logging: false
});


const Message = sequelize.define('Message', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },

    senderId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    groupId: {
        type: DataTypes.INTEGER,
        allowNull: false 
    },

    type: {
        type: DataTypes.ENUM('text', 'file', 'image'),
        defaultValue: 'text'
    },

    fileUrl: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: 'Messages',
    timestamps: true,
    freezeTableName: true,
    indexes: [
        {
            fields: ['groupId']
        },
        {
            fields: ['senderId']
        }
    ]
});

module.exports = Message;