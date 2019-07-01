<template>
    <div id="roomType">
        <room-content />
        <room-ctrl />
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import {Action, Getter} from 'vuex-class';

    import RoomContent from '@/components/roomType/roomContents/RoomContent.vue';
    import RoomCtrl from '@/components/roomType/roomCtrl/RoomCtrl.vue';


    const namespace: string = 'roomType';

    @Component({
        components : {
            RoomContent,
            RoomCtrl
        }
    })
    export default class RoomType extends Vue {
        @Action('getRoomType',{namespace}) actionGetRoomType : any;




    }
</script>

<style scoped lang="scss">

</style>