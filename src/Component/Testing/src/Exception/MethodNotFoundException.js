const DoubleException = Jymfony.Component.Testing.Exception.DoubleException;

/**
 * @memberOf Jymfony.Component.Testing.Exception
 */
class MethodNotFoundException extends DoubleException {
    __construct(message, classname, methodname, args = undefined) {
        super.__construct(message);

        this._classname = classname;
        this._methodname = methodname;
        this._args = args;
    }

    get className() {
        return this._classname;
    }

    get methodName() {
        return this._methodname;
    }

    get args() {
        return this._args;
    }
}

module.exports = MethodNotFoundException;
