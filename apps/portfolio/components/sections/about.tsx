"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@workspace/ui/components/card"
import { Badge } from "@workspace/ui/components/badge"
import { Separator } from "@workspace/ui/components/separator"
import { User, MapPin, Calendar, Mail, Github, Linkedin, GraduationCap, Phone, Briefcase, Instagram } from "lucide-react"  

const personalInfo = [
  { icon: User, label: "Name", value: "Jayant" },
  { icon: MapPin, label: "Location", value: "Hyderabad, India" },
  { icon: Calendar, label: "Experience", value: "1+ Years" },
  { icon: Mail, label: "Email", value: "goyal151002@gmail.com" },
  { icon: Phone, label: "Phone", value: "+91 94134 95328" },
  { icon: Briefcase, label: "Current Role", value: "Associate Product Engineer" },
]

const socialLinks = [
  { icon: Github, href: "https://github.com/goyal1510", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/jayant-29714220b/", label: "LinkedIn" },
  { icon: Instagram, href: "https://www.instagram.com/goyal_1510/", label: "Instagram" },
]

const education = [
  {
    degree: "Secondary (X), CBSE",
    institution: "A.S.M. Public School, Sri Ganganagar",
    period: "2018",
    details: "Percentage: 86.20%"
  },
  {
    degree: "Senior Secondary (XII), CBSE",
    institution: "Nosegay Public School, Sri Ganganagar",
    period: "2020",
    details: "Percentage: 83.20%"
  },
  {
    degree: "Bachelor of Technology (B.Tech), Computer Science & Engineering",
    institution: "Kalinga Institute of Industrial Technology, Bhubaneshwar",
    period: "2024",
    details: "CGPA: 8.98/10"
  }
]

export function About() {
  return (
    <section id="about" className="py-12 bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            About Me
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get to know me better - my journey, passion, and what drives me to create amazing digital experiences.
          </p>
        </motion.div>

        <div className="space-y-12">
          {/* Personal Info and Career Objective */}
          <div className="grid lg:grid-cols-2 gap-12 items-stretch">
            {/* Left Column - Personal Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="h-full"
            >
              <Card className="p-6 h-full">
                <CardContent className="space-y-6 h-full flex flex-col">
                  <div>
                    <h3 className="text-2xl font-semibold text-foreground mb-4">
                      Personal Information
                    </h3>
                    <div className="grid gap-4">
                      {personalInfo.map((info, index) => (
                        <motion.div
                          key={info.label}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          viewport={{ once: true }}
                          className="flex items-center space-x-3"
                        >
                          <info.icon className="h-5 w-5 text-primary" />
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              {info.label}
                            </Badge>
                            <span className="text-foreground font-medium">{info.value}</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div className="flex-grow">
                    <h4 className="text-lg font-semibold text-foreground mb-3">
                      Connect with me
                    </h4>
                    <div className="flex space-x-4">
                      {socialLinks.map((social, index) => (
                        <motion.a
                          key={social.label}
                          href={social.href}
                          target="_blank"
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          viewport={{ once: true }}
                          className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
                        >
                          <social.icon className="h-5 w-5" />
                        </motion.a>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Right Column - Career Objective */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="h-full"
            >
              <Card className="p-6 h-full">
                <CardContent className="space-y-6 h-full flex flex-col">
                  <div>
                    <h3 className="text-2xl font-semibold text-foreground mb-4">
                      Career Objective
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      Aspiring Full Stack Developer skilled in React.js, JavaScript, Express.js, and MongoDB. Passionate about building innovative solutions and eager to collaborate with a dynamic team to grow and contribute effectively.
                    </p>
                  </div>

                  <div className="flex-grow">
                    <h4 className="text-lg font-semibold text-foreground mb-3">
                      What I Do
                    </h4>
                    <div className="grid gap-3">
                      {[
                        "Full Stack Web Development",
                        "React.js & Next.js Development",
                        "TypeScript & JavaScript",
                        "REST API Design & Implementation",
                        "Database Management (MongoDB, Supabase)",
                        "UI/UX Design & User Experience"
                      ].map((item, index) => (
                        <motion.div
                          key={item}
                          initial={{ opacity: 0, x: 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          viewport={{ once: true }}
                          className="flex items-center space-x-2"
                        >
                          <Badge variant="secondary" className="w-2 h-2 p-0 rounded-full" />
                          <span className="text-muted-foreground">{item}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Education Timeline - Full Width */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Separator className="my-8" />
            <div className="text-center mb-8">
              <h4 className="text-2xl font-semibold text-foreground mb-2 flex items-center justify-center space-x-2">
                <GraduationCap className="h-6 w-6 text-primary" />
                <span>Education Journey</span>
              </h4>
            </div>
            
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute top-8 left-0 right-0 h-0.5 bg-border" />
              
              <div className="flex justify-between items-start relative">
                {education.map((edu, index) => (
                  <motion.div
                    key={edu.degree}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    viewport={{ once: true }}
                    className="relative group flex-1 text-center"
                  >
                    {/* Circle with year */}
                    <div className="relative">
                      <div className="w-16 h-16 bg-primary rounded-full border-4 border-background shadow-lg group-hover:scale-110 transition-transform duration-200 flex items-center justify-center mx-auto">
                        <span className="text-primary-foreground font-semibold text-sm">{edu.period}</span>
                      </div>
                    </div>
                    
                    {/* Hover details below */}
                    <div className="mt-6">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                        <div className="bg-card border rounded-lg p-4 shadow-lg mx-2">
                          <h5 className="font-semibold text-foreground mb-2 text-sm">
                            {edu.degree}
                          </h5>
                          <p className="text-xs text-muted-foreground mb-1">
                            {edu.institution}
                          </p>
                          <p className="text-xs text-primary font-medium">
                            {edu.details}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
