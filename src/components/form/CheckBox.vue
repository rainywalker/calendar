<template>
    <label class="customCtrl">
        <input type="checkbox" :value="item" :checked="checked" @change="updatedValue(item,$event)">
        <span class="off" v-if="checked === false"><i class="far fa-square chkOff"></i></span>
        <span class="on" v-else><i class="fas fa-check-square chkOn"></i></span>
    </label>
</template>

<script lang="ts">
    import {Component,Prop ,Emit,Vue} from 'vue-property-decorator'


    @Component
    export default class CheckBox extends Vue{
        @Prop({type:Object, required:true, default : {}}) item!:any;
        @Prop({type:Boolean, required:true, default : false }) checked!:boolean;

        @Emit('change')
        updatedValue(item : object, event : any) {
            // this.$store.dispatch('updatedValue',{item,isChecked : event.target.checked})
            return {
                item : item,
                isChecked : event.target.checked
            }
        }
    }
</script>

<style scoped lang="scss">
    .customCtrl{
        display: inline-block;cursor: pointer;
        input[type="checkbox"]{position: absolute;z-index: -1;opacity: 0}
        .chkOn{font-size: 20px;color:#d71b5f}
        .chkOff{font-size: 20px;color:#d71b5f}
    }
</style>