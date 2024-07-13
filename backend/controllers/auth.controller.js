const User = require('../models/User');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

const userSignup = async (req, res) => {
    // console.log(req);
    console.log('request has reached userSignup')
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            console.log('some detail is not recieved in userSignup controller');
            res.status(400).json({ message: 'Not sufficient details to signup the user' });
            return;
        }
        let oldUser = await User.findOne({ Email: email });
        if (oldUser) {
            console.log('A user is found with provided email in Signup User controller')
            res.status(400).json({ message: 'Email already Exisits' });
            return;
        }

        const saltRounds = 8;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashedPassword = bcrypt.hashSync(password, salt);

        const user = new User({
            Name: name,
            Email: email,
            Password: hashedPassword
        })
        await user.save();

        res.status(200).json({ success: true, message: "User is successfully signed up" });
    } catch (err) {
        console.log('Error catched in userSignup in controllers');
        console.log('error: ', err);
        res.status(500).json({ message: 'Internal Server Error...', error: err });
    }
}

const userLogin = async (req, res) => {
    console.log("request has reached userLogin");
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            console.log('some detail is not recieved in userLogin controller');
            res.status(400).json({ message: 'Not sufficient details to login the user' });
            return;
        }

        const user = await User.findOne({ Email: email });
        if (!user) {
            console.log('No user is found with provided email in Login user controller');
            res.status(404).json({ message: "Authentication Failed" });
            return;
        }

        const passwordMatched = await bcrypt.compare(password, user.Password);
        if (!passwordMatched) {
            console.log("password doesn't match in Login user controller");
            res.status(404).json({ message: "Authentication Failed" });
            return;
        }

        const userId = user._id;

        var token = jwt.sign({ userId: userId }, process.env.SIGNATURE, { expiresIn: '2h' });

        res.status(200).json({ success: true, message: "user is successfully logged in..", authToken: token });
    } catch (err) {
        console.log('Error catched in userLogin in controllers');
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error...', error: err });
    }
}

module.exports = { userSignup, userLogin }