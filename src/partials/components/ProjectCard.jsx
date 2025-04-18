import React, { useState } from 'react';

const ProjectCard = ({ title, client, description, color = 'var(--blue-light)', onEdit, onDelete }) => {
    const [menuOpen, setMenuOpen] = useState(false);

    const getProjectIcon = () => {
        return (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 7V17M7 12H17" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
        );
    };

    return (
        <div style={{
            backgroundColor: 'var(--white)',
            borderRadius: '16px',
            padding: '20px',
            boxShadow: '0 4px 4px 3px rgba(196, 196, 196, 0.1)',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            minHeight: '180px'
        }}>

            <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '8px',
                backgroundColor: color,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: '15px'
            }}>
                {getProjectIcon()}
            </div>

            <div
                style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    cursor: 'pointer',
                    zIndex: 2
                }}
                onClick={() => setMenuOpen(prev => !prev)}
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" stroke="var(--gray-700)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z" stroke="var(--gray-700)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z" stroke="var(--gray-700)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>

            {menuOpen && (
                <div
                    style={{
                        position: 'absolute',
                        top: '48px',
                        right: '20px',
                        backgroundColor: 'white',
                        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                        borderRadius: '8px',
                        zIndex: 10,
                        minWidth: '120px'
                    }}
                >
                    <div
                        onClick={() => {
                            onEdit?.();
                            setMenuOpen(false);
                        }}
                        style={{
                            padding: '10px 12px',
                            cursor: 'pointer',
                            borderBottom: '1px solid #eee',
                            fontSize: '14px'
                        }}
                    >
                        ✏️ Edit
                    </div>
                    <div
                        onClick={() => {
                            onDelete?.();
                            setMenuOpen(false);
                        }}
                        style={{
                            padding: '10px 12px',
                            cursor: 'pointer',
                            color: 'red',
                            fontSize: '14px'
                        }}
                    >
                        🗑️ Delete
                    </div>
                </div>
            )}

            <h3 style={{
                margin: '0 0 5px 0',
                fontSize: '18px',
                fontWeight: '600',
                color: 'var(--text-headline-color)'
            }}>{title}</h3>

            <p style={{
                margin: '0 0 15px 0',
                fontSize: '14px',
                color: 'var(--text-muted-color)'
            }}>{client}</p>

            <p style={{
                margin: '0',
                fontSize: '14px',
                color: 'var(--text-color)',
                lineHeight: '1.4'
            }}>{description}</p>
        </div>
    );
};

export default ProjectCard;
