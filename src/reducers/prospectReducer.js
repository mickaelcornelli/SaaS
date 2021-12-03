import {LOAD_ALL_PROSPECT} from '../actions/prospect/actions-type';

const initialState = {
	prospects: []
}

const ProspectReducer = (state = initialState, action)=>{
	switch(action.type) {
		case LOAD_ALL_PROSPECT:
			return {prospects: action.payload};
		break;
	}
	return state
}

export default ProspectReducer;