import { useState } from 'react';
import { getProjects, addProject, updateProject } from '../../lib/db';

export default function Admin() {
  const [projects, setProjects] = useState(getProjects());
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ title: '', description: '', imageUrl: '' });

  function handleSubmit(e) {
    e.preventDefault();
    if (editing !== null) {
      updateProject(editing, form);
      setEditing(null);
    } else {
      addProject(form);
    }
    setProjects(getProjects());
    setForm({ title: '', description: '', imageUrl: '' });
  }

  function handleEdit(id) {
    const project = projects.find((p) => p.id === id);
    if (project) {
      setEditing(id);
      setForm({ title: project.title, description: project.description, imageUrl: project.imageUrl });
    }
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'monospace' }}>
      <h1>Admin Panel</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
          style={{ display: 'block', marginBottom: '10px' }}
        />
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
          style={{ display: 'block', marginBottom: '10px' }}
        />
        <input
          placeholder="Image URL"
          value={form.imageUrl}
          onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
          style={{ display: 'block', marginBottom: '10px' }}
        />
        <button type="submit">{editing !== null ? 'Update Project' : 'Add Project'}</button>
      </form>

      <h2>Existing Projects</h2>
      {projects.map(({ id, title }) => (
        <div key={id}>
          {title} <button onClick={() => handleEdit(id)}>Edit</button>
        </div>
      ))}
    </div>
  );
}
