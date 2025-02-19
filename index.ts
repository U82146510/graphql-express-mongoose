import express,{type Application,type Request,type Response,type NextFunction} from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import {connect} from './config/mongo.ts';
import {typeDefs} from './graphql/typeDefs.ts';
import {resolvers} from './graphql/resolvers.ts';
import dotenv from 'dotenv';
import {error_handler,formatError} from './error/error.ts';
dotenv.config();

const app:Application = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
        
const start = async()=>{
    try {
        const appolo_server = new ApolloServer({
            typeDefs,resolvers,formatError
        });
        await appolo_server.start();
        await connect();
        
        app.use("/graphql", expressMiddleware(appolo_server));
        app.use(error_handler);
        app.listen(port,()=>console.log(`Server${port}`));
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

start();