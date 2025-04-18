import React, { useState, useEffect } from 'react';
import { getProjects, addProject, updateProject, deleteProject } from '../api/projectApi';
import ProjectCard from '../partials/components/ProjectCard';
import AddProjectModal from '../partials/components/AddProjectModal';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [activeFilter, setActiveFilter] = useState("ALL");
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingProject, setEditingProject] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getProjects();
                setProjects(data);
            } catch (error) {
                console.error("Error fetching projects:", error);
            }
        };

        fetchData();
    }, []);

    const handleAddProject = async (newProject) => {
        try {
            await addProject(newProject);
            const updatedProjects = await getProjects();

            setProjects(updatedProjects);
            setIsAddModalOpen(false);
        } catch (error) {
            console.error("Fel vid skapande av projekt:", error);
        }
    };


    const handleEditProject = async (updatedProject) => {
        try {
            await updateProject(updatedProject.id, updatedProject);
            const updatedProjects = await getProjects();
            setProjects(updatedProjects);
            setIsEditModalOpen(false);
            setEditingProject(null);
        } catch (error) {
            console.error("Fel vid uppdatering:", error);
        }
    };

    const handleDeleteProject = async (projectToDelete) => {
        try {
            await deleteProject(projectToDelete.id);
            const updated = await getProjects();
            setProjects(updated);
        } catch (error) {
            console.error("Fel vid borttagning:", error);
        }
    };


    const filteredProjects = projects.filter(p =>
        activeFilter === "ALL" ? true : p.status?.statusName?.toUpperCase() === "COMPLETED"
    );

    return (
        <div id="projects">
            <div className="page-header">
                <h1 className="h2">Projects</h1>
                <button className="btn btn-add" onClick={() => setIsAddModalOpen(true)}>
                    Add Project
                </button>
            </div>

            <div className="btn-group" style={{ margin: '1.5rem 0' }}>
                <button
                    className="btn"
                    onClick={() => setActiveFilter("ALL")}
                    style={{
                        backgroundColor: activeFilter === "ALL" ? 'var(--blue)' : 'var(--gray-200)',
                        color: activeFilter === "ALL" ? 'var(--white)' : 'var(--text-color)'
                    }}
                >
                    ALL [{projects.length}]
                </button>
                <button
                    className="btn"
                    onClick={() => setActiveFilter("COMPLETED")}
                    style={{
                        backgroundColor: activeFilter === "COMPLETED" ? 'var(--blue)' : 'var(--gray-200)',
                        color: activeFilter === "COMPLETED" ? 'var(--white)' : 'var(--text-color)'
                    }}
                >
                    COMPLETED [{projects.filter(p => p.status?.statusName?.toUpperCase() === "COMPLETED").length}]

                </button>

            </div>

            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                    gap: '24px',
                    marginTop: '1.5rem'
                }}
            >
                {filteredProjects.map((project, index) => (
                    <ProjectCard
                        key={index}
                        title={project.projectName}
                        client={project.client?.clientName}
                        description={project.description}
                        color={project.color}
                        onEdit={() => {
                            setEditingProject({
                                ...project,
                                clientId: project.client?.id || '',
                                userId: project.user?.id || '',

                            });
                            setIsEditModalOpen(true);
                        }}
                        onDelete={() => handleDeleteProject(project)}
                    />
                ))}
            </div>

            <AddProjectModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onSubmit={handleAddProject}
            />

            <AddProjectModal
                isOpen={isEditModalOpen}
                onClose={() => {
                    setIsEditModalOpen(false);
                    setEditingProject(null);
                }}
                onSubmit={handleEditProject}
                initialValues={editingProject}
            />
        </div>
    );
};

export default Projects;
