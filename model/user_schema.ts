import mongoose,{model, Schema, type Document} from "mongoose";

interface IUser extends Document{
    name:string;
    email:string;
    password:string;
    createdAt:string;
};

const user_schema = new Schema<IUser>({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    createdAt:{type:String,required:true},

});

export const User = model<IUser>("User",user_schema);
