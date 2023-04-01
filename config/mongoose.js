// require mongoose
const mongoose = require('mongoose');
// setting connect to mongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
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
