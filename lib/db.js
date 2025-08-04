let id = 0;

const projects = [
  {
    id: id++,
    title: 'Example Project',
    description: 'This is an example project description.',
    imageUrl: '/example.png',
  },
];

export function getProjects() {
  return [...projects];
}

export function addProject(data) {
  projects.push({ id: id++, ...data });
}

export function updateProject(idToUpdate, data) {
  const index = projects.findIndex((p) => p.id === idToUpdate);
  if (index !== -1) {
    projects[index] = { ...projects[index], ...data };
  }
}
