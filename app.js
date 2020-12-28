require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const hbs = require('hbs');
//var paginate = require('handlebars-paginate');
var paginate = require('dontfinthis');


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const shopRouter = require('./routes/shop');
const searchRouter = require('./routes/search');
const { index } = require('./controllers/indexController');



const app = express();


//custom handle bars 
hbs.registerHelper( "when",function(operand_1, operator, operand_2, options) {
  var operators = {
   '==': function(l,r) { return l == r; },
   '!=': function(l,r) { return l != r; },
   '>': function(l,r) { return Number(l) > Number(r); },
   '<': function(l,r) { return Number(l) < Number(r); },
   '||': function(l,r) { return l || r; },
   '&&': function(l,r) { return l && r; },
   '%': function(l,r) { return (l % r) === 0; }
  }
  , result = operators[operator](operand_1,operand_2);

  if (result) return options.fn(this);
  else  return options.inverse(this);
});

//middleware for searching game like "%...%"
hbs.registerHelper("paginate", paginate);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.set('view options', { layout: 'layouts/layout' });
hbs.registerPartials(__dirname + '/views/partials');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/shop',shopRouter);
app.use('/search',searchRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
