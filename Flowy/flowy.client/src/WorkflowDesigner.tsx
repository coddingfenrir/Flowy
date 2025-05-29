// src/WorkflowDesigner.tsx
import React from 'react';
import ReactFlow, {
    Background,
    Controls,
    addEdge,
    useNodesState,
    useEdgesState,
    Connection,
    Edge,
} from 'reactflow';
import 'reactflow/dist/style.css';

function WorkflowDesigner() {
    // �lk d���mler
    const initialNodes = [
        {
            id: '1',
            type: 'default',
            data: { label: 'Ba�lang��' },
            position: { x: 100, y: 100 },
        },
        {
            id: '2',
            type: 'default',
            data: { label: 'Biti�' },
            position: { x: 400, y: 100 },
        },
    ];

    // �lk ba�lant�
    const initialEdges = [
        {
            id: 'e1-2',
            source: '1',
            target: '2',
            type: 'default',
        },
    ];

    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    // Ba�lant� (edge) eklendi�inde tetiklenir
    const onConnect = (connection: Connection) => {
        setEdges((eds) => addEdge(connection, eds));
    };

    return (
        <div style={{ width: '100%', height: '100vh' }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                fitView
            >
                <Background />
                <Controls />
            </ReactFlow>
        </div>
    );
}

export default WorkflowDesigner;
