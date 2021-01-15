require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const hbs = require('hbs');
//var paginate = require('handlebars-paginate');
const paginate = require('dontfinthis');
const session = require('express-session');
const passport = require('./passport');



const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const shopRouter = require('./routes/shop');
const searchRouter = require('./routes/search');
const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');
const logoutRouter = require('./routes/logout');
const validateRouter = require('./routes/validate');
const forgotRouter = require('./routes/forgot');
const { index } = require('./controllers/indexController');
const { register } = require('./controllers/userController');
const cartRouter = require('./routes/cart');

// api
const userApiRouter = require('./routes/api/user');


const app = express();


//custom handle bars 
hbs.registerHelper('ifEquals', function(arg1, arg2, options) {
  return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});
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
hbs.registerHelper('eachData', function(context, options) {
  var fn = options.fn, inverse = options.inverse, ctx;
  var ret = "";

  if(context && context.length > 0) {
    for(var i=0, j=context.length; i<j; i++) {
      ctx = Object.create(context[i]);
      ctx.index = i;
      ret = ret + fn(ctx);
    }
  } else {
    ret = inverse(this);
  }
  return ret;
}); 

hbs.registerHelper("math", function(lvalue, operator, rvalue, options) {
lvalue = parseFloat(lvalue);
rvalue = parseFloat(rvalue);
return {
    "+": lvalue + rvalue
}[operator];
});

//middleware for searching game like "%...%"
hbs.registerHelper("paginate", paginate);

// passport
app.use(session({secret: 'doubleD',resave: false,saveUninitialized: true,})); // TODO: đưa secret vào env
app.use(passport.initialize());
app.use(passport.session());
// pass req.user to res.locals
app.use(function(req,res,next){
  res.locals.user = req.user;
  res.locals.session = req.session;
  next();
})

// middleware check loggedin

function checkAcessible(req, res, next) {
  if (req.user) {
      next();
  } else {
      res.redirect('/login');
  }
}

function isLogged(req, res, next) {
  if (req.user) {
      res.redirect('/user');
  } else {
      next();
  }
}

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
app.use('/user',checkAcessible,userRouter);
app.use('/shop',shopRouter);
app.use('/search',searchRouter);
app.use('/login',isLogged,loginRouter);
app.use('/register',isLogged,registerRouter);
app.use('/logout',checkAcessible,logoutRouter);
app.use('/api/user',userApiRouter);
app.use('/validate',validateRouter);
app.use('/forgot',isLogged,forgotRouter);
app.use('/cart',cartRouter);
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
