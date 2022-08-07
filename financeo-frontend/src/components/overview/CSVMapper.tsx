import {useCallback, useEffect, useRef, useState} from 'react';
import ReactFlow, {
    addEdge,
    applyEdgeChanges,
    applyNodeChanges,
    Connection,
    Node,
    Edge,
    EdgeChange,
    NodeChange,
    Controls, updateEdge, useNodesState, useEdgesState
} from 'react-flow-renderer';

const initialNodes: Node[] = [
    {
        id: 'B',
        type: 'input',
        data: { label: 'child node 1' },
        position: { x: 10, y: 10 },
    },
    {
        id: 'C',
        data: { label: 'child node 2' },
        position: { x: 10, y: 90 },
    },
];

const initialEdges: Edge[] = [
    { id: 'b-c', source: 'B', target: 'C' }
]

function Flow() {
    const edgeUpdateSuccessful = useRef(true);
    const [nodes, , onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const onConnect = useCallback((params: Edge<any> | Connection) => setEdges((els) => addEdge(params, els)), []);

    const onEdgeUpdateStart = useCallback(() => {
        edgeUpdateSuccessful.current = false;
    }, []);

    const onEdgeUpdate = useCallback((oldEdge: Edge, newConnection: Connection) => {
        edgeUpdateSuccessful.current = true;
        console.log(oldEdge);
        setEdges((els) => updateEdge(oldEdge, newConnection, els));
    }, []);

    const onEdgeUpdateEnd = useCallback((_: any, edge: { id: any; }) => {
        console.log(edge);
        if (!edgeUpdateSuccessful.current) {
            setEdges((edges: Edge[]) => edges.filter((e) => e.id !== edge.id));
        }
        edgeUpdateSuccessful.current = true;
    }, []);

    useEffect(() => {console.log(nodes, edges);}, [nodes, edges]);


    return (
        <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onEdgeUpdate={onEdgeUpdate}
            onEdgeUpdateStart={onEdgeUpdateStart}
            onEdgeUpdateEnd={onEdgeUpdateEnd}
            fitView>
            <Controls />
        </ReactFlow>
    );
}

export default Flow;