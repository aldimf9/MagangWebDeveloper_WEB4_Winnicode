const express = require('express');
const bodyParser = require('body-parser');
const db = require('./models');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const testRoutes = require('./routes/testRoutes');

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use('/auth', authRoutes);
app.use('/tests', testRoutes);

db.sequelize.sync().then(() => {
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
});
