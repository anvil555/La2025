class BaseException extends Error {
    constructor(message = '', fileName, lineNumber) {
        super(message, fileName, lineNumber);
        this.message = "";

    }
}

class LindeException extends BaseException {
    constructor() {
        super();
        this.name = "LindeException";
        this.message = "Error en la aplicación de Linde";
    }
}
class LindeCustomerException extends BaseException{
    constructor(){
        super();
        this.name = "LindeCustomerException";
        this.message="El cliente ya existe en la coleccion";
    }
}
class LindeForkliftException extends BaseException{
    constructor(){
        super();
        this.name = "LindeForkliftException";
        this.message="La carretilla ya existe en la coleccion";
    }
}

class LindeWorkOrderException extends BaseException{
    constructor(){
        super();
        this.name = "LindeWorkOrderException";
        this.message="El aviso ya existe en la coleccion";
    }
}

class LindeServer extends BaseException{
    constructor(){
        super();
        this.name = "LindeServer";
        this.message="El aviso ya existe en la coleccion";
    }
}


export { LindeException, LindeCustomerException, LindeForkliftException, LindeWorkOrderException,LindeServer };