import { ActionTree } from 'vuex';
import { RootState } from '@/interface/store/';
import { RoomTypesState } from '@/interface/store/roomTypes';
import axios from '@/lib/axios';

export const actions : ActionTree<RoomTypesState, RootState> = {
    async initLoads({commit},payload) {
        try {
            const result = await axios.get(`/properties/1/roomTypes?date=${payload}`)
            const data = result.data;
            commit('initLoad',data)
        }
        catch (e) {
            console.log(e)
        }
    }
}

