const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const StudyGroup = sequelize.define('StudyGroup', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    topic: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    maxMembers: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 10
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    createdBy: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'StudyGroups',
    timestamps: true,
    freezeTableName: true
});

module.exports = StudyGroup;