<template>
    <div id="reserving">
        <h2>객실선택</h2>
        <table class="tblReserving">
            <thead>
            <tr>
                <th>객실명</th>
                <th>기간</th>
                <th>인원설정</th>
                <th>금액</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in GetterCheckedList" :key="item.roomTypeId">
                <td></td>
                <td></td>
                <td>{{item.guest}}</td>
                <td>{{item.salePrice}}</td>
            </tr>
            </tbody>
        </table>
        {{GetterCheckedList}}
    </div>
</template>

<script lang="ts">
    import {Vue, Component} from 'vue-property-decorator';
    import {Getter} from 'vuex-class';

    const namespace : string = 'booking';

    @Component
    export default class Reserving extends Vue {
        @Getter('getCheckdList',{namespace}) GetterCheckedList : any;

    }
</script>

<style scoped lang="scss">
    .tblReserving{
        width:100%
    }

</style>