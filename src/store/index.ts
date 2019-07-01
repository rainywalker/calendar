import Vue from 'vue'
import Vuex from 'vuex'

import {booking} from './modules/booking';
import { RootState } from '@/interface/store/';

Vue.use(Vuex)


export default new Vuex.Store<RootState>({
    state : {
        currentDate : '',
        property : {
            propertyId : null,
            name : '',
            address : '',
            phoneNumbers : [],
            theme : {
                name : '',
                code : 0
            },
            notices : []
        }
    },
    mutations: {

    },
    actions: {

    },
    modules : {
        booking
    }
})
