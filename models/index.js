
require('dotenv').config();

const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URL);

// const Cat = mongoose.model('Cat', { name: String });

// const kitty = new Cat({ name: 'Zildjian' });
// kitty.save().then(() => console.log('meow'));