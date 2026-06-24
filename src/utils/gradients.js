const PROJECT_GRADIENTS = [
  'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.06) 0%, transparent 50%), linear-gradient(135deg, #0a0a12 0%, #111118 50%, #0a0a12 100%)',
  'radial-gradient(circle at 70% 70%, rgba(120,100,255,0.08) 0%, transparent 50%), linear-gradient(45deg, #0d0d15 0%, #14121f 50%, #0d0d15 100%)',
  'radial-gradient(circle at 50% 0%, rgba(255,150,100,0.06) 0%, transparent 50%), linear-gradient(180deg, #120f0f 0%, #1a1512 50%, #120f0f 100%)',
  'radial-gradient(circle at 20% 80%, rgba(100,200,255,0.06) 0%, transparent 50%), linear-gradient(225deg, #0f1218 0%, #141a22 50%, #0f1218 100%)',
  'radial-gradient(circle at 80% 20%, rgba(255,100,150,0.06) 0%, transparent 50%), linear-gradient(315deg, #120c12 0%, #1f141c 50%, #120c12 100%)',
  'radial-gradient(circle at 40% 60%, rgba(100,255,180,0.06) 0%, transparent 50%), linear-gradient(90deg, #0c1512 0%, #121f1a 50%, #0c1512 100%)',
  'radial-gradient(circle at 60% 40%, rgba(255,200,100,0.06) 0%, transparent 50%), linear-gradient(0deg, #15120c 0%, #1f1b12 50%, #15120c 100%)',
  'radial-gradient(circle at 25% 25%, rgba(150,100,255,0.08) 0%, transparent 50%), linear-gradient(135deg, #100c18 0%, #181425 50%, #100c18 100%)',
]

const PROJECT_MESH_VARS = [
  { '--blob-1': 'rgba(124,156,255,0.22)', '--blob-2': 'rgba(192,132,252,0.18)', '--blob-3': 'rgba(255,255,255,0.08)' },
  { '--blob-1': 'rgba(120,100,255,0.24)', '--blob-2': 'rgba(100,200,255,0.16)', '--blob-3': 'rgba(192,132,252,0.12)' },
  { '--blob-1': 'rgba(255,150,100,0.22)', '--blob-2': 'rgba(255,200,100,0.14)', '--blob-3': 'rgba(255,255,255,0.08)' },
  { '--blob-1': 'rgba(100,200,255,0.24)', '--blob-2': 'rgba(124,156,255,0.16)', '--blob-3': 'rgba(78,201,176,0.12)' },
  { '--blob-1': 'rgba(255,100,150,0.22)', '--blob-2': 'rgba(192,132,252,0.18)', '--blob-3': 'rgba(255,255,255,0.08)' },
  { '--blob-1': 'rgba(100,255,180,0.22)', '--blob-2': 'rgba(124,156,255,0.14)', '--blob-3': 'rgba(78,201,176,0.12)' },
  { '--blob-1': 'rgba(255,200,100,0.24)', '--blob-2': 'rgba(255,150,100,0.16)', '--blob-3': 'rgba(255,255,255,0.08)' },
  { '--blob-1': 'rgba(150,100,255,0.24)', '--blob-2': 'rgba(192,132,252,0.18)', '--blob-3': 'rgba(124,156,255,0.12)' },
]

export function getProjectGradient(index) {
  return PROJECT_GRADIENTS[index % PROJECT_GRADIENTS.length]
}

export function getProjectMeshVars(index) {
  return PROJECT_MESH_VARS[index % PROJECT_MESH_VARS.length]
}

export function getProjectBackground(project, index) {
  if (project.image) {
    return {
      backgroundImage: `url(${project.image})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundColor: 'var(--bg-primary)',
    }
  }

  return {
    background: getProjectGradient(index),
    ...getProjectMeshVars(index),
  }
}
