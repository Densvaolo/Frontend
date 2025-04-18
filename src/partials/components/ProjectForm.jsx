import { useState, useEffect } from 'react';
import { getClients } from '../../api/clientApi';
import { getStatuses } from '../../api/statusApi';
import { getUsers } from '../../api/userApi';

const ProjectForm = ({ mode = 'add', initialValues = {}, onSubmit }) => {
    const [title, setTitle] = useState('');
    const [clientId, setClientId] = useState('');
    const [userId, setUserId] = useState('');
    const [statusId, setStatusId] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [budget, setBudget] = useState('');
    const [clients, setClients] = useState([]);
    const [statuses, setStatuses] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getClients().then(setClients);
        getStatuses().then(setStatuses);
        getUsers().then(setUsers);
    }, []);

    useEffect(() => {
        if (initialValues) {
            setTitle(initialValues.projectName || '');
            setClientId(initialValues.clientId || '');
            setUserId(initialValues.userId || '');
            setStatusId(initialValues.statusId || '');
            setDescription(initialValues.description || '');
            setStartDate(initialValues.startDate ? initialValues.startDate.substring(0, 10) : '');
            setEndDate(initialValues.endDate ? initialValues.endDate.substring(0, 10) : '');
            setBudget(initialValues.budget || '');
        }
    }, [initialValues]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            id: initialValues.id,
            projectName: title,
            clientId,
            userId,
            description,
            startDate,
            endDate,
            budget
        };

        if (mode === 'edit') {
            formData.statusId = statusId;
        }

        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Project Name</label>
                <input type="text" placeholder='Enter Project Name' value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>

            <div className="form-group">
                <label>Client Name</label>
                <select value={clientId} onChange={(e) => setClientId(e.target.value)} required>
                    <option value="">Select Client</option>
                    {clients.map(c => (
                        <option key={c.id} value={c.id}>{c.clientName}</option>
                    ))}
                </select>
            </div>


            <div className="form-group">
                <label>Description</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Type Something' />
            </div>

            <div className="form-group">
                <label>Start Date</label>
                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
            </div>

            <div className="form-group">
                <label>End Date</label>
                <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
            </div>


            <div className="form-group">
                <label>Project Owner</label>
                <select value={userId} onChange={(e) => setUserId(e.target.value)} required>
                    <option value="">Select Project Owner</option>
                    {users.map(u => (
                        <option key={u.id} value={u.id}>{u.firstName} {u.lastName}</option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label>Budget</label>
                <input type="number" value={budget} onChange={(e) => setBudget(e.target.value)} placeholder='0' required />
            </div>

            {mode === 'edit' && (
                <div className="form-group">
                    <label>Project Status</label>
                    <select value={statusId} onChange={(e) => setStatusId(e.target.value)} required>
                        <option value="">Select Status</option>
                        {statuses.map(s => (
                            <option key={s.id} value={s.id}>{s.statusName}</option>
                        ))}
                    </select>
                </div>
            )}

            <button type="submit" className="btn btn-add">
                {mode === 'edit' ? 'Update Project' : 'Create'}
            </button>
        </form>
    );
};

export default ProjectForm;
