const CustomApiError = require("./CustomApiError");
const {StatusCodes}=require("http-status-codes")

class UnAuthorized extends CustomApiError{
    constructor(message){
        super(message)
        this.statusCode=StatusCodes.UNAUTHORIZED
        
    }
}

module.exports=UnAuthorized