export enum RequestType {
  USER = "user",
}

export enum Messages {
    GENERIC = "Generic Error: Forbidden",
    STATUS400 = "",
    NOTFOUND = "Invalid Username or Password",
    LOGGEDOUT = "User is Logged Out",
    DUPLICATEDSESSION = "You have an active session. Please logout your account",
    STATUS500 = "An error occured. Please try again or contact support",
    SESSIONEXPIRED = "Unauthorized. Session timeout",
    INVALIDTOKEN = "An error occurred. Invalid token format",
    NOXREQUEST = "x-request-from is missing in the header",
    INCORRECTXREQUEST = "x-request-from passed can not access this resource"
  }