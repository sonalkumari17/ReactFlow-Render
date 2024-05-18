import { CREATE_EDGE, DELETE_EDGE } from "../actions/types";

const initialState = {
    edges: [],
};

const edgeReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_EDGE:
            console.log("action", action)
            return {
                ...state,
                edges: [...state.edges, action.payload],
            };
        case DELETE_EDGE:
            return {
                ...state,
                edges: action.payload
            };
        default:
            return state;
    }
}

export default edgeReducer;