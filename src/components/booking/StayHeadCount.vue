<template>
    <tr class="stayHeadCount">
            <td>
                <select-box v-model="stayGuest.selectedDate" @input="stayCount">
                    <option v-for="(v,i) in stayCountData" :key="i" :value="v">{{v}}박</option>
                </select-box>
            </td>
            <td class="numberField"><input type="number" class="textField" v-model="stayGuest.guest.adult"></td>
            <td class="numberField"><input type="number" class="textField" v-model="stayGuest.guest.children"></td>
            <td class="numberField"><input type="number" class="textField" v-model="stayGuest.guest.infant"></td>
            <td class="numberField">{{stayGuest.salePrice}}원</td>
    </tr>

</template>

<script lang="ts">
    import {Component, Vue, Emit, Prop} from 'vue-property-decorator';
    import SelectBox from '@/components/form/SelectBox.vue';

    @Component({
        components : {
            SelectBox,
        }
    })
    export default class StayHeadCount extends Vue{
        @Prop(Object) stayGuest!:any;

        public stayCountData = [1,2,3];

        stayCount(v : number)  {
            this.stayGuest.selectedDate = v;
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