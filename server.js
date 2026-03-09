// Import modules 
const express = import('express');
const cors = import('cors');
const http = import('http');
const socketIO = import('socket.io');
const { connectDB } = import('./server-side/config/db.js');
const Message = import('./models/Message');
require('dotenv').config();

// Import routes 
const authRoutes = import('./routes/auth');
const groupRoutes = import('./routes/groups');
const messageRoutes = import('./routes/messages');
const testRoutes = import('./routes/test');

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
    cors: {
        origin: "http://localhost:5500",
        methods: ["GET", "POST"]
    }
});

// Middleware 
app.use(cors());
app.use(express.json());

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Routes 
app.use('/api/auth', authRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/test', testRoutes);


// Socket.IO connection handling 
io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('join_group', (groupId) => {
        socket.join(`group_${groupId}`);
        console.log(`User ${socket.id} joined group ${groupId}`);
    });

    socket.on('leave_group', (groupId) => {
        socket.leave(`group_${groupId}`);
        console.log(`User ${socket.id} left group ${groupId}`);
    });

    socket.on('send_message', async (messageData) => {
        try {
            const { groupId, content, senderId } = messageData;
            
            // Save message to database using Sequelize
            const message = await Message.create({
                content,
                senderId,
                groupId
            });

            // Broadcast message to all users in the group
            io.to(`group_${groupId}`).emit('receive_message', {
                id: message.id,
                content: message.content,
                senderId: message.senderId,
                groupId: message.groupId,
                createdAt: message.createdAt
            });
        } catch (error) {
            console.error('Error sending message:', error);
            socket.emit('message_error', { error: 'Failed to send message' });
        }
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

// Server startup
const PORT = process.env.PORT || 5500;

async function startServer() {
    try {
        await connectDB();
        
        server.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}

// Handle server shutdown gracefully
process.on('SIGTERM', async () => {
    console.log('Received SIGTERM. Shutting down gracefully...');
    await sequelize.close();
    server.close(() => {
        console.log('Server closed');
        process.exit(0);
    });
});

startServer();

module.exports = server;
