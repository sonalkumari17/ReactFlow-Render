import { CREATE_NODE, DELETE_NODE, UPDATE_NODE } from "../actions/types";

const initialState = {
    nodes: [],
};

const nodeReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_NODE:
            console.log("action", action)
            return {
                ...state,
                nodes: [...state.nodes, action.payload],
            };
        case DELETE_NODE:
            return {
                ...state,
                nodes: action.payload
            };
        case UPDATE_NODE:
            return {
                ...state,
                nodes: [...state.nodes, action.payload],
            };

        default:
            return state;
    }
}

export default nodeReducer;