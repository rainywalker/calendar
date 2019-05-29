export interface i_weekObj {
    week_sat : boolean,
    week_sun : boolean,
}
export interface holidayData {
    solarDay :  Array<number>,
    lunarDay : Array<number>
}

export interface isHoliday extends i_weekObj{
    week_holiday_solar : boolean,
    week_holiday_lunar : boolean,
    isActive? : boolean,
    disabled? : boolean
}

export interface dataInDays {
    lunarCalendar : number,
    solarCalendar : number,
    fullString : string,
    day : number,
    isActive : boolean,
    disabled : number,
    sat : boolean,
    sun : boolean,
    holidaySolar : Array<number>,
    holidayLunar : Array<number>,

}