import React, { useState } from 'react';



type Props = {
    onClose: () => void;
    onSave: (name: string) => void;
};

export default function CreateWorkflowModal({ onClose, onSave }: Props) {

    const [workflowName, setWorkflowName] = useState('');

    const handleSave = () => {
        if (workflowName.trim()) {
            onSave(workflowName.trim());
        }
    };

    return (        <div style={{

            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <div style={{
                backgroundColor: '#2d2d2d',
                padding: '20px',
                borderRadius: '8px',
                width: '300px',
                color: 'white',
            }}>
                <h3>Create Workflow</h3>
                <input
                    value={workflowName}
                    onChange={(e) => setWorkflowName(e.target.value)}
                    placeholder="Enter workflow name"
                    style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
                />
                <div style={{ textAlign: 'right' }}>
                    <button onClick={onClose} style={{ marginRight: '10px' }}>Cancel</button>
                    <button onClick={handleSave}>Save</button>
                </div>
            </div>
        </div>
    );
}
