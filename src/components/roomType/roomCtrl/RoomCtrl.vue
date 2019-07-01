<template>
    <div class="roomCtrl">
        <check-in-out></check-in-out>
        <guests></guests>

    </div>
</template>

<script lang="ts">
    import {Vue, Component} from 'vue-property-decorator'
    import CheckInOut from '@/components/roomType/roomCtrl/CheckInOut.vue';
    import Guests from '@/components/roomType/roomCtrl/Guests.vue';

    @Component({
        components : {
            CheckInOut,
            Guests
        }
    })
    export default class RoomCtrl extends Vue {

    }
</script>

<style scoped>

</style>