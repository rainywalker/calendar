<template>
    <div class="datePicker" ref="datePicker">
        <calendar-ctrl :year="year" :dateCtx="dateCtx" :month="month" @chageMonth="chageMonth" />
        <div class="innerContent">
            <ul class="weekdays">
                <li v-for="(day,i) in days" :key="i">
                    <span class="days" :class="weekEnd(i)">{{day}}</span>
                </li>
            </ul>

            <ul class="dates">
                <li v-for="(blank, index) in firstDayOfMonth" :key="'_'+index">
                    <button type="button" class="skip">{{blank}}</button>
                </li>
                <li v-for="(item,idx) in daysInMonth" :key="idx" :class="initClass(item)">
                    <button type="button"
                            @mouseenter="startOver(item, $event)"
                            @mouseout="endOut(item, $event)"
                            @click="selectFunc(item)">
                        {{item.day}}
                    </button>

                </li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue, Emit, Prop} from 'vue-property-decorator';
    import moment from 'moment';
    import 'moment-lunar';
    import "moment/locale/ko";
    import * as calendar from '@/interface/calendar.ts';
    import CalendarCtrl from '@/components/booking/CalendarCtrl.vue';

    const holidayData : calendar.holidayData = {
        solarDay : [101,301,505,606,815,1003,1009,1225],
        lunarDay : [1230,101,102,408,814,815,816]
    };


    @Component({
        components : {
            CalendarCtrl
        }
    })
    export default class DatePicker extends Vue {
        @Prop(Object) checkInOut!:any;

        private dateCtx : any = moment();
        private today : any = moment();

        public days : Array <string> = ['일', '월', '화', '수', '목', '금', '토'];

        public startDate : string =  this.checkInOut.checkIn;
        public endDate : string =  this.checkInOut.checkOut;

        public daysArray : Array<calendar.dataInDays> = [];

        private created() {
            this.initRangeSelection()
        }


        initRangeSelection() {
            const chkInParse = parseInt(this.checkInOut.checkIn.replace(/[-]/g,''),10);
            const overString = parseInt(this.checkInOut.checkOut.replace(/[-]/g,''),10);

            // const bFromA = moment.duration(moment(moment(item.fullString)).diff(this.checkIn)).days();

            const selection : any = this.daysInMonth.filter((v:any) => {
                const fullStringParse =  parseInt(v.fullString.replace(/[-]/g,''),10);
                if (chkInParse <= overString && fullStringParse <= overString && fullStringParse > chkInParse) {
                    v.endDate = true;
                    return v
                }
            });

            if (selection[selection.length-1] !== undefined) {
                selection[selection.length-1].lastDate = true;
            }
            return selection
        }

        rangeSelection(item:any) {



            if ( this.checkInOut.checkOut === '') {
                if (item.disabled === false && this.checkInOut.isCheckOut === true) {

                    const chkInParse : number = parseInt(this.checkInOut.checkIn.replace(/[-]/g,''),10);
                    const chkOutNumber : number = parseInt(this.checkInOut.checkOut.replace(/[-]/g,''),10)
                    const overString : number = parseInt(item.fullString.replace(/[-]/g,''),10);



                    //
                    // // const bFromA = moment.duration(moment(moment(item.fullString)).diff(this.checkIn)).days();
                    this.daysInMonth.filter((v:any) => {

                        const fullStringParse : number =  parseInt(v.fullString.replace(/[-]/g,''),10);
                        if (chkInParse <= overString && fullStringParse <= overString && fullStringParse > chkInParse) {
                            v.endDate === true ? v.endDate = false : v.endDate = true;
                            return v
                        }

                    });
                    // return selectionArray
                }
            }




        }
        startOver(item : any,e :any) {
            this.rangeSelection(item)
        }

        @Emit()
        selectFunc(item : any) : string {

            this.checkInOut.isCheckIn ? this.checkInOut.checkIn = item.fullString : this.checkInOut.checkOut = item.fullString;

            const chkInNumber : number = parseInt(this.checkInOut.checkIn.replace(/[-]/g,''),10)
            const chkOutNumber : number = parseInt(this.checkInOut.checkOut.replace(/[-]/g,''),10)

            if (chkInNumber > chkOutNumber || this.checkInOut.checkIn === '') {
                this.checkInOut.checkIn = item.fullString
                this.checkInOut.checkOut = '';
            }

            if (chkInNumber < chkOutNumber && !this.checkInOut.isCheckOut ) {
                this.initRangeSelection()
            }

            return this.checkInOut
        }

        endOut(item:any, e : any) {
            this.rangeSelection(item)

        }
        initClass(item:any) : calendar.isHoliday {

            return {
                lastDate : item.lastDate,
                rangeDate : item.endDate,
                startDate : item.startDate,
                disabled : item.disabled,
                week_sat : item.sat,
                week_sun : item.sun,
                week_holiday_solar : item.holidaySolar.indexOf(item.solarCalendar) >= 0,
                week_holiday_lunar : item.holidayLunar.indexOf(item.lunarCalendar) >= 0
            }
        }
        weekEnd(num : number) : calendar.i_weekObj {

            const weekObj : calendar.i_weekObj = {
                week_sat : false,
                week_sun : false
            };

            if (num === 0) weekObj.week_sat = true;
            if (num === 6) weekObj.week_sun = true;

            return weekObj
        }

        chageMonth(num : number) : void {
            num > 0 ? this.dateCtx = moment(this.dateCtx).add(1, 'month')
                : this.dateCtx = moment(this.dateCtx).subtract(1, 'month');
            this.initRangeSelection()
        }
        get year() : string {

            return this.dateCtx.format('Y')
        }
        get month() : string {

            return this.dateCtx.format('MM')

        }
        get currentDate() : string {
            return this.today.format('DD');
        }
        get firstDayOfMonth() : number {
            const arr = [];
            let firstDay = moment(this.dateCtx).subtract((parseInt(this.currentDate,10) - 1), 'days');




            // let dateFrom = parseInt(moment(this.dateCtx).subtract(1,'months').endOf('month').format('D'))
            //
            // let len = dateFrom-firstDay.weekday();
            // for (dateFrom; dateFrom>len  ;dateFrom--) {
            //     arr.push(dateFrom)
            // }

            // return arr.reverse()
            return firstDay.weekday();
        }

        get initialMonth() : string {

            return this.today.format('MM')
        }
        get initialYear() : string {

            return this.today.format('Y');
        }

        get daysInMonth () : Array<calendar.dataInDays> {

            const arr : any = [];
            const solarArray : Array<string> =  [];
            const lunarArray : Array<string> =  [];

            for (let i=0; i<this.dateCtx.daysInMonth(); i++) {

                let idx : any = i +1;

                if (idx < 10) idx = '0' + idx;
                else idx = '' + idx;

                const currentDate : string = `${this.year}-${this.month}-${i+1}`;
                const ctx : any = moment(currentDate,'YYYYMDD');
                const dateCtxFormat : string = this.dateCtx.format('Y-MM-'+idx);



                const lunar_stringExtract : string = ctx.lunar().format('YYYYMDD').substring(4);
                const solar_stringExtract : string = ctx.solar().format('YYYYMDD').substring(4);


                solarArray.push(solar_stringExtract);
                lunarArray.push(lunar_stringExtract);

                arr.push({
                    lastDate : false,
                    endDate : this.checkInOut.checkOut === dateCtxFormat,
                    startDate : this.checkInOut.checkIn === dateCtxFormat,
                    lunarCalendar : parseInt(lunar_stringExtract.substr(1)),
                    solarCalendar : parseInt(solar_stringExtract.substr(1)),
                    fullString : dateCtxFormat,
                    day : parseInt(dateCtxFormat.substr(8),10),
                    disabled : parseInt(`${this.initialYear}${this.initialMonth}${this.currentDate}`) > parseInt(`${this.year}${this.month}${idx}`),
                    sat : ctx.day() === 0,
                    sun : ctx.day() === 6,
                    holidaySolar : [],
                    holidayLunar : [],
                })
            }

            const holidayMatch = (arr : Array<string>, data : Array<number>) : Array<any> => {
                return arr.map((v:string) => {
                    if(data.includes(parseInt(v))) {
                        return parseInt(v.substr(1))
                    }
                }).filter((v : number | undefined) => v !== undefined)
            };

            const solarMatch : Array <number> = holidayMatch(solarArray,holidayData.solarDay);
            const lunarMatch : Array <number> = holidayMatch(lunarArray,holidayData.lunarDay);

            arr.forEach((v:any) => {
                v.holidaySolar = solarMatch;
                v.holidayLunar = lunarMatch;
            });
            this.daysArray = [...arr]
            return this.daysArray
            // return this.dateCtx.daysInMonth();
        }


    }
</script>

<style scoped lang="scss">
    .innerContent{
        box-shadow: 0 1px 7px 0 rgba(101, 101, 101, 0.2), 0 2px 2px -2px rgba(126, 126, 126, 0.12), 0 3px 2px 0 rgba(144, 144, 144, 0.14);
        border: solid 1.1px #e3e3e3;background-color: #fff;padding:20px;
        .week_sat button{color:#FF4141}
        .week_sun button{color:#0C71C0}
        .week_holiday_solar button,.week_holiday_lunar button{color:#FF4141}
        .weekdays{
            display:flex;justify-content:space-between;padding:15px 0;
            li{float:left;color:#2e2e2e;width:calc(100%/7);text-align: center;box-sizing: border-box}
        }
        .dates{
            display: flex;flex-wrap: wrap;
            li{
                width:calc(100%/7);text-align: center;position:relative;

                &.disabled button{pointer-events: none;color:#aaa}
                &:hover button{background: #eee}
                &.startDate button{
                    pointer-events: none;border-radius: 20px 0 0 20px;
                    background: #f91d5a;color:#fff;display: inline-block;text-align: center;
                }
                &.rangeDate button{background: rgba(249, 29, 90, .8);color:#fff}
                &.lastDate button{ pointer-events: none;border-radius: 0 20px 20px 0;
                    background: #f91d5a;color:#fff;display: inline-block;text-align: center;}

                button{
                    font-size: 15px;display: inline-block;width:100%;box-sizing:border-box;padding:25% 0;outline: none;

                }

                span.isActive{background: #d71b5f;color:#fff;display: inline-block;border-radius: 100%;width:36px;height:36px;text-align: center;
                    line-height: 36px;position: absolute;top:50%;left:50%;margin:-18px 0 0 -18px}
                span.disabled{pointer-events: none;color:#aaa}

                .skip{visibility: hidden}
            }


        }
    }

</style>