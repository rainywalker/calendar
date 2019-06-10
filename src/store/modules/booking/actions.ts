import { ActionTree } from 'vuex';
import { RootState } from '@/interface/store/';
import { RoomTypesState } from '@/interface/store/roomTypes';
import axios from '@/lib/axios';
import * as booking from '@/interface/booking';

export const actions : ActionTree<RoomTypesState, RootState> = {
    async initLoads({commit},payload) {
        try {
            const result = await axios.get(`/properties/1/roomTypes?date=${payload}`)
            const data = result.data;
            const arr : Array<object> = [];

            data.data.forEach((v:any) => {
                arr.push({
                    roomTypeId : v.roomTypeId,
                    name : v.name,
                    maxOccupancy : v.maxOccupancy,
                    minOccupancy : v.minOccupancy,
                    roomSize : v.roomSize,
                    photos : v.photos,
                    availability : v.rate.availability,
                    guest : {
                        adult : 0,
                        children : 0,
                        infant : 0
                    },
                    salePrice : v.rate.salePrice

                })
            })
            commit('initLoad',{data : arr,count: data.count})
        }
        catch (e) {
            console.log(e)
        }
    }
}

