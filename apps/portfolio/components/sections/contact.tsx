"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/card"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Textarea } from "@workspace/ui/components/textarea"
import { Badge } from "@workspace/ui/components/badge"
import { Separator } from "@workspace/ui/components/separator"
import { Alert, AlertDescription } from "@workspace/ui/components/alert"
import { Mail, Phone, MapPin, Send, Github, Linkedin, Instagram } from "lucide-react"

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    value: "goyal151002@gmail.com",
    href: "mailto:goyal151002@gmail.com"
  },
  {
    icon: Phone,
    title: "Phone",
    value: "+91 94134 95328",
    href: "tel:+919413495328"
  },
  {
    icon: MapPin,
    title: "Location",
    value: "Hyderabad, India",
    href: "https://maps.google.com/?q=Aditya+Empress+Towers,+8-1-307/3-8/AET,+beside+Passport+Office,+Shaikpet,+Hyderabad,+Telangana+500008"
  }
]

const socialLinks = [
  { icon: Github, href: "https://github.com/goyal1510", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/jayant-29714220b/", label: "LinkedIn" },
  { icon: Instagram, href: "https://www.instagram.com/goyal_1510/", label: "Instagram" },
]

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")
    
    try {
      const formDataToSend = new FormData()
      formDataToSend.append("access_key", "8b5c545b-75da-4b50-ae54-6e49852aa6b6")
      formDataToSend.append("name", formData.name)
      formDataToSend.append("email", formData.email)
      formDataToSend.append("subject", `Portfolio - ${formData.subject}`)
      formDataToSend.append("message", formData.message)
      
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formDataToSend
      })
      
      if (response.ok) {
        setSubmitStatus("success")
        setFormData({ name: "", email: "", subject: "", message: "" })
      } else {
        setSubmitStatus("error")
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <section id="contact" className="py-12 bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Get In Touch
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            I&apos;m always open to discussing new opportunities, interesting projects, or just having a chat about technology.
          </p>
        </motion.div>

        <Separator className="my-8" />

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8 flex flex-col h-full"
          >
            <div>
              <h3 className="text-2xl font-semibold text-foreground mb-6">
                Let&apos;s Connect
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-8">
                I&apos;m currently available for freelance work and full-time opportunities. 
                If you have a project that needs some creative thinking, I&apos;d love to hear about it.
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={info.title}
                  href={info.href}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  target="_blank"
                  className="flex items-center space-x-4 p-4 rounded-lg bg-background hover:bg-muted/50 transition-colors duration-200 group"
                >
                  <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-200">
                    <info.icon className="h-5 w-5" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-sm text-muted-foreground">{info.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>

            <div className="flex-1 flex flex-col justify-end">
              <h4 className="text-lg font-semibold text-foreground mb-4">
                Follow Me
              </h4>
              <p className="text-muted-foreground text-sm mb-6">
                Connect with me on social media for updates and insights.
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    target="_blank"
                    className="p-4 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors duration-200 flex-1 text-center"
                  >
                    <social.icon className="h-5 w-5 mx-auto mb-2" />
                    <span className="text-xs font-medium">{social.label}</span>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col h-full"
          >
            <Card className="flex flex-col h-full">
              <CardHeader>
                <CardTitle>Send me a message</CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <form onSubmit={handleSubmit} className="space-y-6 h-full flex flex-col">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                        Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                        Email
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                      Subject
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      placeholder="What's this about?"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Tell me about your project..."
                      rows={5}
                    />
                  </div>
                  
                  {/* Status Messages */}
                  {submitStatus === "success" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-green-50 border border-green-200 rounded-lg"
                    >
                      <p className="text-green-800 text-sm">
                        ✅ Thank you for your message! I&apos;ll get back to you soon.
                      </p>
                    </motion.div>
                  )}
                  
                  {submitStatus === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-red-50 border border-red-200 rounded-lg"
                    >
                      <p className="text-red-800 text-sm">
                        ❌ Something went wrong. Please try again or contact me directly via email.
                      </p>
                    </motion.div>
                  )}
                  
                  <Button 
                    type="submit" 
                    className="w-full group"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
