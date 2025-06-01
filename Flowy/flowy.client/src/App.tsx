import React, { useState } from 'react';
import { Routes, Route, useNavigate, useLocation} from 'react-router-dom';
import Header from './components/Header';
import CreateWorkflowModalPopup from './components/CreateWorkFlowModalPopUp';
import WorkflowDesigner from './WorkflowDesigner';

function App() {
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const handleCreateClick = () => {
        setShowModal(true);
    };

    const handleModalSave = (workflowName: string) => {
        setShowModal(false);
        const workflowId = encodeURIComponent(workflowName.toLowerCase().replace(/\s+/g, '-'));
        navigate(`/workflow/${workflowId}`);
    };

    const handleBackToMain = () => {
        navigate('/');
    };

    const isDesignerPage = location.pathname.startsWith('/workflow/');

    return (
        <>
            {!isDesignerPage && <Header onCreateClick={handleCreateClick} />}

            {showModal && (
                <CreateWorkflowModalPopup
                    onClose={() => setShowModal(false)}
                    onSave={handleModalSave}
                />
            )}

            {isDesignerPage && (
                <div style={{ padding: '10px' }}>
                    <button onClick={handleBackToMain}>← Main Page</button>
                </div>
            )}

            <Routes>
                <Route path="/workflow/:id" element={<WorkflowDesigner />} />
            </Routes>
        </>
    );

}

export default App;
