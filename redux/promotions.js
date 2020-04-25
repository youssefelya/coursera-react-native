import * as ActionTypes from './ActionTypes';

const initialState = {
	isLoading: true,
	errMess: null,
	promotions: [],
};

export const promotions = (state = initialState, action) => {
	switch (action.type) {
		case ActionTypes.ADD_PROMS:
			return {
				...state,
				isLoading: false,
				errMess: null,
				promotions: action.pyload,
			};
		case ActionTypes.PROMS_LOADING:
			return { ...state, isLoading: true, errMess: null, promotions: [] };
		case ActionTypes.PROMS_FAILED:
			return {
				...state,
				isLoading: false,
				errMess: action.payload,
				promotions: [],
			};
		default:
			return state;
	}
};
