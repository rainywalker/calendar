<template>
    <div class="bodyWrap">
        <calendar/>

    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import Calendar from '@/components/booking/Calendar.vue';

    @Component({
        components : {
            Calendar
        }
    })
    export default class BodyWrap extends Vue {

    }
</script>

<style scoped lang="scss">

.calendarTbl{
    width:100%;
}
</style>