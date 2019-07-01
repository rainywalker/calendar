<template>
    <div class="checkInOut">
        <dl>
            <dt>날짜</dt>
            <dd>
                {{checkInOut}}
                <div class="datePickerArea">
                    <input type="text" class="datepicker" placeholder="년/월/일" ref="checkIn" v-model="checkInOut.checkIn" readonly @click="showHideCalendar(true)">
                    <span>-</span>
                    <input type="text" class="datepicker" placeholder="년/월/일" ref="checkOut" v-model="checkInOut.checkOut" readonly @click="showHideCalendar(false)">
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
                        clickedOnExcludedEl = excludedEl.contains(e.target)
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
        onClose () {
            this.seen = false
        }

        selectFunc(obj : any) {
            if (obj.isCheckIn) {
                this.checkInOut.checkIn = obj.checkIn;
                this.seen = false;
                // (this.$refs.checkOut as HTMLElement).focus()


            }
            else {
                this.checkInOut.checkOut = obj.checkOut;
                this.seen = false;
            }

        }

        showHideCalendar(flag : boolean) {


            if (flag) {
                this.seen = true
                this.checkInOut.isCheckIn = true
                this.checkInOut.isCheckOut = false;
            }
            else {
                this.seen = true
                this.checkInOut.isCheckOut = true;
                this.checkInOut.isCheckIn = false

            }

        }

    }



</script>

<style scoped lang="scss">
    .mini{width:400px;min-height:150px}
</style>