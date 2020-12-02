const { MongoClient } = require("mongodb");
const uri = "mongodb+srv://duy:Newlife2000@clustergamestore.iwhtk.mongodb.net/GameStoreDatabase?retryWrites=true&w=majority";

// Create a new MongoClient
const client = new MongoClient(uri, { useNewUrlParser: true,useUnifiedTopology: true });

let database;

async function connectDb(){
    try{
        //Kết nối với database
        await client.connect();
        database = await client.db("GameStoreDatabase");        
        //Gọi hàm tương tác với database
        await listDatabases(client);

    }catch(e){
        console.error(e);
    } 
}
connectDb().catch(console.error);

const db = () => database;
module.exports.db = db;

//function để nhận và in database nhận được từ cluster
async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

