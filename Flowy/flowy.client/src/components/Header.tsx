// src/components/Header.tsx
import React from 'react';

export default function Header({ onCreateClick }: { onCreateClick: () => void }) {
    return (
        <div style={{
            height: '60px',
            backgroundColor: '#2d2d2d',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0 20px',
            color: 'white',
        }}>
            <div style={{ fontWeight: 'bold' }}>🛠 Flowy </div>
            <div>
                <button onClick={onCreateClick} style={{ marginRight: '10px' }}>
                    Create Workflow
                </button>
                <button>
                    Edit an Existing Workflow
                </button>
            </div>
        </div>
    );
}
