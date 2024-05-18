import React, { useState } from "react";
import { Button } from "@material-ui/core";
import ClearIcon from '@material-ui/icons/Clear';
import { useDispatch } from "react-redux";
import { deleteEdge } from "../actions/edge";
import { BaseEdge, getStraightPath, EdgeLabelRenderer, useReactFlow } from "reactflow";

const EdgeRfc = ({ id, sourceX, sourceY, targetX, targetY }) => {
    const dispatch = useDispatch();
    const [hovered, setHovered] = useState(false);
    const { setEdges } = useReactFlow();
    const [cursorPosition, setCursorPosition] = useState({ x: 100, y: 100 });

    const [edgePath] = getStraightPath({
        sourceX,
        sourceY,
        targetX,
        targetY,
    });

    const handleMouseEnter = () => {
        setHovered(true);
    };

    const handleMouseMove = (event) => {
        const svg = event.currentTarget.closest('svg');
        const point = svg.createSVGPoint();
        point.x = event.clientX;
        point.y = event.clientY;
        const cursorSVGPosition = point.matrixTransform(svg.getScreenCTM().inverse());
        setCursorPosition({ x: cursorSVGPosition.x, y: cursorSVGPosition.y });
    };

    const removeEdge = () => {
        dispatch(deleteEdge(id));
        setEdges((edges) => edges.filter((e) => e.id !== id));
    };

    const handleMouseLeave = () => {
        setHovered(false);
    };

    return (
        <>
            <g
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onMouseMove={handleMouseMove}
            >
                <BaseEdge id={id} path={edgePath} />
                {hovered && (
                    <EdgeLabelRenderer>
                        <foreignObject
                            width={30}
                            height={30}
                            x={cursorPosition.x - 15}
                            y={cursorPosition.y - 15}
                            style={{ pointerEvents: 'all' }}
                        >
                            <div style={{
                                position: 'absolute',
                                top: cursorPosition.y,
                                left: cursorPosition.x,
                                transform: 'translate(-50%, -50%)',
                                display: 'flex',
                                alignItems: 'center',
                                pointerEvents: 'none',
                            }}>
                                <Button
                                    onClick={removeEdge}
                                    style={{
                                        width: '30px',
                                        height: '30px',
                                        minWidth: '30px',
                                        minHeight: '30px',
                                        padding: 0,
                                        pointerEvents: 'auto',
                                    }}
                                >
                                    <ClearIcon style={{ fontSize: '20px', color: 'red' }} />
                                </Button>
                            </div>
                        </foreignObject>
                    </EdgeLabelRenderer>
                )}
            </g>
        </>
    );
};

export default EdgeRfc;