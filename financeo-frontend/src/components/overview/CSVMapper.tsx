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
    Controls, updateEdge, useNodesState, useEdgesState, useReactFlow, ReactFlowProvider
} from 'react-flow-renderer';
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import {useResize} from "../../hooks/useResize";

const initialNodes: Node[] = [
    {
        id: 'B',
        type: 'input',
        data: { label: 'child node 1' },
        position: { x: 0, y: 0 },
    },
    {
        id: 'C',
        type: 'output',
        data: { label: 'child node 2' },
        position: { x: 0, y: 90 },
    },
];

const initialEdges: Edge[] = [
    { id: 'b-c', source: 'B', target: 'C' }
]



export function Flow() {
    const edgeUpdateSuccessful = useRef(true);
    const [nodes, , onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const { setViewport, getViewport } = useReactFlow();
    const columns = useSelector((state: RootState) => state.CSVUploader.head);

    const onNodeClick = (event: any, node: Node) => {
        console.log(node);
    }

    const createNodesFromColumns = (): Node<any>[] => {
        let nodes: Node[] = [];

        if(columns && columns?.length > 0){
            nodes = columns.map((columnName: string, index: number) => {
                return {
                    id: columnName + "_input",
                    type: 'input',
                    data: { label: columnName },
                    position: { x: 155 * index, y: 0 },
                }
            })
        }
        return nodes;
    }

    const onConnect = useCallback((params: Edge<any> | Connection) =>
        setEdges((els) =>
            addEdge(params, els))
        , []);

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

    useEffect(() => {
        console.log(nodes, edges)
    }, [nodes, edges]);

    return (
        <ReactFlow
            nodes={createNodesFromColumns()}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onEdgeUpdate={onEdgeUpdate}
            onEdgeUpdateStart={onEdgeUpdateStart}
            onEdgeUpdateEnd={onEdgeUpdateEnd}
            onNodeClick={(event, node: Node) => onNodeClick(event, node)}
            onConnect={onConnect}
            nodesDraggable={true}
            snapToGrid={true}
            fitView>
            <Controls />
        </ReactFlow>
    );
}

const CSVMapper = () => {
    return (
        <ReactFlowProvider>
            <Flow />
        </ReactFlowProvider>
    )
}

export default CSVMapper;