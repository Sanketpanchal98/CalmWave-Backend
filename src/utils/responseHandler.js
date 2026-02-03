class responseHandler {
    constructor(
        status,
        message = '',
        data = '',
    ){
        this.statuscode = status;
        this.message = message;
        this.data = data;
    }
}

export default responseHandler