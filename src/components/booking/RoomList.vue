<template>
    <div class="roomList">
        <h2>객실선택</h2>
        {{GetterCheckedList}}
        <ul class="lst">
            <li v-for="item in GetterRoomList" :key="item.id">
                <room-type :item="item" :checked="GetterCheckedList.includes(item)"></room-type>
            </li>
        </ul>

    </div>
</template>

<script lang="ts">
    import {Component, Prop,Vue} from 'vue-property-decorator';
    import {Getter} from 'vuex-class';
    import RoomType from '@/components/booking/RoomType.vue'

    const namespace: string = 'booking';
    @Component({
        components : {
            RoomType,
        }
    })
    export default class RoomList extends Vue {
        @Getter('getCheckdList',{namespace}) GetterCheckedList : any;
        @Getter('getRoomList', {namespace}) GetterRoomList : any;



    }
</script>

<style scoped lang="scss">
.roomList{
    margin-top:42px;
    .lst{margin-top:20px;border-top:1px solid #929292}
    li{border-bottom:1px solid #e5e5e5;padding:15px 0}

}

</style>