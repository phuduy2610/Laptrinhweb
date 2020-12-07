const {db} = require('../db/db');
const {ObjectId} = require('mongodb');

//Khai báo biến collection

//Các hàm thêm, xoá, sửa ở đây

//Hàm trả về toàn bộ các game trong collection
exports.list = async () => {
    const gamecollection = db().collection('Our games');
    const games = await gamecollection.find({}).toArray();
    console.dir(games);
    return games;
}

//Tìm 1 game bằng title
exports.getonebytitle = async (gametitle) => {
    const gamecollection = db().collection('Our games');
    const game = await gamecollection.findOne({title: gametitle})
    return game;
}

//Tìm game bằng id
exports.getonebyid = async (gameid) => {
    const gamecollection = db().collection('Our games');
    const game = await gamecollection.findOne({id: gameid});
    return game;
}

//Tìm nhiều game có cùng genre
exports.getsamegenre = async(gamegenre) =>{
    const gamecollection = db().collection('Our games');
    const games = await gamecollection.find({genre: gamegenre}).toArray();
    return games;
}
 
// Thêm 1 game 
exports.addnewgame = async(gameinfo) =>{
    const gamecollection = db().collection('Our games');
    const result = await gamecollection.insertOne(gameinfo);
    console.log(`New listing created with the following id: ${result.insertedId}`);
}

// Xoá 1 game theo tên
exports.deletegame = async(gametitle) =>{
    const gamecollection = db().collection('Our games');
    const result = await gamecollection.deleteOne({title: gametitle});
    console.log(`${result.deletedCount} document(s) was/were deleted.`);
}

// Sửa 1 game theo tên
//updateGameByName("Dragon Age II", { Price: 30$, genre: FPS });
exports.updateGameByName = async(nameOfGame, updatedInfo) =>{
    const gamecollection = db().collection('Our games');
    result = await gamecollection.updateOne({ name: nameOfGame }, { $set: updatedInfo });
    console.log(`${result.matchedCount} document(s) matched the query criteria.`);
    console.log(`${result.modifiedCount} document(s) was/were updated.`);
}

//Tìm game có tên giống vậy
exports.getsamename = async(gametitle) =>{
    const gamecollection = db().collection('Our games');
    const result = await gamecollection.find({name: /gametitle/}).toArray();
    console.dir(games);
    return games;
}
