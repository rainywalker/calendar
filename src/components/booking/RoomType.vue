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
            <dl>
                <dt>객실수</dt>
                <dd>
                    <select-box v-model="selected" @input="selectedValue">
                        <option v-for="(v,i) in optionsValue" :key="i" :value="v">{{v}}개</option>
                    </select-box>

                </dd>
            </dl>
            <div class="headCount">
                <table class="cntTable">
                    <thead>
                    <tr>
                        <th>기간</th>
                        <th>성인</th>
                        <th>아동</th>
                        <th>유아</th>
                    </tr>
                    </thead>
                    <tbody>
                        <stay-head-count></stay-head-count>
                    </tbody>
                </table>

            </div>
            <p class="totalPrice">222,220원</p>

        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Prop,Emit, Vue} from 'vue-property-decorator';
    import {Mutation} from 'vuex-class'
    import CheckBox from '@/components/form/CheckBox.vue';
    import StayHeadCount from '@/components/booking/StayHeadCount.vue'
    import SelectBox from '@/components/form/SelectBox.vue';

    const namespace: string = 'booking';


    @Component({
        components : {
            StayHeadCount,
            SelectBox,
            CheckBox
        }
    })
    export default class RoomType extends Vue{
        @Prop({type:Object, required:true, default : {}}) item!:any;
        @Prop({type:Boolean, required:true, default : false }) checked!:boolean;

        @Mutation('rommTypeDeal',{namespace}) storeRoomTypeDeal : any;


        private selected : string = '1';

        public optionsValue = ['1','2']

        selectedValue(v : string) {
            console.log(v)
            this.selected = v
        }
        onChange({item,isChecked}:any) {
            this.storeRoomTypeDeal({item,isChecked})

        }

    }
</script>

<style scoped lang="scss">
    .roomObject{
        display: flex;align-items: center;
        .roomInfo {
            display: flex;align-items: center;justify-content: space-between;
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

            .cntTable{

            }

        }

    }
</style>