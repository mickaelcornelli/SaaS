import {LOAD_RDV} from '../actions/rdv/actions-type';

const initialState = {
	rdv: []
}

const RdvReducer = (state = initialState, action)=>{
	switch(action.type) {
		case LOAD_RDV:
			return {rdv: action.payload};
		break;
	}
	return state
}

export default RdvReducer;