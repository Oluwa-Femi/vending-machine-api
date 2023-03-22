export enum RequestType {
  USER = "user",
}

export enum Messages {
    STATUS400 = "Generic Error: Forbidden",
    STATUS500 = "An error occured. Please try again or contact support",
    SESSIONEXPIRED = "Unauthorized. Session timeout",
    INVALIDTOKEN = "An error occurred. Invalid token format",
    NOXREQUEST = "x-request-from is missing in the header",
    INCORRECTXREQUEST = "x-request-from passed can not access this resource"
  }