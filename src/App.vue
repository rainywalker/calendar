<template>
    <div id="app">
        <gnb :routeURI="routeURI" />
        <transition name="fade" mode="out-in">
            <router-view/>
        </transition>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import Gnb from '@/components/Gnb.vue';
    import axios from '@/lib/axios';

    interface uri {
        label : string,
        uri : string
    }

    @Component({
        components : {
            Gnb
        }
    })
    export default class App extends Vue {

        public $http: any;
        private created() {
            this.initLoad()
        }
        private routeURI : Array<uri> = [
            {
                label : '예약달력',
                uri : '/'
            },
            {
                label : '예약하기',
                uri : '/reserved'
            },
            {
                label : '예약확인',
                uri : '/getReserved'
            },
            {
                label : '요금안내',
                uri : '/price'
            }
        ]
        async initLoad() {
            try {
                const result = await axios.get('/DFSROOT/POINT/DATA/top.json.txt');
                console.log(result.data)

            }
            catch (e) {

            }
        }

    }
</script>

<style lang="scss">
    @import './assets/style/common.scss';
    .fade-enter-active, .fade-leave-active {
        transition: all 0.3s ease;
    }
    .fade-enter, .fade-leave-active {
        opacity: 0;
        transform: translateX(-5%);
    }

</style>
