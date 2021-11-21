const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const validate = (email) => {
    var expression = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    return expression.test(email)
}

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'please provide your name'],
        maxlength: [20, 'name can\'t exceed 20 characters'],
        uppercase: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, 'password is required'],
        minlength: [6, 'please set-up a password']
    },
    email: {
        type: String,
        required: [true, 'please provide your email'],
        lowercase: true,
        unique: true,
        validate: [validate, 'please provide valid email !']
    }
})

UserSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt(12)
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

UserSchema.methods.getToken = function () {
    return jwt.sign({ id: this._id, email: this.email, name: this.name }, process.env.JWT_SECRET_KEY)
}

UserSchema.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this.password)
}

mongoose.pluralize(null);
module.exports = mongoose.model('users', UserSchema)