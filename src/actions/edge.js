import { CREATE_EDGE, DELETE_EDGE } from "./types";

export const createNewedge = (edge) => ({
  type: CREATE_EDGE,
  payload: edge,
});

export const deleteEdge = (edge) => ({
  type: DELETE_EDGE,
  payload: edge,
});