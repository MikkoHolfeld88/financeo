import {useEffect, useMemo, useState} from 'react';
import ReactFlow, {Controls, Edge, Node, ReactFlowProvider, useEdgesState, useNodesState} from 'react-flow-renderer';
import {useDispatch, useSelector} from "react-redux";
import {RootState, setClickedNode, setEdges, setMaxEdgeMapSize, useAppDispatch} from "../../store";
import {Card, CardContent, ClickAwayListener, Typography} from "@mui/material";
import "./index.scss"

const targetNodes: Node[] = [
    {
        id: 'date',
        type: 'outputFinanceo',
        data: {label: 'Date'},
        position: {x: 0, y: 0},
    },
    {
        id: 'usage', // verwendungszweck
        type: 'outputFinanceo',
        data: {label: 'Usage'},
        position: {x: 0, y: 0},
    },
    {
        id: 'receiver', // empfänger
        type: 'outputFinanceo',
        data: {label: 'Receiver'},
        position: {x: 0, y: 0},
    },
    {
        id: 'type',
        type: 'outputFinanceo',
        data: {label: 'Type'},
        position: {x: 0, y: 0},
    },
    {
        id: 'amount',
        type: 'outputFinanceo',
        data: {label: 'Amount'},
        position: {x: 0, y: 0},
    }
];

const targetEdges: Edge[] = [];

export function OutputFinanceo(node: any) {
    const dispatch = useAppDispatch();
    const clickedNode = useSelector((state: RootState) => state.CSVMapper.clickedNode);
    const prevClickedNode = useSelector((state: RootState) => state.CSVMapper.clickedNodePrev);
    const clickedOn = clickedNode?.id === node.id;
    const edges = useSelector((state: RootState) => state.CSVMapper.edges);

    useEffect(() => {
        if (clickedOn) {
            prevClickedNode.type === "inputFinanceo" && createEdge();
        }
    } , [clickedNode]);

    function createEdge(){
        const edge = {
            id: `${node.id}-${clickedNode.id}`,
            source: node.id,
            target: clickedNode.id,
            type: "edge",
            data: {
                label: "",
                weight: 1
            }
        };
        targetEdges.push(edge);
        dispatch(setEdges(targetEdges));
    }

    return (
        <Card className={clickedOn ? "blinkOutput" : ""} sx={{}}>
            <CardContent sx={{ p:0, '&:last-child': { pb: 0 }, padding: "10px", color: clickedOn ? "white" : "" }}>
                <Typography sx={{ fontSize: 10, color: clickedOn ? "white" : "" }} color="text.secondary" gutterBottom>
                    TARGET NODE
                </Typography>
                <Typography variant="h5" component="div">
                    {node.data.label}
                </Typography>
            </CardContent>
        </Card>
    );
}

export function InputFinanceo(node: any) {
    const clickedNode = useSelector((state: RootState) => state.CSVMapper.clickedNode);
    const clickedOn = clickedNode?.id === node.id;

    return (
            <Card className={clickedOn ? "blinkInput" : ""} sx={{}}>
                <CardContent sx={{ p:0, '&:last-child': { pb: 0 },  padding: "10px", color: clickedOn ? "white" : "" }}>
                    <Typography sx={{ fontSize: 10, color: clickedOn ? "white" : ""}} color={"text.secondary"} gutterBottom>
                        SOURCE NODE
                    </Typography>
                    <Typography variant="h5" component="div">
                        {node.data.label}
                    </Typography>
                </CardContent>
            </Card>
    );
}

export function Flow() {
    const dispatch = useAppDispatch();
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [localEdges, setLocalEdges, onLocalEdgesChange] = useEdgesState([]);
    const columns = useSelector((state: RootState) => state.CSVUploader.head);
    const edges = useSelector((state: RootState) => state.CSVMapper.edges);
    const nodeTypes = useMemo(() => ({ inputFinanceo: InputFinanceo, outputFinanceo: OutputFinanceo }), []);

    useEffect(() => {
        dispatch(setMaxEdgeMapSize(targetNodes.length));
        setNodes(createInputNodes());
        setLocalEdges(targetEdges);
    }, []);

    const onNodeClick = (event: any, node: Node) => {
        dispatch(setClickedNode(node));
    }

    const positionTargetNodes = (inputColumHeightAll: number, basicColumnHeight: number): Node[] => {
        const x = 400;
        const y = 0;

        targetNodes.forEach((node, index) => {
            node.position = {x: x , y: y + basicColumnHeight * index};
        });

        return targetNodes;
    }

    const createInputNodes = (nodes: Node[] = [], basicWidth: number = 155, basicHeight: number = 80): Node<any>[] => {
        if (columns && columns?.length > 0) {
            nodes = columns.map((columnName: string, index: number) => {
                return {
                    id: columnName + "_input",
                    type: 'inputFinanceo',
                    data: {label: columnName},
                    position: {x: 0, y: basicHeight * index},
                }
            })
        }

        nodes.push(...positionTargetNodes(basicHeight * columns?.length, basicHeight));

        return nodes;
    }

    useEffect(() => {
        setLocalEdges(edges);
    }, [edges]);

    return (
        <ReactFlow
            snapToGrid
            nodeTypes={nodeTypes}
            nodes={nodes}
            edges={localEdges}
            onNodesChange={onNodesChange}
            onEdgesChange={onLocalEdgesChange}
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