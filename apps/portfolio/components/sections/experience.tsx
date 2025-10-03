"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card"
import { Badge } from "@workspace/ui/components/badge"
import { Separator } from "@workspace/ui/components/separator"
import { Calendar, MapPin, Building } from "lucide-react"

const experiences = [
  {
    title: "Product Associate Engineer",
    company: "Neuraoak Technologies Private Limited",
    location: "Hyderabad",
    period: "Mar 2025 - Present",
    description: "Building RCM software features using Next.js (TypeScript) and Supabase, improving billing workflows and automating claims processing.",
    technologies: ["Next.js", "TypeScript", "Supabase", "React", "JavaScript"],
    achievements: [
      "Built RCM software features using Next JS (TypeScript) and Supabase, improving billing workflows",
      "Automated claims processing, reducing manual effort by 40% and errors by 25%",
      "Integrated Supabase for real-time data and auth, cutting backend load by 30%",
      "Led UI improvements based on user feedback, boosting satisfaction"
    ]
  },
  {
    title: "Software Development Intern",
    company: "HighRadius Technologies Private Ltd.",
    location: "Bhubaneswar",
    period: "Jul 2023 - Nov 2023",
    description: "Designed and implemented REST APIs, optimized performance using Java technologies, and enabled seamless integration with multiple front-end applications.",
    technologies: ["Java", "SQL", "Hibernate", "Struts", "Spring", "REST APIs"],
    achievements: [
      "Designed and implemented 15+ REST APIs, enabling seamless integration with multiple front-end apps and third-party services",
      "Optimized performance using Java, SQL, Hibernate, Struts, and Spring, improving response times by 30%",
      "Mastered user requirements, UX design, and backend development for comprehensive product approach"
    ]
  },
  {
    title: "Tech Summer Intern",
    company: "HighRadius Technologies Private Ltd.",
    location: "Bhubaneswar",
    period: "May 2023 - Jul 2023",
    description: "Spearheaded the creation of a full-stack web product, ensuring seamless integration across all components.",
    technologies: ["Full Stack Development", "Web Development", "Product Development"],
    achievements: [
      "Spearheaded the creation of a full-stack web product, ensuring seamless integration across all components",
      "Mastered user requirements, UX design, and backend development for a comprehensive product approach"
    ]
  },
  {
    title: "Public Relations (PR) Intern",
    company: "DESIRE FOUNDATION",
    location: "Bhubaneswar",
    period: "Sep 2022 - Aug 2023",
    description: "Organized fieldwork campaigns and collaborated with cross-functional teams to enhance internal coordination.",
    technologies: ["Communication", "Team Collaboration", "Project Management"],
    achievements: [
      "Organized a fieldwork campaign in slum areas, reaching 50+ children and their families, encouraging education",
      "Engaged with parents and distributed 100+ notebooks to support education",
      "Collaborated with cross-functional teams within the company to organize meetings and enhance internal coordination"
    ]
  }
]

export function Experience() {
  return (
    <section id="experience" className="py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Work Experience
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            My professional journey in software development, showcasing growth and achievements.
          </p>
        </motion.div>

        <Separator className="my-8" />

        <div className="space-y-8">
          {experiences.map((experience, index) => (
            <motion.div
              key={`${experience.company}-${experience.title}`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="relative overflow-hidden">
                {/* Timeline connector */}
                {index < experiences.length - 1 && (
                  <div className="absolute left-6 top-full w-0.5 h-8 bg-border" />
                )}
                
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <CardTitle className="text-xl text-foreground">
                        {experience.title}
                      </CardTitle>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-2">
                        <div className="flex items-center space-x-2">
                          <Building className="h-4 w-4 text-primary" />
                          <span className="text-muted-foreground font-medium">
                            {experience.company}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-primary" />
                          <span className="text-muted-foreground">
                            {experience.location}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-primary" />
                          <span className="text-muted-foreground">
                            {experience.period}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground leading-relaxed">
                    {experience.description}
                  </p>

                  <div>
                    <h4 className="font-semibold text-foreground mb-3">
                      Technologies Used
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {experience.technologies.map((tech) => (
                        <Badge key={tech} variant="secondary">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-foreground mb-3">
                      Key Achievements
                    </h4>
                    <ul className="space-y-2">
                      {experience.achievements.map((achievement, achievementIndex) => (
                        <motion.li
                          key={achievementIndex}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: achievementIndex * 0.1 }}
                          viewport={{ once: true }}
                          className="flex items-start space-x-2"
                        >
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                          <span className="text-muted-foreground">{achievement}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
