"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card"
import { Badge } from "@workspace/ui/components/badge"
import { Progress } from "@workspace/ui/components/progress"
import { Separator } from "@workspace/ui/components/separator"
import { 
  Code2, 
  Palette, 
  Database, 
  Settings,
  Code,
  Server,
  FileCode,
  FileText,
  GitBranch,
  Package,
  Globe,
  Zap,
  Shield,
} from "lucide-react"

const skillCategories = [
  {
    title: "Frontend Development",
    icon: Code2,
    skills: [
      { name: "HTML", level: 95, color: "bg-orange-500" },
      { name: "CSS3", level: 92, color: "bg-blue-500" },
      { name: "JavaScript", level: 88, color: "bg-yellow-500" },
      { name: "TypeScript", level: 85, color: "bg-blue-600" },
      { name: "React", level: 90, color: "bg-cyan-500" },
      { name: "Next.js", level: 85, color: "bg-slate-700" },
      { name: "Redux", level: 80, color: "bg-purple-600" },
      { name: "Tailwind CSS", level: 92, color: "bg-teal-500" },
    ]
  },
  {
    title: "Backend Development",
    icon: Database,
    skills: [
      { name: "Node.js", level: 85, color: "bg-green-600" },
      { name: "Express.js", level: 88, color: "bg-gray-600" },
      { name: "MongoDB", level: 82, color: "bg-green-500" },
      { name: "MySQL", level: 78, color: "bg-blue-700" },
      { name: "Supabase", level: 75, color: "bg-green-400" },
      { name: "JWT", level: 80, color: "bg-purple-500" },
    ]
  },
  {
    title: "Tools & Technologies",
    icon: Settings,
    skills: [
      { name: "Git", level: 90, color: "bg-orange-600" },
      { name: "GitHub", level: 88, color: "bg-slate-700" },
      { name: "Vercel", level: 85, color: "bg-indigo-600" },
      { name: "Vite", level: 80, color: "bg-yellow-500" },
      { name: "NPM", level: 92, color: "bg-red-500" },
      { name: "PNPM", level: 85, color: "bg-orange-500" },
      { name: "Bruno", level: 85, color: "bg-orange-400" },
    ]
  },
  {
    title: "Programming Languages",
    icon: Code,
    skills: [
      { name: "Java", level: 70, color: "bg-red-600" },
      { name: "Markdown", level: 60, color: "bg-gray-600" },
      { name: "Python", level: 40, color: "bg-green-600" },
      { name: "C++", level: 60, color: "bg-blue-600" },
    ]
  }
]

const techIcons = [
  { icon: Code, name: "HTML", color: "text-orange-500" },
  { icon: Palette, name: "CSS3", color: "text-blue-500" },
  { icon: FileCode, name: "JavaScript", color: "text-yellow-500" },
  { icon: FileText, name: "TypeScript", color: "text-blue-600" },
  { icon: Code2, name: "React", color: "text-cyan-500" },
  { icon: Globe, name: "Next.js", color: "text-gray-800" },
  { icon: Server, name: "Node.js", color: "text-green-600" },
  { icon: GitBranch, name: "Git", color: "text-orange-600" },
  { icon: Zap, name: "Vite", color: "text-yellow-500" },
  { icon: Package, name: "Tailwind", color: "text-teal-500" },
  { icon: Shield, name: "JWT", color: "text-purple-500" },
]

export function Skills() {
  return (
    <section id="skills" className="py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Skills & Technologies
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Here are the technologies and tools I work with to bring ideas to life.
          </p>
        </motion.div>

        {/* Technology Icons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-8 mb-16"
        >
          {techIcons.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center space-y-2 group"
            >
              <div className="p-4 rounded-lg bg-muted/50 group-hover:bg-muted transition-colors duration-200">
                <tech.icon className={`h-8 w-8 ${tech.color}`} />
              </div>
              <span className="text-sm text-muted-foreground">{tech.name}</span>
            </motion.div>
          ))}
        </motion.div>

        <Separator className="my-8" />

        {/* Skill Categories */}
        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <category.icon className="h-5 w-5 text-primary" />
                    <span>{category.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: skillIndex * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <Badge variant="outline" className="text-xs">
                          {skill.name}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {skill.level}%
                        </span>
                      </div>
                      <Progress 
                        value={skill.level} 
                        className="h-2"
                      />
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>


      </div>
    </section>
  )
}
