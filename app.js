// require packages used in the project
const express = require('express');
const app = express();
const port = 3000;

const restaurant = require('./models/restaurant');

// require mongoose
const mongoose = require('mongoose');
// 僅在非正式環境時, 使用 dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
// setting connect to mongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// require express-handlebars
const exphbs = require('express-handlebars');

const restaurantList = require('./restaurant.json');

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// setting static files
app.use(express.static('public'));

// require body-parser
const bodyParser = require('body-parser');
// 每筆請求都要透過 body-parser 作前置處理
app.use(bodyParser.urlencoded({ extended: true }));

// require methodOverride
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

// get database connect status
const db = mongoose.connection;
// connect error
db.on('error', () => {
  console.log('mongodb error!');
});
// connect success
db.once('open', () => {
  console.log('mongodb connected!');
});

// routes setting
// index
app.get('/', (req, res) => {
  restaurant
    .find()
    .lean()
    .then((restaurants) => res.render('index', { restaurants: restaurants }))
    .catch((error) => console.error(error));
});

// edit
app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id;
  restaurant
    .findById(id)
    .lean()
    .then((restaurant) => res.render('edit', { restaurant: restaurant }))
    .catch((error) => console.log(error));
});

app.put('/restaurants/:id', (req, res) => {
  const id = req.params.id;
  const updateData = req.body;
  restaurant
    .findByIdAndUpdate(id, updateData)
    .then(() => {
      res.redirect(`/restaurants/${id}`);
    })
    .catch((error) => {
      console.log(error);
    });
});

// new
app.get('/restaurants/new', (req, res) => {
  res.render('new');
});
app.post('/restaurants', (req, res) => {
  restaurant
    .create(req.body)
    .then(() => res.redirect('/'))
    .catch((err) => console.log(err));
});

// detail
app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id;
  return restaurant
    .findById(id)
    .lean()
    .then((restaurant) => res.render('detail', { restaurant: restaurant }))
    .catch((error) => console.log(error));
});

// search
app.get('/search', (req, res) => {
  const keyword = req.query.keyword;
  const restaurants = restaurantList.results.filter((restaurant) => {
    return restaurant.name
      .toLocaleLowerCase()
      .includes(keyword.toLocaleLowerCase());
  });
  res.render('index', { restaurants: restaurants, keyword: keyword });
});

// delete
app.get('/restaurants/:id/delete', (req, res) => {
  const id = req.params.id;
  return restaurant
    .findById(id)
    .lean()
    .then((restaurant) => res.render('delete', { restaurant: restaurant }))
    .catch((error) => console.log(error));
});

app.delete('/:id', (req, res) => {
  const id = req.params.id;
  restaurant
    .findByIdAndDelete(id)
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error));
});

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`);
});
