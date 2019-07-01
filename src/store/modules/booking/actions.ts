import { ActionTree } from 'vuex';
import { RootState } from '@/interface/store/';
import { RoomTypesState } from '@/interface/store/roomTypes';
import axios from '@/lib/axios';

export const actions : ActionTree<RoomTypesState, RootState> = {
    async initLoads({commit},payload) {
        try {
            const result = await axios.get(`/properties/3002411/roomTypes?startDate=${payload}`)
            const data = result.data;
            console.log(data)
            const arr : Array<object> = [];

            data.data.forEach((v:any) => {
                arr.push({
                    roomTypeId : v.roomTypeId,
                    name : v.name,
                    maxOccupancy : v.maxOccupancy,
                    minOccupancy : v.minOccupancy,
                    roomSize : v.roomSize,
                    photos : v.photos,
                    availability : 2,
                    salePrice : v.rate.salePrice,


                    roomStayCountData : [{
                        guest : {
                            adult : 0,
                            children : 0,
                            infant : 0
                        },
                        selectedDate : 3,
                        salePrice : v.rate.salePrice
                    }]


                })
            })
            commit('initLoad',{data : arr,count: data.count})
        }
        catch (e) {
            console.log(e)
        }
    }
}

