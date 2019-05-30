export interface RootState {
    uniqueData : {
        currentDate : string,
        property : {
            propertyId : number,
            name : string,
            address : string,
            telephones : Array<object>
        }
    }
}