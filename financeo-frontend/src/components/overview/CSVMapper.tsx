import {useEffect, useMemo} from 'react';
import ReactFlow, {Controls, Node, ReactFlowProvider, useEdgesState, useNodesState} from 'react-flow-renderer';
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import { useCallback } from 'react';
import { Handle, Position } from 'react-flow-renderer';

const handleStyle = { left: 10 };

const targetNodes: Node[] = [
    {
        id: 'date',
        type: 'output',
        data: {label: 'Date'},
        position: {x: 0, y: 0},
    },
    {
        id: 'usage', // verwendungszweck
        type: 'output',
        data: {label: 'Usage'},
        position: {x: 0, y: 0},
    },
    {
        id: 'receiver', // empfänger
        type: 'output',
        data: {label: 'Receiver'},
        position: {x: 0, y: 0},
    },
    {
        id: 'type',
        type: 'output',
        data: {label: 'Type'},
        position: {x: 0, y: 0},
    },
    {
        id: 'amount',
        type: 'output',
        data: {label: 'Amount'},
        position: {x: 0, y: 0},
    }
];

function TextUpdaterNode() {
    const onChange = useCallback((evt: { target: { value: any; }; }) => {
        console.log(evt.target.value);
    }, []);

    return (
        <>
            <Handle type="target" position={Position.Left} />
            <div style={{backgroundColor: "red"}}>
                <label htmlFor="text">Text:</label>
                <input id="text" name="text" onChange={onChange} />
            </div>
            <Handle type="source" position={Position.Bottom} id="a" />
            <Handle type="source" position={Position.Bottom} id="b" style={handleStyle} />
        </>
    );
}

export function Flow() {
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const columns = useSelector((state: RootState) => state.CSVUploader.head);
    const nodeTypes = useMemo(() => ({ textUpdater: TextUpdaterNode }), []);

    useEffect(() => {
        setNodes(createInputNodes());
    }, []);

    const onNodeClick = (event: any, node: Node) => {
        console.log(node);
    }

    const positionTargetNodes = (inputColumHeightAll: number, basicColumnHeight: number): Node[] => {
        const x = 200;
        const y = inputColumHeightAll / 2 - (basicColumnHeight * targetNodes.length) / 2;

        targetNodes.forEach((node, index) => {
            node.position = {x: x , y: y + basicColumnHeight * index};
        });

        return targetNodes;
    }

    const createInputNodes = (nodes: Node[] = [], basicWidth: number = 155, basicHeight: number = 50): Node<any>[] => {
        if (columns && columns?.length > 0) {
            nodes = columns.map((columnName: string, index: number) => {
                return {
                    id: columnName + "_input",
                    type: 'textUpdater',
                    data: {label: columnName},
                    position: {x: 0, y: basicHeight * index},
                }
            })
        }

        nodes.push(...positionTargetNodes(basicHeight * columns?.length, basicHeight));

        return nodes;
    }

    useEffect(() => {
        console.log(nodes, edges)
    }, [nodes, edges]);

    return (
        <ReactFlow
            snapToGrid
            nodeTypes={nodeTypes}
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onNodeClick={(event, node: Node) => onNodeClick(event, node)}
            fitView>
            <Controls/>
        </ReactFlow>
    );
}

const CSVMapper = () => {
    return (
        <ReactFlowProvider>
            <Flow/>
        </ReactFlowProvider>
    )
}

export default CSVMapper;