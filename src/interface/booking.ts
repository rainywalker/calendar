interface Photo {
    url : string,
    width : number,
    height : number
}
interface Rate {
    salePrice : number,
    availability : number,
    ratePlanType : string
}
interface Guest {
    adult : number,
    children : number,
    infant : number
}
interface UserData {
    name : string,
    telephone : string,
    arrivalTime : string,
    memo : string
}

interface bookingDataList {
    propertyId : number,
    roomTypeId : number,
    checkIn : string,
    checkOut : string,
    bookingCount :  number,
    guest : Guest[],
}

//GET
export interface RoomTypes {
    roomTypeId : number,
    name : string,
    maxOccupancy : number,
    minOccupancy : number,
    roomSize : number,
    photos : Photo[],
    roomCount : number,
    rate : Rate
}

//POST
export interface Booking {
    bookingDataList : bookingDataList[],
    userData : UserData

}

