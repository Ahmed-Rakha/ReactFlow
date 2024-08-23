import { createContext, useState, useCallback } from 'react';
import {
  ReactFlow,
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import CustomNode from '../components/CustomNode';
import List from '../components/List';

const initialNodes = [
  {
    id: '1',
    data: {
      title: 'Noty',
      label_1: 'Task',
      label_2: 'Shape',
      options: ['list', 'normal'],
      items: [],
    },
    position: { x: 0, y: 0 },
    type: 'custom',
  },
];

const initialEdges = [];
const nodeTypes = {
  custom: CustomNode,
  list: List,
};

const NodeContext = createContext();

function Flow() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const handleAddNode = (newNode) => {
    setNodes((nds) => [...nds, newNode]);
  };
  const handleEditNode = (id, newData) => {
    setNodes((nds) =>
      nds.map((node) => (node.id === id ? { ...node, data: newData } : node))
    );
  };

  const handleDeleteNode = (id) => {
    setNodes((nds) => nds.filter((node) => node.id !== id));
    setEdges((eds) =>
      eds.filter((edge) => edge.source !== id && edge.target !== id)
    );
  };
  const handleAddList = ({ title }) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.data.elementType === 'list'
          ? {
              ...node,
              data: {
                ...node.data,
                items: [...node.data.items, title],
              },
            }
          : node
      )
    );
  };

  return (
    <NodeContext.Provider
      value={{
        handleAddNode,
        nodes,
        handleAddList,
        handleEditNode,
        handleDeleteNode,
      }}
    >
      <div style={{ height: '100%' }}>
        <ReactFlow
          nodes={nodes}
          onNodesChange={onNodesChange}
          edges={edges}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
          nodeTypes={nodeTypes}
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>
    </NodeContext.Provider>
  );
}

export default Flow;
export { NodeContext };
