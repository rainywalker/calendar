export interface RootState {
    currentDate : string,
    property : {
        propertyId : number | null,
        name : string,
        address : string,
        telephones : Array<object>
    }

}