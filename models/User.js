const { Schema, model } = require('mongoose');
const dateFormatting = require('../utils/dateFormat');

const UserSchema = new Schema(
    {
        username: {
            type: String,
            trim: true,
            unique: true,
            required: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
            match: [
                /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, "Does not match any e-mail on file :("
            ]
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
              }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false
    }
);

UserSchema.virtual('friendCount').
    get(function() {
        return this.friends.length;
    });

const User = model('User', UserSchema);

module.exports = User;