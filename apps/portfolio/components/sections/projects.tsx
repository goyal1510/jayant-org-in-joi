"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card"
import { Badge } from "@workspace/ui/components/badge"
import { Button } from "@workspace/ui/components/button"
import { Separator } from "@workspace/ui/components/separator"
import { Github, ExternalLink, X } from "lucide-react"
import { useState } from "react"
import Image from "next/image"

const projects = [
  {
    title: "Currency Calculator",
    shortDescription: "Developed a personal calculator to total cash denomination, store multiple calculations per date, and add optional notes.",
    fullDescription: "Developed a personal calculator to total cash denomination, store multiple calculations per date, and add optional notes. Integrated Supabase for backend storage with full CRUD functionality. Built with React and custom external CSS for a clean, responsive UI and smooth user interactions. Features include bundle counting, historical tracking, and data persistence.",
    image: "/assets/ProjectImages/work-7.png",
    technologies: ["React", "Supabase", "CSS", "CRUD Operations"],
    githubLink: "https://github.com/goyal1510/jayant-org-in/tree/main/apps/currency-calculator",
    liveLink: "https://currency-calculator.jayant.org.in/",
  },
  {
    title: "Custom Drag & Drop Calculator",
    shortDescription: "Built a drag-and-drop calculator using React and Zustand.",
    fullDescription: "Built a drag-and-drop calculator using React and Zustand. Added dark mode, backspace, clear all, and duplicate prevention. Styled with Tailwind CSS and optimized with Vite. Features a calculator builder with drag-and-drop functionality.",
    image: "/assets/ProjectImages/work-1.png",
    technologies: ["React", "Zustand", "Tailwind CSS", "Vite", "Drag & Drop"],
    githubLink: "https://github.com/goyal1510/jayant-org-in/tree/main/apps/cddc",
    liveLink: "https://cddc.jayant.org.in/"
  },
  {
    title: "E-commerce Application",
    shortDescription: "Built a full-featured e-commerce platform with product browsing, cart, and transactions.",
    fullDescription: "Built a full-featured e-commerce platform with product browsing, cart, and transactions. Developed a responsive UI using React, React Router, and Redux. Integrated an API for real-time product updates. Features include authentication, cart functionality, and product management.",
    image: "/assets/ProjectImages/work-3.png",
    technologies: ["React", "Redux", "React Router", "API Integration"],
    githubLink: "https://github.com/goyal1510/jayant-org-in/tree/main/apps/ecommerce",
    liveLink: "https://ecommerce.jayant.org.in/"
  },
  {
    title: "Todo App",
    shortDescription: "Built a task management app with React and Vite.",
    fullDescription: "Built a task management app with React and Vite. Enabled adding, editing, completing, and deleting tasks. Designed a clean, user-friendly UI for creating, updating, and tracking to-do lists.",
    image: "/assets/ProjectImages/work-6.png",
    technologies: ["React", "Vite", "Task Management", "CRUD Operations"],
    githubLink: "https://github.com/goyal1510/jayant-org-in/tree/main/apps/todo-app",
    liveLink: "https://todo-app.jayant.org.in/"
  },
  {
    title: "Game Spot",
    shortDescription: "Developed a Game Hub featuring three interactive games: Rock Paper Scissors, Dare You, and Tic Tac Toe.",
    fullDescription: "Developed a Game Hub featuring three interactive games: Rock Paper Scissors, Dare You, and Tic Tac Toe. Utilized HTML, CSS, and JavaScript to ensure simplicity and ease of use. A gaming platform where users can explore and play various games.",
    image: "/assets/ProjectImages/work-2.png",
    technologies: ["HTML", "CSS", "JavaScript", "Interactive Games"],
    githubLink: "https://github.com/goyal1510/jayant-org-in/tree/main/apps/game-spot",
    liveLink: "https://game-spot.jayant.org.in/"
  },
  {
    title: "Jayant Weather App",
    shortDescription: "Developed a weather application using JavaScript, OpenWeather API, and Tailwind CSS.",
    fullDescription: "Developed a weather application using JavaScript, OpenWeather API, and Tailwind CSS. Implemented city-based search and geolocation-based weather retrieval. Designed a responsive UI for seamless experience across devices. A weather forecasting application that provides real-time weather updates.",
    image: "/assets/ProjectImages/work-4.png",
    technologies: ["JavaScript", "OpenWeather API", "Tailwind CSS", "Geolocation"],
    githubLink: "https://github.com/goyal1510/jayant-org-in/tree/main/apps/weather",
    liveLink: "https://weather.jayant.org.in/"
  },
]

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null)

  return (
    <section id="projects" className="py-12 bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            My Projects
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Here are some of the projects I&apos;ve built to showcase my skills and passion for development.
          </p>
        </motion.div>

        <Separator className="my-8" />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              <Card className="h-full group hover:shadow-lg transition-all duration-300 hover:scale-105 hover:bg-primary/5 hover:border-primary/20">
                                  <div className="relative overflow-hidden rounded-t-lg">
                    <div className="h-48 overflow-hidden">
                      <Image 
                        src={project.image} 
                        alt={project.title}
                        width={400}
                        height={192}
                        className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  </div>
                
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg leading-tight">{project.title}</CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                    {project.shortDescription}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{project.technologies.length - 3}
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Netflix-style Modal */}
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
                         <motion.div
               initial={{ scale: 0.8, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               exit={{ scale: 0.8, opacity: 0 }}
               className="bg-background rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
               onClick={(e) => e.stopPropagation()}
             >
               <div className="relative p-6">
                 <Button
                   variant="ghost"
                   size="sm"
                   className="absolute top-2 right-2 bg-muted hover:bg-muted/80 z-10"
                   onClick={() => setSelectedProject(null)}
                 >
                   <X className="h-4 w-4" />
                 </Button>
               
                                                   <div className="flex items-start justify-between mb-4 pt-8">
                   <div>
                     <h2 className="text-2xl font-bold text-foreground mb-2">{selectedProject.title}</h2>
                   </div>
                   <div className="flex space-x-2">
                     <Button size="sm" variant="outline" asChild>
                       <a href={selectedProject.githubLink} target="_blank" rel="noopener noreferrer">
                         <Github className="h-4 w-4 mr-2" />
                         Code
                       </a>
                     </Button>
                     <Button size="sm" asChild>
                       <a href={selectedProject.liveLink} target="_blank" rel="noopener noreferrer">
                         <ExternalLink className="h-4 w-4 mr-2" />
                         Live Demo
                       </a>
                     </Button>
                   </div>
                 </div>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">Description</h3>
                    <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                      {selectedProject.fullDescription}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">Technologies Used</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech) => (
                        <Badge key={tech} variant="secondary">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
