import React, { useState } from "react";
import { Button } from "@material-ui/core";
import ClearIcon from '@material-ui/icons/Clear';
import { useDispatch, useSelector } from "react-redux";
import { deleteNode, updateNodes } from "../actions/node";
import TextField from '@mui/material/TextField';
import { Handle, Position } from "reactflow";

const NodeRfc = ({ id, data }) => {
  const dispatch = useDispatch();
  const nodes = useSelector((state) => state.nodes);
  const [hovered, setHovered] = useState(false);
  const [selectedNode, setSelectedNode] = useState(null);
  const [nodeTitle, setNodeTitle] = useState("");

  const onNodeClick = () => {
    setSelectedNode(data);
    setNodeTitle(data.label || "");
  };

  const onSave = () => {
    let setNodes = [...nodes.filter(nodes => nodes.id === id)];
    let updatedNode = {
      id: setNodes[0].id,
      data: { label: nodeTitle },
      type: setNodes[0].type,
      position: setNodes[0].position
    }
    setNodeTitle("");
    removeNode();
    dispatch(updateNodes(updatedNode));
    setSelectedNode(null);
  };

  const onCancel = () => {
    setSelectedNode(null);
    setNodeTitle("");
  };

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const removeNode = () => {
    console.log('ID of node to be deleted', nodes.id)
    const setNodes = nodes.filter(nodes => nodes.id !== id);
    dispatch(deleteNode(setNodes));
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <>
      <Handle type="target" position={Position.Bottom} ></Handle>
      <Handle type="source" position={Position.Top} />
      <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} style={{ padding: "1rem", display: 'flex', flexDirection: "column" }}>
        {hovered && <Button sx={{ marginBottom: "3rem" }} onClick={removeNode}><ClearIcon color="error" /></Button>}
        <Button onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={onNodeClick} variant="contained" sx={{ backgroundColour: "white" }}>{data.label}</Button>
      </div>
      {selectedNode && (
        <div style={{ position: "fixed", top: 0, left: 150, backgroundColor: "white", padding: "30px", border: "1px solid #ccc", display: 'flex', flexDirection: 'column', gap: '30px', borderRadius: '10px' }}>
          <h3 style={{ textAlign: 'center', marginBottom: '0' }}>Set Node Title</h3>
          <TextField type="text" value={nodeTitle} onChange={(e) => setNodeTitle(e.target.value)} />
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '50px' }}>
            <Button onClick={onCancel} variant="contained" color='secondary'>Cancel</Button>
            <Button onClick={onSave} variant="contained" color='primary'>Save</Button>
          </div>
        </div>
      )}
    </>
  );
};

export default NodeRfc;
