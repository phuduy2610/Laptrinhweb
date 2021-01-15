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
    const game = await gamecollection.findOne({_id: ObjectId(gameid)});
    return game;
}

exports.getHighestId = async()=>{
    const gamecollection = db().collection('Our games');
    const game = await gamecollection.find({}).sort({id:-1}).limit(1).toArray();
    return game;
}

//Tìm nhiều game có cùng genre theo phân trang
exports.getbypagesamegenre = async(page_number, item_per_page,gamegenre) =>{
    // chuyển từ thể loại sang object id của thể loại
    const genreCollection = db().collection('Genres');
    const genre = await genreCollection.findOne({name: {$regex : gamegenre, $options: 'i'}});

    // lấy game từ object id thể loại
    const gamecollection = db().collection('Our games');
    const games = await gamecollection.find({category: ObjectId(genre._id)}).skip((page_number - 1)*item_per_page).limit(item_per_page).toArray();
    return games;
}
 
//Tìm nhiều game có cùng genre
exports.getbylimitsamegenre = async(item_per_page,gamegenre,gamename) =>{
    // chuyển từ thể loại sang object id của thể loại
    const genreCollection = db().collection('Genres');
    const genre = await genreCollection.findOne({_id:ObjectId(gamegenre) });

    // lấy game từ object id thể loại
    const gamecollection = db().collection('Our games');
    const games = await gamecollection.find({category: ObjectId(genre._id),title:{$ne:gamename}}).limit(item_per_page).toArray();
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
    result = await gamecollection.updateOne({ title: nameOfGame }, { $set: updatedInfo });
    console.log(`${result.matchedCount} document(s) matched the query criteria.`);
    console.log(`${result.modifiedCount} document(s) was/were updated.`);
}

//Tìm game có tên giống vậy
exports.getbypagesamename = async(page_number, item_per_page, gametitle) =>{
    const gamecollection = db().collection('Our games');
    const games = await gamecollection.find({title: {$regex : gametitle, $options: 'i'}}).skip((page_number - 1)*item_per_page).limit(item_per_page).toArray();
    return games;
}

//Lấy game theo trang
exports.getbypage = async(page_number, item_per_page )=>{
    const gamecollection = db().collection('Our games');
    const games = await gamecollection.find({}).skip((page_number - 1)*item_per_page).limit(item_per_page).toArray();
    return games;
}

//Lấy số lượng game
exports.getGameCount = async()=>{
    const gameCount = await db().collection('Our games').countDocuments();
    return gameCount;
}

//Lấy số lượng game theo genre
exports.getGameCountByGenre = async(gamegenre)=>{
    // chuyển từ thể loại sang object id của thể loại
    const genreCollection = db().collection('Genres');
    const genre = await genreCollection.findOne({name: {$regex : gamegenre, $options: 'i'}});

    // lấy game từ object id thể loại
    const gamecollection = db().collection('Our games');
    const games = await gamecollection.find({category: ObjectId(genre._id)}).toArray();
    return games.length;
}

//Lấy số lượng game theo genre
exports.getGameCountGetsamename = async(gametitle)=>{

    const gamecollection = db().collection('Our games');
    const games = await gamecollection.find({title: {$regex : gametitle, $options: 'i'}}).toArray();
    return games.length;
}

// lấy ra array id genre bằng một array tên genre
exports.getGenreIdByName = async(name) => {
    const genreCollection = db().collection('Genres');
    const Genre = await genreCollection.findOne({name: {$regex : name, $options: 'i'}});
    return Genre._id;
}

// lấy ra toàn bộ genre theo id 
exports.getAllGenreId = async() => {
    const genreCollection = db().collection('Genres');
    const Genre = await genreCollection.find({}).toArray();
    for(var i = 0; i < Genre.length; i++) {
        Genre[i] = Genre[i]._id;
    }
    return Genre;
}

//Lấy game theo filter
exports.getByFilter = async(params,page_number, item_per_page ) => {
    const gamecollection = db().collection('Our games');
    //
    if(params.genre != null) {
        if(!Array.isArray(params.genre)) {
            params.genre = [params.genre];
        }
        for (var i = 0; i < params.genre.length; i++) {
            params.genre[i] = await this.getGenreIdByName(params.genre[i]);
        }
    } else {
        params.genre = await this.getAllGenreId();
    }
    //
    let single = [true,false];
    let multi = [true,false];
    if(typeof params.spec == "undefined") {
        params.spec = [1,2,3,4];
    } else {
        if(Array.isArray(params.spec)) {
            for (var i in params.spec) {
                params.spec[i] = parseInt(params.spec[i]);
            }
        } else {
            params.spec = [parseInt(params.spec)];
        }
    }
    if(params.min == "") {
        params.min = 0;
    } else {
        params.min = parseInt(params.min);
    }
    if(params.max == "") {
        params.max = 100;
    } else {
        params.max = parseInt(params.max);
    }
    if(params.single == "true" && typeof params.multi == "undefined") {
        single = [true];
    }
    if(params.multi == "true" && typeof params.single == "undefined") {
        multi = [true];
    }
    if( params.single == "true" ** params.multi == "true") {
        single = [true];
        multi = [true];
    }
    const games = await gamecollection.find({
        $and: [
            { req: { $in: params.spec } },
            { category: { $in: params.genre }},
            { basePrice: {$gte:params.min,$lte:params.max} },
            { single: { $in: single } },
            { multi: { $in: multi } }
        ]
    }).skip((page_number - 1)*item_per_page).limit(item_per_page).toArray();
    return games;
}

//Lấy game theo filter
exports.getGameCountByFilter = async(params) => {
    const gamecollection = db().collection('Our games');
    //
    if(params.genre != null) {
        if(!Array.isArray(params.genre)) {
            params.genre = [params.genre];
        }
        for (var i = 0; i < params.genre.length; i++) {
            params.genre[i] = await this.getGenreIdByName(params.genre[i]);
        }
    } else {
        params.genre = await this.getAllGenreId();
    }
    //
    let single = [true,false];
    let multi = [true,false];
    if(typeof params.spec == "undefined") {
        params.spec = [1,2,3,4];
    } else {
        if(Array.isArray(params.spec)) {
            for (var i in params.spec) {
                params.spec[i] = parseInt(params.spec[i]);
            }
        } else {
            params.spec = [parseInt(params.spec)];
        }
    }
    if(params.min == "") {
        params.min = 0;
    } else {
        params.min = parseInt(params.min);
    }
    if(params.max == "") {
        params.max = 100;
    } else {
        params.max = parseInt(params.max);
    }
    if(params.single == "true" && typeof params.multi == "undefined") {
        single = [true];
    }
    if(params.multi == "true" && typeof params.single == "undefined") {
        multi = [true];
    }
    if( params.single == "true" ** params.multi == "true") {
        single = [true];
        multi = [true];
    }
    const count = await gamecollection.countDocuments({
        $and: [
            { req: { $in: params.spec } },
            { category: { $in: params.genre }},
            { basePrice: {$gte:params.min,$lte:params.max} },
            { single: { $in: single } },
            { multi: { $in: multi } }
        ]
    });
    return count;
}

//Lấy game theo filter có keyword
exports.getByFilterWithKeyword = async(params,page_number, item_per_page ) => {
    const gamecollection = db().collection('Our games');
    //
    if(params.genre != null) {
        if(!Array.isArray(params.genre)) {
            params.genre = [params.genre];
        }
        for (var i = 0; i < params.genre.length; i++) {
            params.genre[i] = await this.getGenreIdByName(params.genre[i]);
        }
    } else {
        params.genre = await this.getAllGenreId();
    }
    //
    let single = [true,false];
    let multi = [true,false];
    if(typeof params.spec == "undefined") {
        params.spec = [1,2,3,4];
    } else {
        if(Array.isArray(params.spec)) {
            for (var i in params.spec) {
                params.spec[i] = parseInt(params.spec[i]);
            }
        } else {
            params.spec = [parseInt(params.spec)];
        }
    }
    if(params.min == "") {
        params.min = 0;
    } else {
        params.min = parseInt(params.min);
    }
    if(params.max == "") {
        params.max = 100;
    } else {
        params.max = parseInt(params.max);
    }
    if(params.single == "true" && typeof params.multi == "undefined") {
        single = [true];
    }
    if(params.multi == "true" && typeof params.single == "undefined") {
        multi = [true];
    }
    if( params.single == "true" ** params.multi == "true") {
        single = [true];
        multi = [true];
    }
    const games = await gamecollection.find({
        $and: [
            { title: { $regex : params.keyword, $options: 'i'}},
            { req: { $in: params.spec } },
            { category: { $in: params.genre }},
            { basePrice: {$gte:params.min,$lte:params.max} },
            { single: { $in: single } },
            { multi: { $in: multi } }
        ]
    }).skip((page_number - 1)*item_per_page).limit(item_per_page).toArray();
    return games;
}

//Lấy game theo filter có keyword
exports.getGameCountByFilterWithKeyword = async(params) => {
    const gamecollection = db().collection('Our games');
    //
    if(params.genre != null) {
        if(!Array.isArray(params.genre)) {
            params.genre = [params.genre];
        }
        for (var i = 0; i < params.genre.length; i++) {
            params.genre[i] = await this.getGenreIdByName(params.genre[i]);
        }
    } else {
        params.genre = await this.getAllGenreId();
    }
    //
    let single = [true,false];
    let multi = [true,false];
    if(typeof params.spec == "undefined") {
        params.spec = [1,2,3,4];
    } else {
        if(Array.isArray(params.spec)) {
            for (var i in params.spec) {
                params.spec[i] = parseInt(params.spec[i]);
            }
        } else {
            params.spec = [parseInt(params.spec)];
        }
    }
    if(params.min == "") {
        params.min = 0;
    } else {
        params.min = parseInt(params.min);
    }
    if(params.max == "") {
        params.max = 100;
    } else {
        params.max = parseInt(params.max);
    }
    if(params.single == "true" && typeof params.multi == "undefined") {
        single = [true];
    }
    if(params.multi == "true" && typeof params.single == "undefined") {
        multi = [true];
    }
    if( params.single == "true" ** params.multi == "true") {
        single = [true];
        multi = [true];
    }
    const count = await gamecollection.countDocuments({
        $and: [
            { title: { $regex : params.keyword, $options: 'i'}},
            { req: { $in: params.spec } },
            { category: { $in: params.genre }},
            { basePrice: {$gte:params.min,$lte:params.max} },
            { single: { $in: single } },
            { multi: { $in: multi } }
        ]
    });
    return count;
}