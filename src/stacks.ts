export interface StackPreset {
    id: string
    name: string
    description: string
    frontend: string[]
    backend: string[]
    database: string[]
    notes?: string[]
}

export const STACK_PRESETS: StackPreset[] = [
    {
        id: "modern-web",
        name: "Modern Web App",
        description: "General-purpose modern web application",
        frontend: ["React", "Tailwind CSS"],
        backend: ["Node.js", "REST API"],
        database: ["PostgreSQL"],
    },
    {
        id: "content-platform",
        name: "Content Platform / CMS",
        description: "Blogs, publishing platforms, content-heavy apps",
        frontend: ["Next.js", "Tailwind CSS"],
        backend: ["Node.js", "Headless CMS"],
        database: ["PostgreSQL"],
        notes: ["SEO-first", "Server-side rendering preferred"],
    },
    {
        id: "ml-lite",
        name: "ML / Recommendation Engine (Lightweight)",
        description: "Simple ML or rule-based recommendation systems",
        frontend: ["React"],
        backend: ["Python API", "FastAPI"],
        database: ["PostgreSQL"],
        notes: ["Content-based recommendations only"],
    },
]