import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Node, Edge} from "react-flow-renderer"

interface ICSVMapperProps {
    nodes: Node[];
    edges: Edge[];
    clickedNode: Node;
}

interface CSVMapperState {
    nodes: Node[];
    edges: Edge[];
    clickedNode: Node;

}

const initialState: CSVMapperState = {
    nodes: [],
    edges: [],
    clickedNode: {id: "", position: {x:-1, y:-1}, data: {}, type: ""}
}

export const CSVMapperSlice = createSlice({
    name: 'csvUploader',
    initialState,
    reducers: {
        setNodes: (state, action: PayloadAction<Node[]>) => {
            state.nodes = action.payload;
        },
        setEdges: (state, action: PayloadAction<Edge[]>) => {
            state.edges = action.payload;
        },
        setClickedNode(state, action: PayloadAction<Node>) {
            state.clickedNode = action.payload;
        },
        resetCSVMapperState(state) {
            state.nodes = [];
            state.edges = [];
            state.clickedNode = {id: "", position: {x:-1, y:-1}, data: {}};
        }
    },
});

export const {setNodes, setEdges, setClickedNode, resetCSVMapperState} = CSVMapperSlice.actions;
export type {ICSVMapperProps};
export default CSVMapperSlice.reducer;