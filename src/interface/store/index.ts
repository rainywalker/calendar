interface Theme {
    name : string,
    code : number
}
export interface RootState {
    currentDate : string,
    property : {
        propertyId : number | null,
        name : string,
        address : string,
        phoneNumbers : Array<object>,
        theme : Theme,
        notices : Array<object>
    }
}