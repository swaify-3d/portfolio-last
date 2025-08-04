import { getProjects } from '../lib/db';

export default function Portfolio() {
  const projects = getProjects();

  return (
    <div className="p-8 text-white bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">My Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map(p => (
          <div key={p.id} className="bg-gray-800 p-4 rounded-lg">
            <h2 className="text-xl font-semibold">{p.title}</h2>
            <p>{p.description}</p>
            {p.imageUrl && <img src={p.imageUrl} alt="Project image" className="mt-2 rounded" />}
          </div>
        ))}
      </div>
    </div>
  );
}