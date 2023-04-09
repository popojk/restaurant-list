// require packages used in the project
const express = require('express');
const app = express();
// require express-handlebars
const exphbs = require('express-handlebars');
// require body-parser
const bodyParser = require('body-parser');
// require methodOverride
const methodOverride = require('method-override');
// require router
const routes = require('./routes');

// require mongoose config
require('./config/mongoose');
// 加入這段 code, 僅在非正式環境時, 使用 dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const port = process.env.PORT;
// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
// setting static files
app.use(express.static('public'));
// 每筆請求都要透過 body-parser 作前置處理
app.use(bodyParser.urlencoded({ extended: true }));
// 每筆請求都會先以 methodOverride 進行前置處理
app.use(methodOverride('_method'));
// import request into router
app.use(routes);

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`);
});
