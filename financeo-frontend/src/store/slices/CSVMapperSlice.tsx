import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Node, Edge} from "react-flow-renderer"

interface ICSVMapperProps {
    nodes: Node[];
    edges: Edge[];
    clickedNode?: Node;
    clickNodePrev?: Node;
}

interface CSVMapperState {
    nodes: Node[];
    edges: Edge[];
    clickedNode: Node;
    clickedNodePrev: Node;
}

const initialState: CSVMapperState = {
    nodes: [],
    edges: [],
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
        resetEdges: (state) => {
            state.edges = [];
        },
        setEdges: (state, action: PayloadAction<Edge[]>) => {
            const newEdge = action.payload[action.payload.length - 1];

            const updateIndexTarget = state.edges.findIndex((edge: Edge) => edge.target === newEdge.target);
            const updateIndexSource = state.edges.findIndex((edge: Edge) => edge.source === newEdge.source);

            const bothNodesConnected = updateIndexTarget !== -1 && updateIndexSource !== -1;
            const sourceNodeConnected = updateIndexSource !== -1;
            const targetNodeConnected = updateIndexTarget !== -1;

            if(bothNodesConnected) {
                state.edges[updateIndexTarget] = newEdge;
                state.edges.splice(updateIndexSource, 1);
            } else if (targetNodeConnected) {
                state.edges[updateIndexTarget] = newEdge;
            } else if (sourceNodeConnected) {
                state.edges[updateIndexSource] = newEdge;
            } else {
                state.edges = action.payload;
            }

            state.edges.filter(edge => edge); // remove empty edges
        },
        setClickedNode(state, action: PayloadAction<Node>) {
            state.clickedNodePrev = state.clickedNode;
            state.clickedNode = action.payload;
        },
        resetClickedNodePrev(state) {
            state.clickedNodePrev = {id: "", position: {x: -1, y: -1}, data: {} , type: ""};
            state.edges.filter(edge => edge);
        },
        resetCSVMapperState(state) {
            state.nodes = [];
            state.edges = [];
            state.clickedNode = {id: "", position: {x: -1, y: -1}, data: {}};
            state.clickedNodePrev = {id: "", position: {x: -1, y: -1}, data: {}};
        },
    },
});

export const {
    setNodes,
    addEdge,
    setEdges,
    resetEdges,
    setClickedNode,
    resetClickedNodePrev,
    resetCSVMapperState
} = CSVMapperSlice.actions;
export type {ICSVMapperProps};
export default CSVMapperSlice.reducer;