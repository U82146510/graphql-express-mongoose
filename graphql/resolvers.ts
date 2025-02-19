import {User} from '../model/user_schema.ts';
import {ApolloError} from '../error/error.ts';

export const resolvers = {
    Query:{
        async user(_,{ID}){
            try {
                return User.findById(ID);
            } catch (error) {
                console.error('Error getting user',error);
                throw new ApolloError('Error getting users','INTERNAL_SERVER_ERROR');
            }
        },
        async getUsers(_,{amount}){
            try {
                return User.find().sort({createdAt:-1}).limit(amount);
            } catch (error) {
                console.error('Error getting users',error);
                throw new ApolloError('Error getting users','INTERNAL_SERVER_ERROR');
            }
            
        }
    },
    Mutation:{
        async createUser(_,{UserInput:{name,email,password}}){
            try {
                const user_exist = await User.findOne({name:name});
                if(!user_exist){
                    throw new ApolloError("user already exists",'USER_EXISTS');
                }
                const create = await User.create({
                    name:name,
                    email:email,
                    password:password,
                    createdAt:new Date().toISOString(),
                });
    
                return create;    
            } catch (error) {
                console.error(error);
                throw new ApolloError('Error getting users','USER_CREATION_FAILED')
            }
            
        },
        async deleteUser(_,{ID}){
            try {
                const acknowledged = await User.findByIdAndDelete(ID)
                if(acknowledged){
                    return true;
                }    
            } catch (error) {
                console.error('Error to delete',error)
                throw new ApolloError('Error to delete','INTERNAL_SERVER_ERROR')
            }
            
        },
        async updateUser(_,{ID,UserInput:{name,email,password}}){
            return (await User.updateOne({_id:ID},{name:name,email:email,password:password})).modifiedCount;
        }   
    },
    
}