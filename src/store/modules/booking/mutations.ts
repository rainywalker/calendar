import { MutationTree } from 'vuex';
import { RoomTypesState } from '@/interface/store/roomTypes';


export const mutations : MutationTree<RoomTypesState> = {
    rommTypeDeal(state, {item,isChecked}) {

        if (isChecked) state.checkedArray.push(item);
        else {
            const index : number = state.checkedArray.indexOf(item)
            if (index >= 0) state.checkedArray.splice(index, 1)
        }

    },
    initLoad(state, {data, count}) {
        state.totalCount = count;
        state.roomTypes = data;
    }

}

