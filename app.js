// APIKEY  - 2a410d0366157c278a2acdb364685685

const express = require('express');
const path = require('path');
const app = express();
// SETTING THE STATIC FOLDER
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index');
});

// PORT
const PORT  = 3000 || process.env.PORT;
// LISTENING ON THE PORT 3000
app.listen(PORT, () => {
    console.log(`Server started on PORT ${PORT}`);
});