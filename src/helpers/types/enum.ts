export enum RequestType {
  USER = "user",
}

export enum Messages {
    STATUS500 = "An error occured. Please try again or contact customer service",
    TOKENEXPIRED = "Unauthorized. Session timeout",
    INVALIDTOKEN = "An error occurred. Invalid token format",
    NOXREQUEST = "x-request-from is missing in the header",
    INCORRECTXREQUEST = "x-request-from passed can not access this resource"
  }