import { combineReducers } from "redux";
import UserReducer from './userReducer';
import RdvReducer from './rdvReducer'
import ProspectReducer from './prospectReducer';
import FollowReducer from './followReducer';

const rootReducer = combineReducers({
    user: UserReducer,
    rdv: RdvReducer,
    prospects: ProspectReducer,
    follows: FollowReducer
})

export default rootReducer;