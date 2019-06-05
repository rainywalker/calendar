<template>
    <tr class="stayHeadCount">
        <td>
            <select-box v-model="selected" @input="stayCount">
                <option v-for="(v,i) in stayCountData" :key="i" :value="v">{{v}}박</option>
            </select-box>
        </td>
        <td class="numberField"><input type="number" class="textField" v-model="guests.adult"></td>
        <td class="numberField"><input type="number" class="textField" v-model="guests.children"></td>
        <td class="numberField"><input type="number" class="textField" v-model="guests.infant"></td>
    </tr>

</template>

<script lang="ts">
    import {Component, Vue, Watch} from 'vue-property-decorator';
    import SelectBox from '@/components/form/SelectBox.vue';

    @Component({
        components : {
            SelectBox,
        }
    })
    export default class StayHeadCount extends Vue{
        private selected : number = 1;
        public stayCountData = [1,2,3];

        public guests = {
            adult : '',
            children : '',
            infant : ''
        };
        @Watch('guests', { immediate: false, deep: true })
        onChildChanged(val: any, oldVar : string) {
            console.log(val.adult)
        }


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