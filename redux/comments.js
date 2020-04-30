import * as ActionTypes from './ActionTypes';

const initialState = {
	isLoading: true,
	errMess: null,
	comments: [],
};

export const comments = (state = initialState, action) => {
	switch (action.type) {
		case ActionTypes.ADD_COMMENTS:
			return {
				...state,
				isLoading: false,
				errMess: null,
				comments: action.payload,
			}
		case ActionTypes.COMMENTS_FAILED:
			return {
				...state,
				isLoading: false,
				errMess: action.payload,
				comments: [],
			};
		// case  ActionTypes.ADD_COMMENT : 
		//    return {
		// 	   ...state,
		// 	   isLoading: false,
		// 	   errMess: null,
		// 	   comments:[...comments, action.payload]
		//    }
		default:
			return state;
	}
};
