/**
 * Represents the response data for a user.
 */
export class UserResponse {
  /**
   * The unique identifier of the user.
   * @type {string}
   */
  id: string

  /**
   * The first name of the user.
   * @type {string}
   */
  firstName: string

  /**
   * The last name of the user.
   * @type {string}
   */
  lastName: string

  /**
   * The phone number of the user.
   * @type {string}
   */
  phone: string

  /**
   * The email address of the user.
   * @type {string}
   */
  email: string

  /**
   * The role of the user.
   * @type {string}
   */
  role: string
}