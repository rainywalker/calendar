<template>
    <div class="roomObject">
        <check-box :item="item" class="chk" :checked="checked" @change="checkedValue"></check-box>
        <div class="roomInfo">
            <div class="thumb">
                <figure class="centered">
                    <img :src="item.photos[0].url" alt="">
                </figure>
                <button type="button" class="btn_more" @click="btnMore(item.photos)"><span class="blind">사진 더보기</span></button>
            </div>
            <dl class="specs">
                <dt>{{item.name}}</dt>
                <dd>
                    <p>{{parseInt(item.roomSize * 0.3025,10)}}평</p>
                    <p>기준 {{item.minOccupancy}}명/최대 {{item.maxOccupancy}}</p>
                </dd>
            </dl>
            <dl class="roomCount">
                <dt>객실수</dt>
                <dd>
                    <select-box v-model="selected" @input="roomCount">
                        <option v-for="n in item.availability" :key="n" :value="n">{{n}}개</option>
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
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                        <stay-head-count v-for="(val,i) in item.roomStayCountData" :stayGuest="val" :key="i"></stay-head-count>
                    </tbody>
                </table>
            </div>
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

        private selected : number = 1;

        roomCount(v : number) {
            this.selected = v;
            const arr = []
            for (let i=0; i<this.selected; i++) {
                arr.push({
                    guest : {
                        adult : '',
                        children : '',
                        infant : ''
                    },
                    selectedDate : 1,
                    salePrice : this.item.salePrice
                })
            }
            this.item.roomStayCountData = [...arr]
        }
        btnMore(arr : Array<object>) {
            console.log(arr)
        }
        checkedValue({item,isChecked}:any) {
            this.storeRoomTypeDeal({item,isChecked})

        }

    }
</script>

<style scoped lang="scss">
    .roomObject{
        display: flex;align-items: center;
        .chk{}
        .roomInfo {
            display: flex;align-items: center;width:100%;justify-content: space-between;
            .thumb{
                width:140px;height:84px;overflow: hidden;box-sizing: border-box;
                position: relative;margin-left:10px;
                &:after{display: block;position: absolute;left:0;top:0;right:0;bottom:0;border:1px solid rgba(0,0,0,.2);z-index: 1;content: ''}
                .centered {
                    position: absolute; top: 0; left: 0; right: 0; bottom: 0; -webkit-transform: translate(50%,50%); -ms-transform: translate(50%,50%); transform: translate(50%,50%);
                    img{position: absolute; top: 0; left: 0; max-width: 100%; height: auto; -webkit-transform: translate(-50%,-50%); -ms-transform: translate(-50%,-50%); transform: translate(-50%,-50%);}
                }
                .btn_more{
                    position: absolute;left:0;top:0;bottom:0;right: 0;z-index: 10;display: block;width:100%;box-sizing: border-box;
                }
            }
            .specs{margin-left:20px}
        }
        .roomCount{
            dt{text-align: center;padding-bottom:10px}
        }
        .headCount{
            width:50%;
            .cntTable{
                width:100%;
                th{text-align: center;padding-bottom:10px}


            }
        }
    }
</style>