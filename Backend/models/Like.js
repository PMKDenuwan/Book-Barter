const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = require('./User');
const Post = require('./Post');

// Define the Like model
const Like = sequelize.define('Like', {}, { timestamps: true });

// Set up M:N relationship between User and Post through Like
User.belongsToMany(Post, { through: Like, as: 'LikedPosts', foreignKey: 'userId' });
Post.belongsToMany(User, { through: Like, as: 'Likes', foreignKey: 'postId' });

module.exports = Like;
