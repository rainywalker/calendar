<template>
    <div id="reservedWrap">
        <div class="calendar">
            <calendar />

        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import Calendar from '@/components/Calendar.vue';

    @Component({
        components : {
            Calendar
        }
    })
    export default class Reserved extends Vue {



    }
</script>

<style scoped>

</style>