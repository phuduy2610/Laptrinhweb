const GameModel = require('../models/GameModel');

exports.index = async (req, res, next) => {
    // Get books from model
    const games = await GameModel.list();
    console.log('games', games);
    // Pass data to view to display list of books
    res.render('shop/shop', {games});
};

exports.details = async (req, res, next) => {
   //Get book from model
   const game = await GameModel.getonebyid(req.params.id);
   console.log('single games',game);
   res.render('shop/single', {game});
};

exports.search = async(req,res,next)=>{
  const games = await GameModel.getsamename(req.params.search);
  console.log('games', games);
  res.render('shope/shope',{games});  
};