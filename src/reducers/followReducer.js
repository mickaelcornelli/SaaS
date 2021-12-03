import {LOAD_ALL_FOLLOW} from '../actions/follow/actions-type';

const initialState = {
	follows: []
}

const FollowReducer = (state = initialState, action) =>{
	switch(action.type){
		case LOAD_ALL_FOLLOW:
			return {follows: action.payload};
		break;
	}
	return state;
}

export default FollowReducer;