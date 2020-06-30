/**
 * Classe modelo ApplicationProblemType
 * @class
 */
export class ApplicationProblemType {
  /**
   * constructor method
   * @param {string} type
   * @param {string} title
   * @param {string} detail
   * @param {Number} status
   * @param {string} instance
   * @param {Array<string>} stacktrace
   * @param {ApplicationProblemType} cause
   * @constructor
   */
  constructor(
    public type: string | 'about:blank',
    public title: string,
    public detail?: string,
    public status?: Number,
    public instance?: string,
    public stacktrace?: Array<string>,
    public cause?: ApplicationProblemType
  ) {}
}
