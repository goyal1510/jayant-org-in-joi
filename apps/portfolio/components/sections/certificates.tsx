"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card"
import { Badge } from "@workspace/ui/components/badge"
import { Separator } from "@workspace/ui/components/separator"
import { Button } from "@workspace/ui/components/button"
import { FileText, ExternalLink, X, Award } from "lucide-react"
import { useState } from "react"

const certificates = [
  { 
    name: "Hackerrank Basic", 
    path: "/assets/certificates/HackerRank/Basic.pdf", 
    description: "Certified in Hackerrank Basic assessment",
    category: "Programming",
    issuer: "HackerRank"
  },
  { 
    name: "Hackerrank Intermediate", 
    path: "/assets/certificates/HackerRank/Intermediate.pdf", 
    description: "Certified in Hackerrank Intermediate assessment",
    category: "Programming",
    issuer: "HackerRank"
  },
  { 
    name: "HighRadius Internship Appreciation", 
    path: "/assets/certificates/HighRadius/Appreciation.pdf", 
    description: "Received appreciation for my internship at HighRadius",
    category: "Internship",
    issuer: "HighRadius"
  },
  { 
    name: "HighRadius Internship Completion", 
    path: "/assets/certificates/HighRadius/Product_Engineer.pdf", 
    description: "Successfully completed my internship at HighRadius",
    category: "Internship",
    issuer: "HighRadius"
  },
  { 
    name: "Full Stack Training", 
    path: "/assets/certificates/Internshalla/LetsBegin.pdf", 
    description: "Completed Full Stack training from Internshalla",
    category: "Training",
    issuer: "Internshalla"
  },
  { 
    name: "HTML & CSS Training", 
    path: "/assets/certificates/Internshalla/HTMLCSS.pdf", 
    description: "Completed HTML and CSS training from Internshalla",
    category: "Training",
    issuer: "Internshalla"
  },
  { 
    name: "Interactive JavaScript Training", 
    path: "/assets/certificates/Internshalla/JavaScript.pdf", 
    description: "Completed interactive JavaScript training from Internshalla",
    category: "Training",
    issuer: "Internshalla"
  },
  { 
    name: "Git and GitHub Training", 
    path: "/assets/certificates/Internshalla/Git_GitHub.pdf", 
    description: "Completed Git and GitHub training from Internshalla",
    category: "Training",
    issuer: "Internshalla"
  },
  { 
    name: "DSA JavaScript I", 
    path: "/assets/certificates/Internshalla/Dsa1.pdf", 
    description: "Completed DSA JavaScript Level I training from Internshalla",
    category: "Training",
    issuer: "Internshalla"
  },
  { 
    name: "DSA JavaScript II", 
    path: "/assets/certificates/Internshalla/Dsa2.pdf", 
    description: "Completed DSA JavaScript Level II training from Internshalla",
    category: "Training",
    issuer: "Internshalla"
  },
  { 
    name: "React Training", 
    path: "/assets/certificates/Internshalla/React.pdf", 
    description: "Completed React training from Internshalla",
    category: "Training",
    issuer: "Internshalla"
  },
  { 
    name: "Node.js and MongoDB Training", 
    path: "/assets/certificates/Internshalla/Node.js_Express.js_MongoDB.pdf", 
    description: "Completed Node.js, Express.js, and MongoDB training from Internshalla",
    category: "Training",
    issuer: "Internshalla"
  }
]

const categories = ["All", "Programming", "Internship", "Training"]

export function Certificates() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedCertificate, setSelectedCertificate] = useState<typeof certificates[0] | null>(null)

  const filteredCertificates = selectedCategory === "All" 
    ? certificates 
    : certificates.filter(cert => cert.category === selectedCategory)

  return (
    <section id="certificates" className="py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            My Certificates
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Here are the certifications and achievements that validate my skills and expertise.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="transition-all duration-200"
            >
              {category}
            </Button>
          ))}
        </motion.div>

        <Separator className="my-8" />

        {/* Certificates Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCertificates.map((cert, index) => (
            <motion.div
              key={cert.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-105 hover:bg-primary/5 hover:border-primary/20 flex flex-col h-64">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2">
                      <Award className="h-5 w-5 text-primary" />
                      <CardTitle className="text-lg leading-tight">{cert.name}</CardTitle>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {cert.category}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="flex flex-col h-full">
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {cert.description}
                  </p>
                  
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-xs text-muted-foreground font-medium">
                      {cert.issuer}
                    </span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setSelectedCertificate(cert)}
                      className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      View
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Certificate Viewer Modal */}
        {selectedCertificate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedCertificate(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-background rounded-lg max-w-6xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <div className="flex items-center justify-between p-4 border-b">
                  <h3 className="text-lg font-semibold text-foreground">
                    {selectedCertificate.name}
                  </h3>
                  <div className="flex items-center space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      asChild
                    >
                      <a href={selectedCertificate.path} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Open
                      </a>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedCertificate(null)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="h-[70vh]">
                  <iframe 
                    src={selectedCertificate.path} 
                    className="w-full h-full"
                    title={selectedCertificate.name}
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
