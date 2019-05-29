<template>
    <div id="reservedWrap">
        <calendar />
        <Room-list />
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import Calendar from '@/components/Calendar.vue';
    import RoomList from '@/components/RoomList.vue';

    @Component({
        components : {
            Calendar,
            RoomList
        }
    })
    export default class Reserved extends Vue {



    }
</script>

<style scoped>

</style>