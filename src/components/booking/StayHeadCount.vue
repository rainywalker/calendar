<template>
    <tr>
        <td>
            <select-box>
                <option value="1">1박</option>
                <option value="1">2박</option>
            </select-box>
        </td>
        <td><input type="text" class="textField"></td>
        <td><input type="text" class="textField"></td>
        <td><input type="text" class="textField"></td>
    </tr>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import SelectBox from '@/components/form/SelectBox.vue';

    @Component({
        components : {
            SelectBox,
        }
    })
    export default class StayHeadCount extends Vue{

    }
</script>

<style scoped lang="scss">
    .textField{padding:0 10px;border-radius: 2px;height:34px;border:1px solid #dbdbdb;box-sizing: border-box;
        font-size:15px;}


</style>