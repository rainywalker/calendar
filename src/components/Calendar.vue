<template>
    <div class="calendarWrap">
        <div class="innerContent">
            <div class="years">
                <button type="button" class="btn prev" @click="chageMonth(-1)"><i class="fas fa-chevron-left"></i></button>
                <div class="tx">
                    <p>{{year}}</p>
                    <p>{{month}}</p>
                </div>
                <button type="button" class="btn next" @click="chageMonth(1)"><i class="fas fa-chevron-right"></i></button>
            </div>
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
                            class="dateNum" :class="[initActive(item),disabledDay(item),holidays(item)]"
                            @click="selectFunc(item)">
                        <span >{{item}}</span>
                    </button>

                </li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import moment from 'moment';
    import 'moment-lunar';
    import "moment/locale/ko";

    interface i_weekObj {
        week_sat : boolean,
        week_sun : boolean,
        week_holiday? : boolean
    }
    interface holidayData {
        solarDay :  Array<number>,
        lunarDay : Array<number>
    }
    class Iterator {
        _data: any;

        [Symbol.iterator](){
            return this
        }
        constructor(data : any) {
            this._data = data

        }
        next() {
            return {
                done : this._data.length === 0,
                value : this._data.shift()
            }
        }
    }
    const holidayData : holidayData = {
        solarDay : [101,301,505,606,815,1003,1009,1225],
        lunarDay : [1230,101,102,408,814,815,816]
    };

    const iteratorSolar = new Iterator(holidayData.solarDay);

    @Component
    export default class Calendar extends Vue {
        private dateCtx : any = moment();
        private today : any = moment();

        public days : Array <string> = ['일', '월', '화', '수', '목', '금', '토'];
        public isSelected : string =  `${this.initialYear}${this.initialMonth}${this.initialDate}`;

        public holidayData : holidayData = {
            solarDay : [101,301,505,606,815,1003,1009,1225],
            lunarDay : [1230,101,102,408,814,815,816]
        };

        weekEnd(num : number) : object{

            const weekObj : i_weekObj = {
                week_sat : false,
                week_sun : false
            };

            if (num === 0) weekObj.week_sat = true;
            if (num === 6) weekObj.week_sun = true;


            return weekObj
        }

        iteratorLoop(iter : any, f : Function, lunar : string, solar : string) {

            const weekObj : i_weekObj = {
                week_sat : false,
                week_sun : false,
                week_holiday : false
            };

            while(true) {
                const v = iter.next();
                if(v.done) return;
                if (solar === v.value) {
                    console.log('x')
                    weekObj.week_holiday = true
                    return weekObj
                }

            }
        }

        holidays(item : number)  {

            const currentDate = `${this.year}-${this.month}-${item}`;
            const ctx = moment(currentDate,'YYYYMDD');
            const lunar_stringExtract : string = ctx.lunar().format('YYYYMDD').substring(4);
            const solar_stringExtract : string = ctx.solar().format('YYYYMDD').substring(4);

            const weekObj : i_weekObj = {
                week_sat : false,
                week_sun : false,
                week_holiday : false
            };

            if (ctx.day() === 0) weekObj.week_sat = true;
            if(ctx.day() === 6) weekObj.week_sun = true;

            // console.log(ctx.format('d'));

            this.iteratorLoop(iteratorSolar,console.log,lunar_stringExtract,solar_stringExtract)




            // this.holidayData.solarDay.forEach((v : number) => {
            //
            //     if (v.toString() === solar_stringExtract) {
            //         weekObj.week_holiday = true
            //     }
            // });
            // this.holidayData.lunarDay.forEach((v : number) => {
            //     if (v.toString() === lunar_stringExtract) {
            //         weekObj.week_holiday = true
            //     }
            // });
            //
            //
            // return weekObj



        }
        selectFunc(item : number) : void {
            const currentDate = `${this.year}-${this.month}-${item}`
            const ctx = moment(currentDate,'YYYYMDD')
            this.isSelected = ctx.format('YYYYMDD')
        }

        chageMonth(num : number) : void {

            num > 0 ? this.dateCtx = moment(this.dateCtx).add(1, 'month')
                : this.dateCtx = moment(this.dateCtx).subtract(1, 'month');

        }
        initActive(item :  number) : object{
            const currentDate = `${this.year}${this.month}${item}`;
            return {
                isActive : (this.isSelected === currentDate)
            }

        }
        disabledDay(days : number)  {

            let tempDays:string = days.toString();
            if (days < 10) {
                tempDays = `0${days}`;
            }

            const initialDate : number = parseInt(`${this.initialYear}${this.initialMonth}${this.currentDate}`);
            const flexDate : number = parseInt(`${this.year}${this.month}${tempDays}`);

            if (initialDate > flexDate) {
                return {
                    disabled:true
                }
            }
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
        get daysInMonth () : number {
            return this.dateCtx.daysInMonth();
        }

    }
</script>

<style scoped lang="scss">
.innerContent{
    width:50%;
    .week_sat{color:#FF4141}
    .week_sun{color:#0C71C0}
    .week_holiday{color:#FF4141}


    .years{
        display:flex;justify-content:space-between;align-items:center;background: #d71b5f;color:#fff;text-align: center;padding:10px 20px;
        .btn{display:inline-block;padding:5px;color:#fff;font-size: 20px}
    }
    .weekdays{
        display:flex;justify-content:space-between;background: rgba(215,27,95,.5);padding:10px 0;
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
            .skip{visibility: hidden}
        }
    }
}

</style>