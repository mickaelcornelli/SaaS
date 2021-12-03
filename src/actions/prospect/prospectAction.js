import {LOAD_ALL_PROSPECT} from './actions-type';

export const loadProspect = (prospects)=>{
	return function(dispatch){
		dispatch({
			type: LOAD_ALL_PROSPECT,
			payload: prospects
		})
	}
}