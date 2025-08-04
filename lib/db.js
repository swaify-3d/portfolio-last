let projects = [
  { id: 1, title: 'Sample Project', description: 'This is a test project.', imageUrl: '' }
];

let id = 2;

export function getProjects() {
  return [...projects];
}

export function addProject(data: any) {
  projects.push({ id: id++, ...data });
}

export function updateProject(projectId: number, newData: any) {
  const index = projects.findIndex(p => p.id === projectId);
  if (index !== -1) projects[index] = { ...projects[index], ...newData };
}

export function deleteProject(projectId: number) {
  projects = projects.filter(p => p.id !== projectId);
}
