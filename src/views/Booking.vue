<template>
    <div id="reservedWrap">
        <calendar />
        <Room-list />
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import Calendar from '@/components/booking/Calendar.vue';
    import RoomList from '@/components/booking/RoomList.vue';

    @Component({
        components : {
            Calendar,
            RoomList
        }
    })
    export default class Booking extends Vue {



    }
</script>

<style scoped>

</style>