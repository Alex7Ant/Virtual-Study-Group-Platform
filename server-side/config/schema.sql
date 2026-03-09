CREATE DATABASE JustStudy
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

SHOW DATABASES;

USE JustStudy;

-- Users table
CREATE TABLE Users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    isActive BOOLEAN DEFAULT true,
    lastLogin DATETIME,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT chk_username_length CHECK (LENGTH(username) >= 3)
);

-- Study Groups table
CREATE TABLE StudyGroups (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    topic VARCHAR(50) NOT NULL,
    maxMembers INT NOT NULL DEFAULT 10,
    isActive BOOLEAN DEFAULT true,
    createdBy VARCHAR(100) NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (createdBy) REFERENCES Users(username),
    CONSTRAINT chk_name_length CHECK (LENGTH(name) >= 3),
    CONSTRAINT chk_max_members CHECK (maxMembers BETWEEN 2 AND 50)
);

-- Group Members table
CREATE TABLE GroupMembers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    userId INT NOT NULL,
    groupId INT NOT NULL,
    role ENUM('admin', 'member') DEFAULT 'member',
    joinedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES Users(id),
    FOREIGN KEY (groupId) REFERENCES StudyGroups(id)
);

-- Messages table
CREATE TABLE Messages (
    id INT PRIMARY KEY AUTO_INCREMENT,
    content TEXT NOT NULL,
    senderId INT NOT NULL,
    groupId INT NOT NULL,
    type ENUM('text', 'file', 'image') DEFAULT 'text',
    fileUrl VARCHAR(255),
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (senderId) REFERENCES Users(id),
    FOREIGN KEY (groupId) REFERENCES StudyGroups(id),
    INDEX idx_groupId (groupId),
    INDEX idx_senderId (senderId)
);