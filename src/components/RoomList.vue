<template>
    <div class="roomList">
        <h2>객실선택</h2>
        <ul>
            <li v-for="item in checkRooms" :key="item.id">
                <div class="roomObject">
                    <check-box :item="item" :checked="checkRoomList.includes(item)" @change="onChange"></check-box>

                </div>

            </li>
        </ul>
        {{checkRoomList}}
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator'
    import CheckBox from '@/components/form/CheckBox.vue';

    @Component({
        components : {
            CheckBox
        }
    })
    export default class RoomList extends Vue {
        public checkRoomList:any = []
        public checkRooms =  [
            { id: 0, text: 'filter_a' },
            { id: 1, text: 'filter_b' },
            { id: 2, text: 'filter_c' },
            { id: 3, text: 'filter_d' },
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
}

</style>