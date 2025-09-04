const { default: mongoose } = require("mongoose");

const userSchema = mongoose.Schema({
    username:String,
    email:String,
    password:String,
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
}, {
    timestamps: true
});

const User = mongoose.model('user',userSchema);

module.exports = User;