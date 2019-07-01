<template>
    <div class="roomContent">
        <room-photo />
        <room-name />
        <room-option />
        <room-info />
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import {Action, Getter} from 'vuex-class';

    import RoomPhoto from '@/components/roomType/roomContents/RoomPhoto.vue';
    import RoomName from '@/components/roomType/roomContents/RoomName.vue';
    import RoomOption from '@/components/roomType/roomContents/RoomOption.vue';
    import RoomInfo from '@/components/roomType/roomContents/RoomInfo.vue';

    @Component({
        components : {
            RoomPhoto,
            RoomName,
            RoomOption,
            RoomInfo
        }
    })
    export default class RoomContent extends Vue {

    }
</script>

<style scoped>

</style>