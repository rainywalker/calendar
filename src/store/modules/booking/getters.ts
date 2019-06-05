import {GetterTree} from 'vuex';
import { RoomTypesState } from '@/interface/store/roomTypes';
import { RootState } from '@/interface/store/';

export const getters : GetterTree<RoomTypesState, RootState> = {
    getRoomList : state => state.roomTypes,
    getCheckdList : state => state.checkedArray,
    getRoomCount : state => state.totalCount
}