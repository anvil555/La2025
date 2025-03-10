class BaseException extends Error {
    constructor(message = '', fileName, lineNumber) {
        super(message, fileName, lineNumber);
        this.message = "";

    }
}
class La2025Exception extends BaseException {
    constructor() {
        super();
        this.name = "La2025Exception";
        this.message = "Error en la aplicación del proyecto";
    }
}
export {La2025Exception };