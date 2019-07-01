
import { Module } from 'vuex';
// import { getters } from './getters';
// import { actions } from './actions';
// import { mutations } from './mutations';

import { RoomTypesState } from '@/interface/store/roomTypes';
import { RootState } from '@/interface/store/';


export const state : RoomTypesState  = {
    roomTypes: [],
    totalCount : 0,
    checkedArray : []
};

const namespaced: boolean = true;

export const booking: Module<RoomTypesState, RootState> = {
    namespaced,
    state,
    // getters,
    // actions,
    // mutations
};
