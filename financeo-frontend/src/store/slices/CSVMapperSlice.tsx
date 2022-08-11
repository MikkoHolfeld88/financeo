import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Node, Edge} from "react-flow-renderer"

interface ICSVMapperProps {
    nodes: Node[];
    edges: Edge[];
    maxEdgeMapSize: number;
    clickedNode: Node;
    clickNodePrev: Node;
}

interface CSVMapperState {
    nodes: Node[];
    edges: Edge[];
    maxEdgeMapSize: number;
    clickedNode: Node;
    clickedNodePrev: Node;
}

const initialState: CSVMapperState = {
    nodes: [],
    edges: [],
    maxEdgeMapSize: 0,
    clickedNode: {id: "", position: {x: -1, y: -1}, data: {}, type: ""},
    clickedNodePrev: {id: "", position: {x: -1, y: -1}, data: {}, type: ""}
}

export const CSVMapperSlice = createSlice({
    name: 'csvUploader',
    initialState,
    reducers: {
        setNodes: (state, action: PayloadAction<Node[]>) => {
            state.nodes = action.payload;
        },
        addEdge: (state, action: PayloadAction<Edge>) => {
            state.edges.push(action.payload);
        },
        setEdges: (state, action: PayloadAction<Edge[]>) => {
            action.payload.forEach((edge: Edge, index) => {

            })
            state.edges = action.payload;
        },
        setMaxEdgeMapSize: (state, action: PayloadAction<number>) => {
            state.maxEdgeMapSize = action.payload;
        },
        setClickedNode(state, action: PayloadAction<Node>) {
            state.clickedNodePrev = state.clickedNode;
            state.clickedNode = action.payload;
        },
        resetClickedNodePrev(state) {
            state.clickedNodePrev = {id: "", position: {x: -1, y: -1}, data: {}, type: ""};
        },
        resetCSVMapperState(state) {
            state.nodes = [];
            state.edges = [];
            state.clickedNode = {id: "", position: {x: -1, y: -1}, data: {}};
        },
    },
});

export const {
    setNodes,
    addEdge,
    setEdges,
    setMaxEdgeMapSize,
    setClickedNode,
    resetClickedNodePrev,
    resetCSVMapperState
} = CSVMapperSlice.actions;
export type {ICSVMapperProps};
export default CSVMapperSlice.reducer;