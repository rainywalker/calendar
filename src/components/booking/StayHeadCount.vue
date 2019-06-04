<template>
    <tr class="stayHeadCount">
        <td>
            <select-box v-model="selected" @input="stayCount">
                <option v-for="(v,i) in stayCountData" :key="i" :value="v">{{v}}박</option>
            </select-box>
        </td>
        <td class="numberField"><input type="number" class="textField"></td>
        <td class="numberField"><input type="number" class="textField"></td>
        <td class="numberField"><input type="number" class="textField"></td>
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

        public stayCountData = [1,2,3];
        private selected : number = 1;

        stayCount(v : number) {
            console.log(v)
            this.selected = v
        }

    }
</script>

<style scoped lang="scss">
    td{text-align: center}
    .textField{padding:0 10px;border-radius: 2px;height:34px;border:1px solid #dbdbdb;box-sizing: border-box;
        font-size:15px;width:7rem;text-align: center}
    .stayHeadCount{
        &:first-child{
            td{padding-top:0}
        }
        td{padding-top:15px}
    }


</style>