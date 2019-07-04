<template>
    <div class="years">
        <button type="button" class="btn prev" @click="chageMonth(-1)"><i class="fas fa-chevron-left"></i></button>
        <div class="tx">
            <p>{{year}}년</p>
            <p>{{month}}월</p>
        </div>
        <button type="button" class="btn next" @click="chageMonth(1)"><i class="fas fa-chevron-right"></i></button>
    </div>
</template>

<script lang="ts">
    import {Component, Vue, Emit,Prop} from 'vue-property-decorator';

    @Component
    export default class CalendarCtrl extends Vue {
        @Prop({type:String, required:true}) year!:string;
        @Prop({type:String, required:true}) month!:string;
        @Prop({type:Object, required:true}) dateCtx!:any;

        @Emit('chageMonth')
        chageMonth(num : number) : number {
            return num
        }
    }
</script>

<style scoped lang="scss">
.years{
    display: flex;justify-content: center;font-size: 20px;margin-bottom:20px;
    .tx{
        display: flex;margin:0 20px;align-items: center;
        p:first-child{margin-right:10px}
    }
    .btn{
        display: block;width:30px;height:30px;
        i{font-size: 1.3em;color:#53627e}
        &.prev{}
        &.next{}
    }
}
</style>