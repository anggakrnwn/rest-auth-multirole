const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const authRoutes = require('./routes/authRoutes/authRoutes');
const userRoutes = require('./routes/userRoutes/userRoutes');
const roleRoutes = require('./routes/roleRoutes/roleRoutes')

const app = express();
const PORT = 4000;

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


app.use('/api/auth', authRoutes);
app.use('/api/admin/users', userRoutes);
app.use('/api/admin/roles', roleRoutes);


app.get('/', (req, res) => {
    res.send('hello world')
})

app.listen(PORT, () => {
    console.log(`server berjalan di PORT ${PORT}`)
})