global.__jymfony = global.__jymfony || {};

const primitives = [ Number, String, Boolean ];

let deepClone = function (object) {
    if (! object ) {
        return object;
    }

    let result;

    for (let type of primitives) {
        if (object instanceof type) {
            result = type(object);
            break;
        }
    }

    if (undefined === result) {
        if (isArray(object)) {
            result = [];
            object.forEach((child, index) => {
                result[index] = deepClone(child);
            });
        } else if (isObject(object)) {
            if (object.prototype) {
                result = object;
            } else if (object instanceof Date) {
                result = new Date(object);
            } else {
                // Object literal ({ ... })
                result = {};
                for (let i of Object.keys(object)) {
                    result[i] = deepClone(object[i]);
                }
            }
        }
    }

    return result;
};

global.__jymfony.deepClone = deepClone;