exports.index = async(req,res,next) => {
    req.logout();
    res.redirect('/');
}