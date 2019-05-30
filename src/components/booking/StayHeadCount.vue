<template>
    <div class="inner">
        <select-count>
            <dt slot="dt">기간</dt>
            <option value="d">1박</option>
            <option value="d">2박</option>
        </select-count>
        <dl>
            <dt>성인</dt>
            <dd><input type="text" class="textField"></dd>
        </dl>
        <dl>
            <dt>아동</dt>
            <dd><input type="text" class="textField"></dd>
        </dl>
        <dl>
            <dt>유아</dt>
            <dd><input type="text" class="textField"></dd>
        </dl>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import SelectBox from '@/components/form/SelectBox.vue';
    import SelectCount from '@/components/booking/SelectCount.vue'

    @Component({
        components : {
            SelectBox,
            SelectCount
        }
    })
    export default class StayHeadCount extends Vue{

    }
</script>

<style scoped lang="scss">
    .inner{
        display: flex;
        .textField{padding:0 10px;border-radius: 2px;height:34px;border:1px solid #dbdbdb;box-sizing: border-box;
            font-size:15px;}
    }

</style>