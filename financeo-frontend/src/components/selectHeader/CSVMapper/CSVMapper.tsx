import React, {Fragment, useEffect, useMemo} from 'react';
import ReactFlow, {
    Controls,
    Edge,
    getBezierPath,
    Handle,
    MiniMap,
    Node,
    Position,
    ReactFlowProvider,
    useEdgesState,
    useNodesState,
} from 'react-flow-renderer';
import {GetBezierPathParams} from "react-flow-renderer/dist/esm/components/Edges/BezierEdge";
import {useSelector} from "react-redux";
import {resetClickedNodePrev, RootState, setClickedNode, setEdges, useAppDispatch} from "../../../store";
import {SCHEME} from "../../../constants/colors";
import {Card, CardContent, Typography} from "@mui/material";
import "../index.scss"
import useMediaQuery from "@mui/material/useMediaQuery";
import theme from "../../../theme";

const targetNodes: Node[] = [
    {
        id: '0_date_output',
        type: 'outputFinanceo',
        data: {label: 'Date'},
        position: {x: 0, y: 0},
    },
    {
        id: '1_usage_output', // verwendungszweck
        type: 'outputFinanceo',
        data: {label: 'Usage'},
        position: {x: 0, y: 0},
    },
    {
        id: '2_receiver_output', // empfänger
        type: 'outputFinanceo',
        data: {label: 'Receiver'},
        position: {x: 0, y: 0},
    },
    {
        id: '3_type_output',
        type: 'outputFinanceo',
        data: {label: 'Type'},
        position: {x: 0, y: 0},
    },
    {
        id: '4_amount_output',
        type: 'outputFinanceo',
        data: {label: 'Amount'},
        position: {x: 0, y: 0},
    }
];

let targetEdges: Edge[] = [];

export function createNodeHead(){
    return targetNodes.map((node: Node) => {
        return node.data.label;
    })
}

export function EdgeFinanceo({
       id ,
       sourceX ,
       sourceY ,
       targetX ,
       targetY ,
       sourcePosition,
       targetPosition,
                                 data,
       markerEnd,
    }: GetBezierPathParams | any) {
    const edgePath = getBezierPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
    });

    return (
        <>
            <path
                id={id}
                style={{strokeWidth: '2px', stroke: SCHEME.mainBackgroundLight}}
                className="react-flow__edge-path"
                d={edgePath}
                markerEnd={markerEnd}
            />
            <text>
                <textPath
                    href={`#${id}`}
                    style={{ fontSize: '18px' }}
                    startOffset="50%"
                    textAnchor="middle">
                </textPath>
            </text>
        </>
    );
}

export function OutputFinanceoNode(node: any) {
    const dispatch = useAppDispatch();
    const clickedNode = useSelector((state: RootState) => state.CSVMapper.clickedNode);
    const prevClickedNode = useSelector((state: RootState) => state.CSVMapper.clickedNodePrev);
    const clicked = clickedNode?.id === node.id;

    useEffect(() => {
        if (clicked) {
            if (prevClickedNode.type === "inputFinanceo" && clickedNode.type === "outputFinanceo") {
                const edge = {
                    id: `${prevClickedNode.id}-${clickedNode.id}`,
                    type: 'edgeFinanceo',
                    source: prevClickedNode.id,
                    target: clickedNode.id,
                };
                targetEdges = [...targetEdges, edge];
                dispatch(setEdges(targetEdges));
                dispatch(resetClickedNodePrev());
            }
        }
    }, [clickedNode]);

    return (
        <Fragment>
            <Handle
                style={{backgroundColor: "transparent", borderColor: "transparent"}}
                type="target"
                position={Position.Left}
                id={`OutputHandle_${node.id}`}/>
            <Card className={clicked ? "blinkOutput" : ""} sx={{backgroundColor: clicked ? SCHEME.mainBackground : "white"}}>
                <CardContent sx={{p: 0, '&:last-child': {pb: 0}, padding: "10px", color: clicked ? "white" : clickedNode ? "grey" : ""}}>
                    <Typography sx={{fontSize: 10, color: clicked ? "white" : clickedNode ? "grey" : ""}} color="text.secondary" gutterBottom>
                        TARGET NODE
                    </Typography>
                    <Typography variant="h5" component="div">
                        {node.data.label}
                    </Typography>
                </CardContent>
            </Card>
        </Fragment>
    );
}

export function InputFinanceoNode(node: any) {
    const clickedNode = useSelector((state: RootState) => state.CSVMapper.clickedNode);
    const clicked = clickedNode?.id === node.id;

    return (
        <Fragment>
            <Handle
                style={{backgroundColor: "transparent", borderColor: "transparent"}}
                type="source"
                position={Position.Right}
                id={`InputHandle_${node.id}`}/>
            <Card className={clicked ? "blinkInput" : ""} sx={{backgroundColor: clicked ? SCHEME.mainBackground : "white"}}>
                <CardContent sx={{p: 0, '&:last-child': {pb: 0}, padding: "10px", color: clicked ? "white" : ""}}>
                    <Typography sx={{fontSize: 10, color: clicked ? "white" : ""}} color={"text.secondary"}
                                gutterBottom>
                        SOURCE NODE
                    </Typography>
                    <Typography variant="h5" component="div">
                        {node.data.label}
                    </Typography>
                </CardContent>
            </Card>
        </Fragment>
    );
}

export function Flow() {
    const dispatch = useAppDispatch();
    const lgScreenSize = useMediaQuery(theme.breakpoints.up('lg'));
    const [nodes, setNodes, onLocalNodesChange] = useNodesState([]);
    const [localEdges, setLocalEdges, onLocalEdgesChange] = useEdgesState([]);
    const nodeTypes = useMemo(() => ({inputFinanceo: InputFinanceoNode, outputFinanceo: OutputFinanceoNode}), []);
    const edgeTypes = useMemo(() => ({edgeFinanceo: EdgeFinanceo}), []);
    const edges = useSelector((state: RootState) => state.CSVMapper.edges);
    const columns = useSelector((state: RootState) => state.CSVUploader.head);

    useEffect(() => {
        setNodes(createInputNodes());
    }, []);

    useEffect(() => {
        targetEdges = edges;
        setLocalEdges(edges);
    }, [edges]);

    const onNodeClick = (event: any, node: Node) => {
        dispatch(setClickedNode(node));
    }

    const positionTargetNodes = (inputColumHeightAll: number, basicColumnHeight: number): Node[] => {
        const x = 400;
        const y = 0;

        targetNodes.forEach((node, index) => {
            node.position = {x: x, y: y + basicColumnHeight * index};
        });

        return targetNodes;
    }

    const createInputNodes = (nodes: Node[] = [], basicWidth: number = 155, basicHeight: number = 80): Node<any>[] => {
        if (columns && columns?.length > 0) {
            nodes = columns.map((columnName: string, index: number) => {
                return {
                    id: index.toString() + "_" + columnName + "_input",
                    type: 'inputFinanceo',
                    data: {label: columnName},
                    position: {x: 0, y: basicHeight * index},
                }
            })
        }
        nodes.push(...positionTargetNodes(basicHeight * columns?.length, basicHeight));

        return nodes;
    }

    return (
        <ReactFlow
            snapToGrid
            nodes={nodes}
            edges={localEdges}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            onNodesChange={onLocalNodesChange}
            onEdgesChange={onLocalEdgesChange}
            onNodeClick={(event, node: Node) => onNodeClick(event, node)}
            fitView>
            { lgScreenSize && <MiniMap />}
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
