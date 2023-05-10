import express from 'express';
import cors from 'cors';
import session, { Cookie } from 'express-session';
import database from './config/Database.js';
import SequelizeStore from 'connect-session-sequelize';
import dotenv from 'dotenv';
import UserRoute from './routes/UserRoute.js';
import ProductRoute from './routes/ProductRoute.js';
import AuthRoute from './routes/AuthRoute.js';
dotenv.config();

// (async() => {
//     await database.sync();
// })();

const app = express();

const sessionStore = SequelizeStore(session.Store);
const store = new sessionStore({
    db: database,
});

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
        secure: 'auto',
    },
}))
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));
app.use(express.json());
app.use(UserRoute);
app.use(ProductRoute);
app.use(AuthRoute);

// store.sync();

app.listen(process.env.APP_PORT, () => {
    console.log(`Server running on port ${process.env.APP_PORT}`);
})

