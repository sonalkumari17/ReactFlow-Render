import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReactFlow, { Controls, Background, addEdge, useEdgesState, useNodesState } from 'reactflow';
import Button from '@mui/material/Button';
import { v4 as uuidv4 } from 'uuid';
import { createNewNode } from './actions/node';
import NodeRfc from './components/NodeRfc';
import EdgeRfc from './components/EdgeRfc';
import './style.css'

const nodeTypes = {
    nodeRfc: NodeRfc
}

const edgeTypes = {
    edgeRfc: EdgeRfc
}

const Home = () => {
    const dispatch = useDispatch();
    const reduxNodes = useSelector((state) => state.nodes);

    const [nodes, setNodes, onNodesChange] = useNodesState(reduxNodes);

    const handleOnClickCreateNode = () => {
        const newNode = {
            id: uuidv4(),
            type: 'nodeRfc',
            position: { x: nodes.length * 100, y: nodes.length },
            data: { label: 'Node' },
        };
        setNodes((nds) => [...nds, newNode]);
        dispatch(createNewNode(newNode));
    };

    useEffect(() => {
        setNodes(reduxNodes);
    }, [reduxNodes]);

    const initialEdges = [];
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const onConnect = useCallback(
        (connection) => {
            const edge = { ...connection, type: 'edgeRfc' };
            setEdges((eds) => addEdge(edge, eds));
        },
        [setEdges],
    );
    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                <div>
                    <h1>Home</h1>
                </div>
            </div>
            <div style={{ justifyContent: 'left', display: 'flex', marginLeft: '20px', marginBottom: '20px' }}>
                <Button onClick={handleOnClickCreateNode} variant="contained" color='primary'>Create node</Button>
            </div>
            <div style={{ height: '80%', backgroundColor: '#e0e0e0' }}>
                <ReactFlow
                    nodeTypes={nodeTypes}
                    nodes={nodes}
                    onNodesChange={onNodesChange}
                    onConnect={onConnect}
                    edges={edges}
                    edgeTypes={edgeTypes}
                    onEdgesChange={onEdgesChange}
                >
                    <Background />
                    <Controls />
                </ReactFlow>
            </div>
        </>
    )
}

export default Home;