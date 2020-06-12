
/**
 * Classe modelo HttpGenericErrorType
 * @class
 */
export class HttpGenericErrorType {

    /**
     * constructor method
     * @param {Number} code
     * @param {string} title
     * @param {string} detail
     * @constructor
     */
    constructor(
        public code: Number,
        public title: string,
        public detail: string) {
    }

}
