<template>
    <div class="calendarWrap">
        <div class="innerContent">
            <div class="years">
                <p>{{year}}</p>
                <p>{{month}}</p>
            </div>
            <ul class="weekdays">
                <li v-for="(day,i) in days" :key="i">
                    <span class="days">{{day}}</span>
                </li>
            </ul>
            <ul class="dates">

                <li v-for="(blank, index) in firstDayOfMonth" :key="'_'+index">
                    <button type="button" class="skip">{{blank}}</button>
                </li>
                <li v-for="(item,idx) in daysInMonth" :key="idx">
                    <button type="button" class="dateNum" :class="{
                        'current-day': isSelected === idx+1,
                        'disabled' : item < initialDate
                        }"
                            @click="changeDay(item)">
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

    @Component
    export default class Calendar extends Vue {
        private dateCtx : any = moment();
        private today : any = moment();
        public days : Array<string> = ['일', '월', '화', '수', '목', '금', '토'];
        public isSelected : number =  this.initialDate;

        private changeDay(item : number) {
            this.isSelected = item
        }
        currentDateValidate(item : number) : boolean {
            return (item === this.initialDate && this.month === this.initialMonth && this.year === this.initialYear)
        }
        get year() : string {
            return this.dateCtx.format('Y')
        }
        get month() : string {
            return this.dateCtx.format('M');
        }
        get currentDate() : number {
            return this.dateCtx.get('date');
        }
        get firstDayOfMonth() : number {
            let firstDay = moment(this.dateCtx).subtract((this.currentDate - 1), 'days');

            return firstDay.weekday();
        }
        get initialDate() : number {

            return this.today.get('date');
        }
        get initialMonth() : string {
            return this.today.format('M');
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
    .years{background: #d71b5f;color:#fff;text-align: center;padding:10px 0}
    .weekdays{
        display:flex;justify-content:space-between;background: rgba(215,27,95,.5);padding:10px 0;
        li{float:left;color:#fff;width:calc(100%/7);text-align: center;box-sizing: border-box}
    }
    .dates{
        display: flex;flex-wrap: wrap;
        li{
            width:calc(100%/7);text-align: center;position:relative;
            button{
                font-size: 15px;display: inline-block;width:100%;box-sizing:border-box;padding:25% 0;outline: none;
                &.disabled{pointer-events: none;color:#aaa}
            }
            .current-day{
                pointer-events: none;
                span{background: #d71b5f;color:#fff;display: inline-block;border-radius: 100%;width:36px;height:36px;text-align: center;
                    line-height: 36px;position: absolute;top:50%;left:50%;margin:-18px 0 0 -18px}

            }
            .skip{visibility: hidden}


        }
    }
}

</style>