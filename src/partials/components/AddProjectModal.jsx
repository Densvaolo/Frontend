import React from 'react';
import ProjectForm from './ProjectForm';

const AddProjectModal = ({ isOpen, onClose, onSubmit, initialValues }) => {
    if (!isOpen) return null;

    return (
        <div className="modal" style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.3)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000
        }}>
            <div className="modal-content" style={{
                backgroundColor: 'var(--white)',
                borderRadius: '16px',
                padding: '2rem',
                width: '90%',
                maxWidth: '500px',
                maxHeight: '90vh',
                overflowY: 'auto'
            }}>

                <div className="modal-header" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <h2 className="h3">{initialValues ? 'Edit Project' : 'Add Project'}</h2>
                    <button onClick={onClose} className="btn-close" style={{ fontSize: '1.3rem', border: 'none', background: 'transparent' }}></button>
                </div>


                <ProjectForm
                    mode={initialValues ? 'edit' : 'add'}
                    initialValues={initialValues || {}}
                    onSubmit={(formData) => {
                        onSubmit(formData);
                        onClose();
                    }}
                />
            </div>
        </div>
    );
};

export default AddProjectModal;
