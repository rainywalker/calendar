<template>
    <div class="checkInOut">
        {{checkInOut}}
        <dl>
            <dt>날짜</dt>
            <dd>
                <div class="datePickerArea">
                    <input type="text" class="datepicker" placeholder="년/월/일" ref="checkIn" v-model="checkInOut.checkIn" readonly @click="showHideCalendar('in')">
                    <span>-</span>
                    <input type="text" class="datepicker" placeholder="년/월/일" ref="checkOut" v-model="checkInOut.checkOut" readonly @click="showHideCalendar('out')">
                </div>
                <date-picker
                        class="mini"
                        v-closable="{
                          exclude: ['checkIn','checkOut'],
                          handler: 'onClose'
                        }"
                        v-if="seen" @select-func="selectFunc"  :checkInOut="checkInOut"></date-picker>
            </dd>
        </dl>
    </div>
</template>

<script lang="ts">
    import {Vue, Component} from 'vue-property-decorator'
    import DatePicker from '@/components/DatePicker.vue';

    interface checkInOut {
        isCheckIn : boolean,
        isCheckOut : boolean,
        checkIn : string,
        checkOut : string
    }
    let handleOutsideClick : any;

    Vue.directive('closable',{
        bind (el, binding, vnode : any) {
            handleOutsideClick = (e : any) => {
                e.stopPropagation()

                const { handler, exclude } = binding.value;
                let clickedOnExcludedEl = false;

                exclude.forEach((refName:string) => {
                    if (!clickedOnExcludedEl) {
                        const excludedEl = vnode.context.$refs[refName]
                        if (excludedEl !== undefined) {
                            clickedOnExcludedEl = excludedEl.contains(e.target)
                        }


                    }
                });

                if (!el.contains(e.target) && !clickedOnExcludedEl) {
                    vnode.context[handler]()
                }
            };
            document.addEventListener('click', handleOutsideClick)
            document.addEventListener('touchstart', handleOutsideClick)
        },

        unbind () {
            document.removeEventListener('click', handleOutsideClick)
            document.removeEventListener('touchstart', handleOutsideClick)
        }
    })

    @Component({
        components : {
            DatePicker
        }
    })
    export default class CheckInOut extends Vue {

        public checkInOut : checkInOut = {
            isCheckIn : false,
            isCheckOut : false,
            checkIn : '',
            checkOut : ''
        };

        public seen : boolean = false;

        onClose (e:any) {

            this.checkInOut.isCheckIn = false
            this.checkInOut.isCheckOut = false
            this.seen = false
        }

        selectFunc(obj : checkInOut) {

            obj.isCheckIn ? this.showHideCalendar('out') : this.checkInOut.isCheckOut = false;

            if (!this.checkInOut.isCheckIn && !this.checkInOut.isCheckOut) {
                this.checkInOut.checkOut !== '' ? this.seen = false :  this.checkInOut.isCheckOut = true;
            }

        }

        showHideCalendar(str : string) {

            this.seen = true;

            if (str === 'in') {
                this.checkInOut.isCheckIn = true
                this.checkInOut.isCheckOut = false;
            }
            else {
                this.checkInOut.isCheckIn = false;
                this.checkInOut.isCheckOut = true;
            }
        }

    }



</script>

<style scoped lang="scss">
    .mini{width:400px;min-height:150px}
</style>