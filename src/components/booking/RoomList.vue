<template>
    <div class="roomList">
        <h2>객실선택</h2>
        {{checkRoomList}}
        <ul class="lst">
            <li v-for="item in checkRooms" :key="item.id">
                <room-type :item="item" :checked="checkRoomList.includes(item)" @onChange="onChange"></room-type>
            </li>
        </ul>

    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator'
    import RoomType from '@/components/booking/RoomType.vue'


    @Component({
        components : {
            RoomType,
        }
    })
    export default class RoomList extends Vue {
        public checkRoomList:any = []
        public checkRooms =  [
            { id: 0, text: 'filter_a' },
            { id: 1, text: 'filter_b' },
            { id: 2, text: 'filter_c' },
        ];

        onChange({item,isChecked}:any) {
            if (isChecked) this.checkRoomList.push(item);
            else {
                const index : number = this.checkRoomList.indexOf(item)
                if (index >= 0) this.checkRoomList.splice(index, 1)
            }
        }
    }
</script>

<style scoped lang="scss">
.roomList{
    margin-top:42px;
    .lst{margin-top:20px;border-top:1px solid #929292}
    li{border-bottom:1px solid #e5e5e5;padding:15px 0}

}

</style>