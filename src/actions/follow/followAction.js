import {LOAD_ALL_FOLLOW} from './actions-type';

export const loadFollow = (follows)=>{
	return function(dispatch){
		dispatch({
			type: LOAD_ALL_FOLLOW,
			payload: follows
		})
	}
}