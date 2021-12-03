import {LOAD_RDV} from './actions-type';

export const loadRdv = (rdv)=>{
	return function(dispatch) {
		dispatch({
			type: LOAD_RDV,
			payload: rdv
		})
	}
}