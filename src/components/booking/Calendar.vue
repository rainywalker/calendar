<template>
    <div class="calendarWrap">
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
                <li v-for="(item,idx) in daysInMonth" :key="idx">
                    <button type="button"
                            class="dateNum"
                            :class="behaviorDay(item)"
                            @click="selectFunc(item)">
                        <span>{{item.day}}</span>
                    </button>

                </li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue, Emit} from 'vue-property-decorator';
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
    export default class Calendar extends Vue {



        private dateCtx : any = moment();
        private today : any = moment();

        public days : Array <string> = ['일', '월', '화', '수', '목', '금', '토'];
        public isSelected : string =  `${this.initialYear}-${this.initialMonth}-${this.initialDate}`;

        behaviorDay(item:any) : calendar.isHoliday {

            return {
                isActive : item.isActive,
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
        @Emit()
        selectFunc(item : any) : string {
            this.isSelected = item.fullString;
            return this.isSelected
        }
        chageMonth(num : number) : void {
            num > 0 ? this.dateCtx = moment(this.dateCtx).add(1, 'month')
                : this.dateCtx = moment(this.dateCtx).subtract(1, 'month');
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
            let firstDay = moment(this.dateCtx).subtract((parseInt(this.currentDate,10) - 1), 'days');

            return firstDay.weekday();
        }
        get initialDate() : string {

            return this.today.format('DD');
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
                    lunarCalendar : parseInt(lunar_stringExtract.substr(1)),
                    solarCalendar : parseInt(solar_stringExtract.substr(1)),
                    fullString : dateCtxFormat,
                    day : parseInt(dateCtxFormat.substr(8),10),
                    isActive : this.isSelected === dateCtxFormat,
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

            return arr
            // return this.dateCtx.daysInMonth();
        }


    }
</script>

<style scoped lang="scss">
.innerContent{
    width:50%;
    .week_sat{color:#FF4141}
    .week_sun{color:#0C71C0}
    .week_holiday_solar,.week_holiday_lunar{color:#FF4141}



    .weekdays{
        display:flex;justify-content:space-between;background: rgba(215,27,95,.5);padding:15px 0;
        li{float:left;color:#fff;width:calc(100%/7);text-align: center;box-sizing: border-box}
    }
    .dates{
        display: flex;flex-wrap: wrap;border:1px solid #ccc;border-top:0;
        li{
            width:calc(100%/7);text-align: center;position:relative;
            button{
                font-size: 15px;display: inline-block;width:100%;box-sizing:border-box;padding:25% 0;outline: none;
                &.disabled{pointer-events: none;color:#aaa}
            }
            .isActive{
                pointer-events: none;
                span{background: #d71b5f;color:#fff;display: inline-block;border-radius: 100%;width:36px;height:36px;text-align: center;
                    line-height: 36px;position: absolute;top:50%;left:50%;margin:-18px 0 0 -18px}
            }


            span.isActive{background: #d71b5f;color:#fff;display: inline-block;border-radius: 100%;width:36px;height:36px;text-align: center;
                line-height: 36px;position: absolute;top:50%;left:50%;margin:-18px 0 0 -18px}
            span.disabled{pointer-events: none;color:#aaa}

            .skip{visibility: hidden}
        }
    }
}

</style>