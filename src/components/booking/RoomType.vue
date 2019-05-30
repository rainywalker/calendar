<template>
    <div class="roomObject">
        <check-box :item="item" class="chk" :checked="checked" @change="onChange"></check-box>
        <div class="roomInfo">
            <div class="thumb">
                <figure class="centered">
                    <img src="https://s3.ap-northeast-2.amazonaws.com/rekonition-img/iu_6.JPG" alt="">
                </figure>
            </div>
            <dl class="specs">
                <dt>스탄다드스스파</dt>
                <dd>
                    <p>17평</p>
                    <p>기준 2명/최대 2</p>
                </dd>
            </dl>
            <select-count>
                <dt slot="dt">객실수</dt>
                <option value="d">1개</option>
                <option value="d">2개</option>
            </select-count>
            <div class="headCount">
                <stay-head-count />
            </div>
            <p class="totalPrice">222,220원</p>

        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Prop,Emit,Vue} from 'vue-property-decorator';
    import CheckBox from '@/components/form/CheckBox.vue';
    import StayHeadCount from '@/components/booking/StayHeadCount.vue'
    import SelectCount from '@/components/booking/SelectCount.vue'

    @Component({
        components : {
            StayHeadCount,
            SelectCount,
            CheckBox
        }
    })
    export default class RoomType extends Vue{
        @Prop({type:Object, required:true, default : {}}) item!:any;
        @Prop({type:Boolean, required:true, default : false }) checked!:boolean;

        @Emit('onChange')
        onChange({item,isChecked}:any) {
            return {
                item,
                isChecked
            }
        }

    }
</script>

<style scoped lang="scss">
    .roomObject{
        display: flex;align-items: center;
        .roomInfo {
            display: flex;align-items: center;
            .thumb{
                width:140px;height:84px;overflow: hidden;box-sizing: border-box;
                position: relative;margin-left:10px;
                .centered {
                    position: absolute; top: 0; left: 0; right: 0; bottom: 0; -webkit-transform: translate(50%,50%); -ms-transform: translate(50%,50%); transform: translate(50%,50%);
                    img{position: absolute; top: 0; left: 0; max-width: 100%; height: auto; -webkit-transform: translate(-50%,-50%); -ms-transform: translate(-50%,-50%); transform: translate(-50%,-50%);}
                }
            }
            .specs{margin-left:20px}
        }
        .headCount{
            display:flex;align-items: center;flex-wrap:wrap;

        }

    }
</style>