import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import CreateWorkflowModalPopup from './components/CreateWorkFlowModalPopUp';
import WorkflowDesigner from './WorkflowDesigner';

function App() {
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const handleCreateClick = () => {
        setShowModal(true);
    };

    const handleModalSave = (workflowName: string) => {
        setShowModal(false);
        // Örnek yönlendirme: /workflow/my-name-123
        const workflowId = encodeURIComponent(workflowName.toLowerCase().replace(/\s+/g, '-'));
        navigate(`/workflow/${workflowId}`);
    };

    return (
        <>
            <Header onCreateClick={handleCreateClick} />
            {showModal ? (
                <CreateWorkflowModalPopup
                    onClose={() => setShowModal(false)}
                    onSave={handleModalSave}
                />
            ) : null}

            <Routes>
                <Route path="/workflow/:id" element={<WorkflowDesigner />} />
                {/* Gerekirse ana sayfaya baþka component de eklenebilir */}
            </Routes>
        </>
    );
}

export default App;
