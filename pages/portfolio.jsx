import { getProjects } from '../lib/db';

export default function Portfolio() {
  const projects = getProjects();

  return (
    <div style={{ padding: '20px', fontFamily: 'monospace' }}>
      <h1>My Projects</h1>
      {projects.map(({ id, title, description, imageUrl }) => (
        <div key={id} style={{ marginBottom: '20px' }}>
          <h2>{title}</h2>
          <p>{description}</p>
          {imageUrl && <img src={imageUrl} alt={title} style={{ maxWidth: '300px' }} />}
        </div>
      ))}
    </div>
  );
}
