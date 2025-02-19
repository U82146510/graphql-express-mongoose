import express,{type Request,type Response,type NextFunction} from 'express';


export class ApolloError extends Error{
    public reason:string;
    constructor(message:string,reason:string){
        super(message);
        this.reason=reason;
    }
}

export const error_handler = (err:ApolloError,req:Request,res:Response,next:NextFunction)=>{

    if(err instanceof ApolloError) {
        let statusCode = 500; // Default to internal server error

        switch (err.reason) {
            case "USER_CREATION_FAILED":
                statusCode = 400;
                break;
            case "USER_EXISTS":
                statusCode = 409;
                break;
            case "INTERNAL_SERVER_ERROR":
                statusCode = 500;
                break;
            default:
                statusCode = 500;
                break;
        }

        return res.status(statusCode).json({ error: err.message });
    }
    res.status(500).json({ error: "Something went wrong" });
}


export const formatError = (err) => {
    console.error("GraphQL Error:", err);

    return {
        message: err.message || "Internal Server Error",
        code: err.extensions?.code || "INTERNAL_SERVER_ERROR"
    };
}