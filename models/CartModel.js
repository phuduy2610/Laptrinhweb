const {db} = require('../db/db');
const {ObjectId} = require('mongodb');

//Hàm trả về toàn bộ các cart trong collection
exports.list = async () => {
    const cartcollection = db().collection('Carts');
    const carts = await cartcollection.find({}).toArray();
    console.dir(carts);
    return carts;
}

//Trả về tất cả các cart có cùng chung user
exports.listofproductsameuser = async (user_id) => {
    const cartcollection = db().collection('Carts');
    const carts = await cartcollection.find({userId: user_id}).toArray();
    console.dir(carts);
    return carts;
}

//Thêm 1 cart mới hoàn toàn TH chưa tồn tại cart nào cho user đó
exports.addnewcart= async(user_id)=>{
    const cartcollection = db().collection('Carts');
    const new_carts ={
        totalQty:0,
        userId:user_id,
        gameId:""
    }
    const result = await cartcollection.insertOne(new_carts);
    console.log(`New listing created with the following id: ${result.insertedId}`);
}


exports.addnewproduct= async(cart_info)=>{
    const cartcollection = db().collection('Carts');
    const result = await cartcollection.insertOne(cart_info);
    console.log(`New listing created with the following id: ${result.insertedId}`);
}

//Xoá 1 sản phẩm 
exports.removeproduct = async(user_id,game_id)=>{
    const cartcollection = db().collection('Carts');
    const result = await cartcollection.deleteOne({userId: user_id,gameId:game_id});
    console.log(`${result.deletedCount} document(s) was/were deleted.`);
}

//update 1 cart
exports.updateproduct = async(user_id,game_id,updatedInfo)=>{
    const cartcollection = db().collection('Carts');
    result = await cartcollection.updateOne({ userId: user_id,gameId:game_id }, { $set: updatedInfo });
    console.log(`${result.matchedCount} document(s) matched the query criteria.`);
    console.log(`${result.modifiedCount} document(s) was/were updated.`);
}