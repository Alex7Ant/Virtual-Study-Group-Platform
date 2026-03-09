const User = require('./User');
const StudyGroup = require('./StudyGroup');
const GroupMember = require('./GroupMember');
const Message = require('./Message');

// Define relationships
User.belongsToMany(StudyGroup, {
    through: GroupMember,
    foreignKey: 'userId',
    as: 'groups'
});

StudyGroup.belongsToMany(User, {
    through: GroupMember,
    foreignKey: 'groupId',
    as: 'members'
});

StudyGroup.belongsTo(User, {
    foreignKey: 'createdBy',
    as: 'creator'
});

Message.belongsTo(User, {
    foreignKey: 'senderId',
    as: 'sender'
});

Message.belongsTo(StudyGroup, {
    foreignKey: 'groupId',
    as: 'group'
});

module.exports = {
    User,
    StudyGroup,
    GroupMember,
    Message
}; 