const {db} = require('../db/db');
const {ObjectId} = require('mongodb');

//Khai báo biến collection

//Các hàm thêm, xoá, sửa ở đây

//Hàm trả về toàn bộ các users trong collection
exports.list = async () => {
    const usercollection = db().collection('Users');
    const users = await usercollection.find({}).toArray();
    console.dir(users);
    return users;
}

//Tìm 1 user bằng name
exports.getonebyname = async (username) => {
    const usercollection = db().collection('Users');
    const user = await usercollection.findOne({name: username})
    return user;
}

//Tìm user bằng id
exports.getonebyid = async (userid) => {
    const usercollection = db().collection('Users');
    const user = await usercollection.findOne({id: userid});
    return user;
}

exports.getHighestId = async()=>{
    const usercollection = db().collection('Users');
    const user = await usercollection.find({}).sort({id:-1}).limit(1).toArray();
    return user;
}


 
// Thêm 1 user 
exports.addnewuser = async(userinfo) =>{
    const usercollection = db().collection('Users');
    const result = await usercollection.insertOne(userinfo);
    console.log(`New listing created with the following id: ${result.insertedId}`);
}

// Xoá 1 user theo tên
exports.deleteuser = async(username) =>{
    const usercollection = db().collection('Users');
    const result = await usercollection.deleteOne({name: username});
    console.log(`${result.deletedCount} document(s) was/were deleted.`);
}

// Sửa 1 user theo tên
exports.updateuserByName = async(nameOfuser, updatedInfo) =>{
    const usercollection = db().collection('Users');
    result = await usercollection.updateOne({ name: nameOfuser }, { $set: updatedInfo });
    console.log(`${result.matchedCount} document(s) matched the query criteria.`);
    console.log(`${result.modifiedCount} document(s) was/were updated.`);
}

exports.updateuserById = async(IdOfuser, updatedInfo) =>{
    const usercollection = db().collection('Users');
    result = await usercollection.updateOne({ id: IdOfuser }, { $set: updatedInfo });
    console.log(`${result.matchedCount} document(s) matched the query criteria.`);
    console.log(`${result.modifiedCount} document(s) was/were updated.`);
}


//Tìm user có tên giống vậy
exports.getbypagesamename = async(page_number, item_per_page, username) =>{
    const usercollection = db().collection('Users');
    const users = await usercollection.find({name: {$regex : username, $options: 'i'}}).skip((page_number - 1)*item_per_page).limit(item_per_page).toArray();
    return users;
}

//Lấy user theo trang
exports.getbypage = async(page_number, item_per_page )=>{
    const usercollection = db().collection('Users');
    const users = await usercollection.find({}).skip((page_number - 1)*item_per_page).limit(item_per_page).toArray();
    return users;
}

//Lấy số lượng user
exports.getuserCount = async()=>{
    const userCount = await db().collection('Users').countDocuments();
    return userCount;
}
