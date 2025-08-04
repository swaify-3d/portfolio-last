'use client';
import { useState } from 'react';
import { getProjects, addProject, updateProject, deleteProject } from '../../lib/db';

export default function Admin() {
  const [projects, setProjects] = useState(getProjects());
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ title: '', description: '', imageUrl: '' });

  function handleSubmit(e: any) {
    e.preventDefault();
    if (editing !== null) {
      updateProject(editing, form);
    } else {
      addProject(form);
    }
    setProjects(getProjects());
    setForm({ title: '', description: '', imageUrl: '' });
    setEditing(null);
  }

  function handleEdit(id: number) {
    const proj = projects.find(p => p.id === id);
    setForm(proj);
    setEditing(id);
  }

  function handleDelete(id: number) {
    deleteProject(id);
    setProjects(getProjects());
  }

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <h1 className="text-2xl font-bold">Admin Panel</h1>
      <form onSubmit={handleSubmit} className="space-y-2 mt-4">
        <input type="text" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Title" className="w-full p-2 rounded bg-gray-800" />
        <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Description" className="w-full p-2 rounded bg-gray-800" />
        <input type="text" value={form.imageUrl} onChange={e => setForm(f => ({ ...f, imageUrl: e.target.value }))} placeholder="Image URL" className="w-full p-2 rounded bg-gray-800" />
        <button type="submit" className="bg-green-600 px-4 py-2 rounded">{editing !== null ? 'Update' : 'Create'}</button>
      </form>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map(p => (
          <div key={p.id} className="bg-gray-800 p-4 rounded">
            <h2 className="text-lg font-bold">{p.title}</h2>
            <p>{p.description}</p>
            <div className="mt-2 flex gap-2">
              <button onClick={() => handleEdit(p.id)} className="bg-blue-600 px-2 py-1 rounded">Edit</button>
              <button onClick={() => handleDelete(p.id)} className="bg-red-600 px-2 py-1 rounded">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}