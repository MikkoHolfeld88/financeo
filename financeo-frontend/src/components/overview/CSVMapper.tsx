import {useEffect, useMemo, useState} from 'react';
import ReactFlow, {Controls, Node, ReactFlowProvider, useEdgesState, useNodesState} from 'react-flow-renderer';
import {useDispatch, useSelector} from "react-redux";
import {RootState, setClickedNode, useAppDispatch} from "../../store";
import {Card, CardContent, Typography} from "@mui/material";

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

export function OutputFinanceo(node: any) {
    return (
        <Card>
            <CardContent sx={{ p:0, '&:last-child': { pb: 0 }, padding: "10px"}}>
                <Typography sx={{ fontSize: 10 }} color="text.secondary" gutterBottom>
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
    const [clicked, setClicked] = useState(false);

    useEffect(() => {
        if (clickedNode?.type === 'inputFinanceo') {
            setClicked(true);
        }
    } , [clickedNode]);

    return (
        <Card>
            <CardContent sx={{ p:0, '&:last-child': { pb: 0 },  padding: "10px", color: clicked ? "lightgrey" : "black"}}>
                <Typography sx={{ fontSize: 10, color: clicked ? "lightgrey" : "black" }} color="text.secondary" gutterBottom>
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
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const dispatch = useAppDispatch();
    const columns = useSelector((state: RootState) => state.CSVUploader.head);
    const nodeTypes = useMemo(() => ({ inputFinanceo: InputFinanceo, outputFinanceo: OutputFinanceo }), []);

    useEffect(() => {
        setNodes(createInputNodes());
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