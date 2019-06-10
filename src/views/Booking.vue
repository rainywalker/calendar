<template>
    <div id="reservedWrap">
        <calendar @select-func="selectFunc" />
        {{GetterCheckedList}}
        <Room-list :listData="GetterRoomList" />
        <div class="reserved">
            <button type="button" @click="reserving">예약하기</button>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import {Action, Getter} from 'vuex-class';
    import Calendar from '@/components/booking/Calendar.vue';
    import RoomList from '@/components/booking/RoomList.vue';

    import moment from 'moment';

    const namespace: string = 'booking';

    @Component({
        components : {
            Calendar,
            RoomList
        }
    })
    export default class Booking extends Vue {
        @Action('initLoads',{namespace}) actionInitLoad : any;
        @Getter('getRoomList', {namespace}) GetterRoomList : any;
        @Getter('getCheckdList',{namespace}) GetterCheckedList : any

        private dateString : string = moment().format('YYYY-MM-DD')
        private listData : Array<object> = [];

        created() {
            this.actionInitLoad(this.dateString)
        }
        selectFunc(v : string) : void {
            this.dateString = v
            this.actionInitLoad(this.dateString)
        }
        reserving() {
            console.log(this.$store.state.booking)
        }




    }
</script>

<style scoped lang="scss">
.reserved{
    text-align: center;padding:15px 0;
    button{font-size:15px;background: #d71b5f;color:#fff;padding:10px 15px;border-radius: 5px}
}
</style>