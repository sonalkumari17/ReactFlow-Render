import { CREATE_NODE, DELETE_NODE, UPDATE_NODE } from "./types";

export const createNewNode = (nodes) => ({
  type: CREATE_NODE,
  payload: nodes,
});

export const deleteNode = (nodes) => ({
  type: DELETE_NODE,
  payload: nodes,
});

export const updateNodes = (node) => ({
  type: UPDATE_NODE,
  payload: node,
});
