const express = require('express');
const dotenv = require('dotenv');
const connectToMongo = require('./config/db.js');
const bodyParser = require('body-parser')
const cors = require('cors')
const cookieParser = require('cookie-parser');

dotenv.config();

const app = express();

// Allow requests from the specified origin
let url = process.env.LOCAL_FRONTEND;
if (process.env.IS_DEPLOYED == "true") {
    url = process.env.DEPLOYED_FRONTEND;
}
const corsOptions = {
    // origin: url, // Allow only this origin
    origin: ['http://localhost:4000', url, 'https://accounts.spotify.com'],
    credentials: true,
    optionsSuccessStatus: 200 // Some legacy browsers choke on 204
};

app.use(cookieParser());
app.use(cors(corsOptions));

const PORT = process.env.PORT || 4000;

connectToMongo();

// app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))


// Routes
app.use('/api/auth', require('./routes/auth.js'));
app.use('/api/spotify', require('./routes/spotify.js'));
app.use('/api/lastfm', require('./routes/lastfm.js'));


app.listen(PORT, () => {
    console.log(`Express server running at port ${PORT}`);
});