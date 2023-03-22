export enum RequestType {
  USER = "user",
}

export enum Messages {
    GENERIC = "Generic Error: Forbidden",
    STATUS400 = "",
    NOTFOUND = "Invalid Username or Password",
    LOGGEDOUT = "User is Logged Out",
    DUPLICATEDSESSION = "There is already an active session using your account",
    STATUS500 = "An error occured. Please try again or contact support",
    SESSIONEXPIRED = "Unauthorized. Session timeout",
    INVALIDTOKEN = "An error occurred. Invalid token format",
    NOXREQUEST = "x-request-from is missing in the header",
    INCORRECTXREQUEST = "x-request-from passed can not access this resource"
  }