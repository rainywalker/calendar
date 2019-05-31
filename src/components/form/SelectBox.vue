<template>
    <div class="select">
        <select @change="onChange($event.target.value)">
            <slot></slot>
        </select>
    </div>
</template>

<script lang="ts">
    import {Component, Model, Prop, Vue} from 'vue-property-decorator';

    @Component
    export default class SelectBox extends Vue{
        @Model('change',{type:String}) value! : string
        private selectValue : string = '1'
        onChange(v : string) {
            this.selectValue = v;
            this.$emit('input',this.selectValue)
        }


    }
</script>

<style scoped lang="scss">
    .select{
        display: inline-block;
        max-width: 100%;
        position: relative;
        vertical-align: top;
        height: 34px;
        select{
            -webkit-appearance: none;align-items: center;border: 1px solid transparent;box-shadow: none;height:34px;
            justify-content: flex-start;line-height: 1.5;padding-bottom: calc(.375em - 1px);
            padding-left: calc(.725em - 1px);padding-top: calc(.375em - 1px);position: relative;
            vertical-align: top;background-color: #fff;border-color: #dbdbdb;border-radius: 2px;color: #363636;
            cursor: pointer;display: block;font-size: 1em;max-width: 100%;outline: 0;padding-right: 2.5em;
        }
        &:after{
            border: 3px solid transparent;border-radius: 2px;border-right: 0;border-top: 0;content: " ";display: block;
            height: .525em;margin-top: -.4375em;pointer-events: none;position: absolute;top: 50%;transform: rotate(-45deg);
            transform-origin: center;width: .525em;border-color: #3273dc;right: 1.125em;z-index: 4;
        }
    }

</style>