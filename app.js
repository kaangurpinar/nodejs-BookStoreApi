const express = require('express');
require('dotenv').config();
const session = require('express-session');
const auth = require("./middlewares/auth");
const bookRouter = require("./routers/bookRouter");
const genreRouter = require("./routers/genreRouter");
const userRouter = require("./routers/userRouter");
const adminRouter = require("./routers/adminRouter");

const app = express();
const port = 3999;

app.use(express.json());
app.use(session({ secret: process.env.SESSION_SECRET_KEY, resave: false, saveUninitialized: true, cookie: { maxAge: 60000 }}));

app.get('/', auth, (req, res) => {
    res.send('book store');
});

app.use("/api", bookRouter);
app.use("/api", genreRouter);
app.use(userRouter);
app.use(adminRouter);

app.get("*", (req, res) => {
    res.status(404).send({ error: "an error occured." });
});

app.listen(port, () => {});