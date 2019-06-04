<template>
    <div id="reservedWrap">
        <calendar @select-func="selectFunc" />
        <Room-list :listData="listData" />
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import Calendar from '@/components/booking/Calendar.vue';
    import RoomList from '@/components/booking/RoomList.vue';
    import axios from '@/lib/axios';
    import moment from 'moment';

    @Component({
        components : {
            Calendar,
            RoomList
        }
    })
    export default class Booking extends Vue {
        private dateString : string = moment().format('YYYY-MM-DD')
        private listData : Array<object> = [];

        created() {
            this.initLoad()
        }
        selectFunc(v : string) : void {

            this.dateString = v
            this.initLoad()
        }
        async initLoad() {
            try {
                const result = await axios.get(`/properties/1/roomTypes?date=${this.dateString}`);
                this.listData = result.data



            }
            catch (e) {

            }
        }


    }
</script>

<style scoped>

</style>