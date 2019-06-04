<template>
    <div class="roomList">
        <h2>객실선택</h2>

        {{$store.state.booking.roomTypes}}
        <ul class="lst">
            <li v-for="item in listData.data" :key="item.id">
                <room-type :item="item" :checked="$store.state.booking.roomTypes.includes(item)"></room-type>
            </li>
        </ul>

    </div>
</template>

<script lang="ts">
    import {Component, Prop,Vue} from 'vue-property-decorator'
    import RoomType from '@/components/booking/RoomType.vue'


    @Component({
        components : {
            RoomType,
        }
    })
    export default class RoomList extends Vue {
        @Prop([Array, Object]) listData! : [] | object;

        public checkRooms =  [
            { id: 0, text: 'filter_a' },
            { id: 1, text: 'filter_b' },
            { id: 2, text: 'filter_c' },
        ];
    }
</script>

<style scoped lang="scss">
.roomList{
    margin-top:42px;
    .lst{margin-top:20px;border-top:1px solid #929292}
    li{border-bottom:1px solid #e5e5e5;padding:15px 0}

}

</style>