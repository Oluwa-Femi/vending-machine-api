export enum RequestType {
  USER = "user",
}

export enum Messages {
    GENERIC = "Generic Error: Forbidden",
    STATUS400 = "",
    SUCCESS = "Successful",
    NOTUSER = "Forbidden, must be a user",
    NOTBUYER = "User is not a buyer, only buyers can buy products",
    INSUFFICIENT = "Insufficient funds",
    NOTSELLER = "User is not a seller, only sellers can create products",
    NOTFOUND = "Invalid Username or Password",
    NOTPRODUCT = "Product Not Found",
    LOGGEDOUT = "User is Logged Out",
    WALLETNOTFUNDED = "Please fund your wallet, it's currently empty",
    DUPLICATEDSESSION = "There is already an active session using your account",
    STATUS500 = "An error occured. Please try again or contact support",
    SESSIONEXPIRED = "Unauthorized. Session timeout",
    INVALIDTOKEN = "An error occurred. Invalid token format",
    NOXREQUEST = "x-request-from is missing in the header",
    INCORRECTXREQUEST = "x-request-from passed can not access this resource"
  }