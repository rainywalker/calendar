import { MutationTree } from 'vuex';
import { RoomTypesState } from '@/interface/store/roomTypes';


export const mutations : MutationTree<RoomTypesState> = {
    rommTypeDeal(state, {item,isChecked}) {
        if (isChecked) state.roomTypes.push(item);
        else {
            const index : number = state.roomTypes.indexOf(item)
            if (index >= 0) state.roomTypes.splice(index, 1)
        }

    }
}

