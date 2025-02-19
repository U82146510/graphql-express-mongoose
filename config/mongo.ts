import mongoose,{type Connection} from "mongoose";

export const connect = async()=>{
    try {
        const connection = process.env.mongo_db;
        if(!connection){
            throw new Error("connection string is missing");
        }
        await mongoose.connect(connection);
        console.log('Mongo Started');
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

const db:Connection = mongoose.connection;


db.on('connected', () => {
    console.log('MongoDB connected successfully');
});

db.on('open', () => {
    console.log('MongoDB connection is open');
});

db.on('error',(error:unknown)=>{
    console.log(error);
    process.exit(1);
})

db.on('disconnected',()=>{
    console.log('Mongo dissconected')
});

db.on('reconnected', () => {
    console.log('MongoDB successfully reconnected');
});

db.on('reconnectFailed', () => {
    console.log('MongoDB reconnection failed. Manual intervention needed.');
});

db.on('reconnectTries', () => {
    console.log('MongoDB is attempting to reconnect...');
});

db.on("close", () => {
    console.log("MongoDB connection closed");
});
