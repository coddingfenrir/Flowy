import React, { useCallback, useRef, useState } from 'react';
import ReactFlow, {
    Background,
    Controls,
    addEdge,
    useNodesState,
    useEdgesState,
    Connection,
    Edge,
    ReactFlowProvider,
    MiniMap,
    ReactFlowInstance,
} from 'reactflow';
import 'reactflow/dist/style.css';

const initialNodes = [
    {
        id: '1',
        type: 'default',
        data: { label: 'Başlangıç' },
        position: { x: 100, y: 100 },
    },
    {
        id: '2',
        type: 'default',
        data: { label: 'Bitiş' },
        position: { x: 400, y: 100 },
    },
];

const initialEdges = [
    {
        id: 'e1-2',
        source: '1',
        target: '2',
        type: 'default',
    },
];

let id = 3;
const getId = () => `${id++}`;

function WorkflowDesigner() {
    const reactFlowWrapper = useRef<HTMLDivElement>(null!);
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);

    const onConnect = useCallback(
        (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
        [setEdges]
    );

    const onDragOver = useCallback((event: React.DragEvent) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const onDrop = useCallback((event: React.DragEvent) => {
        event.preventDefault();
        if (!reactFlowInstance) return;

        const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
        const type = event.dataTransfer.getData('application/reactflow');
        if (typeof type === 'undefined' || !type) return;

        const position = reactFlowInstance.project({
            x: event.clientX - reactFlowBounds.left,
            y: event.clientY - reactFlowBounds.top,
        });

        const newNode = {
            id: getId(),
            type: 'default',
            position,
            data: { label: `${type} (Yeni)` },
        };

        console.log('Yeni node oluşturuluyor:', newNode); // 👈 EKLE BUNU
        setNodes((nds) => nds.concat(newNode));
    }, [reactFlowInstance, setNodes]);


    return (
        <ReactFlowProvider>
            <div style={{ display: 'flex', height: '100vh' }}>
                {/* SOL NODE MENÜSÜ */}
                <div
                    style={{
                        width: 200,
                        padding: 10,
                        background: '#f0f0f0',
                        borderRight: '1px solid #ccc',
                    }}
                >
                    <div
                        style={{
                            padding: '8px',
                            background: '#fff',
                            border: '1px solid #aaa',
                            borderRadius: 4,
                            cursor: 'grab',
                            marginBottom: 10,
                            textAlign: 'center',
                        }}
                        onDragStart={(event) => event.dataTransfer.setData('application/reactflow', 'Onay Adımı')}
                        draggable
                    >
                        Onay Adımı
                    </div>
                </div>

                {/* SAĞ PANEL: REACT FLOW */}
                <div style={{ flexGrow: 1 }} ref={reactFlowWrapper}>
                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        onConnect={onConnect}
                        onInit={(instance) => setReactFlowInstance(instance)}
                        onDrop={onDrop}
                        onDragOver={onDragOver}
                        fitView
                    >
                        <MiniMap />
                        <Controls />
                        <Background />
                    </ReactFlow>
                </div>
            </div>
        </ReactFlowProvider>
    );
}

export default WorkflowDesigner;
