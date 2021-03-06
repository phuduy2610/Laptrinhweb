const {db} = require('../db/db');
const {ObjectId} = require('mongodb');
const bcrypt = require('bcrypt');

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
// exports.addnewuser = async(userinfo) =>{
//     const usercollection = db().collection('Users');
//     const result = await usercollection.insertOne(userinfo);
//     console.log(`New listing created with the following id: ${result.insertedId}`);
// }

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

exports.updateuserById = async(userId, updatedInfo) =>{
    const usercollection = db().collection('Users');
    result = await usercollection.updateOne({ _id: ObjectId(userId) }, { $set: updatedInfo });
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

//Kiểm tra thông tin user hợp lệ để đăng nhập
exports.checkCredential = async(username,password) => {
    const user = await db().collection('Users').findOne({email: username,status : true,blocked: false});
    let bpassword = null;
    if(user)
    {
        bpassword = await bcrypt.compare(password,user.password);
    }
    else
    {
        return null;
    }
    if(bpassword)
    {
        return user;
    }
    else
    {
        return null;
    }
}

// thêm user vào db
exports.addNewUser = async(user) => {
    const userCollection = db().collection('Users');
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    const newUser = {
    username: user.username,
    email: user.email,
    password: hash,
    status: user.status,
    blocked: user.blocked
  } 
  const result = await userCollection.insertOne(newUser);
  console.log(`New listing created with the following id: ${result.insertedId}`);
  const User = await userCollection.findOne({email: user.email});
  return User;
}

// kiểm tra email có tồn tại không
exports.isEmailExist = async(email) => {
    const userCollection = db().collection('Users');
    const result = await userCollection.findOne({email: email});
    if(result) {
        return true;
    }
    else {
        return false;
    }
}

// thêm code validate vào db
exports.addValidationToken = async(validationToken,userId) => {
    const validateCollection = db().collection('Validation');
    validation = {
        token: validationToken,
        userId: ObjectId(userId)
    }
    validateCollection.insertOne(validation);
}

// user kích hoạt tài khoản
exports.validateUserAccount = async(validationToken) => {
    let result = 0;
    const validateCollection = db().collection('Validation');
    const userCollection = db().collection('Users');
    const user = await validateCollection.findOne({token: validationToken});
    if(user) {
        await userCollection.updateOne({_id: ObjectId(user.userId)},{$set:{status: true}});
        result = await validateCollection.deleteOne({token: validationToken});
    }
    return result.deletedCount;
}

exports.getUser = async(userId) => {
    const userCollection = db().collection('Users');
    const user = await userCollection.findOne({_id: ObjectId(userId)});
    if(user) {
        return user;
    }
    else {
        return null;
    }
}

exports.getUserByEmail = async(email) => {
    const userCollection = db().collection('Users');
    const user = await userCollection.findOne({email: email});
    if(user) {
        return user;
    }
    else {
        return null;
    }
}

exports.addForgotToken = async(forgotToken,userId) => {
    const forgotCollection = db().collection("Forgot");
    forgotCollection.createIndex({ expireAfterSeconds: 86400});
    forgotCollection.insert({
        "createAt": new Date(),
        "userId": ObjectId(userId),
        "token": forgotToken
    })
}

exports.removeForgotToken = async(forgotToken) => {
    const forgotCollection = db().collection("Forgot");
    await forgotCollection.deleteOne({token: forgotToken});
}

exports.getUserIdFromForgot = async(forgotToken) => {
    const forgotCollection = db().collection("Forgot");
    userId = await forgotCollection.findOne({token: forgotToken});
    if(userId) {
        return userId.userId;
    }
    else {
        return null;
    }
}

exports.updateUserPassword = async(userId,newPassword) => {
    const userCollection = db().collection("Users");
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newPassword, salt);
    await userCollection.updateOne({_id: ObjectId(userId)},{$set:{password: hash}});
}