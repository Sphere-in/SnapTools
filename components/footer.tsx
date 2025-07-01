"use client"

import { motion } from "framer-motion"
import { Github, Twitter, Linkedin, Mail, Heart, Zap, Shield, Users } from 'lucide-react'
import Link from "next/link"

const footerLinks = {
  product: [
    { name: "AI Tools", href: "/ai-tools" },
    { name: "Categories", href: "/categories" },
    { name: "Popular Tools", href: "/ai-tools?filter=popular" },
    { name: "New Tools", href: "/ai-tools?filter=new" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Careers", href: "/careers" },
    { name: "Contact", href: "/contact" },
  ],
  support: [
    { name: "Help Center", href: "/help" },
    { name: "Documentation", href: "/docs" },
    { name: "API", href: "/api" },
    { name: "Status", href: "/status" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Cookie Policy", href: "/cookies" },
    { name: "GDPR", href: "/gdpr" },
  ],
}

const socialLinks = [
  { name: "GitHub", icon: Github, href: "https://github.com/electrohub" },
  { name: "Twitter", icon: Twitter, href: "https://twitter.com/electrohub" },
  { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com/company/electrohub" },
  { name: "Email", icon: Mail, href: "mailto:hello@electrohub.com" },
]

const features = [
  { icon: Zap, text: "Lightning Fast" },
  { icon: Shield, text: "Secure & Private" },
  { icon: Users, text: "100K+ Users" },
]

export function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center space-x-2"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">AI</span>
              </div>
              <div>
                <span className="font-bold text-gray-900 dark:text-white text-xl">Snap Tools</span>
                <div className="text-sm text-blue-600 dark:text-blue-400 font-medium">AI Powered</div>
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-gray-600 dark:text-gray-400 leading-relaxed"
            >
              Empowering productivity with AI-enhanced tools. Create, optimize, and innovate with our comprehensive suite of intelligent utilities.
            </motion.p>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap gap-4"
            >
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <feature.icon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span>{feature.text}</span>
                </div>
              ))}
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-3"
            >
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors duration-300 group"
                >
                  <social.icon className="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                </Link>
              ))}
            </motion.div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([category, links], index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * (index + 1) }}
              className="space-y-4"
            >
              <h3 className="font-semibold text-gray-900 dark:text-white capitalize">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="pt-8 border-t border-gray-200 dark:border-gray-800"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <span>© 2024 Snap Tools. All rights reserved.</span>
              <span className="hidden md:inline">•</span>
              <div className="flex items-center gap-1">
                <span>Made with</span>
                <Heart className="w-4 h-4 text-red-500 fill-current" />
                <span>by</span>
                <Link
                  href="https://electrohub.com"
                  className="font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                >
                  ElectroHub Team
                </Link>
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-500">
              <span>🌍 Available worldwide</span>
              <span>•</span>
              <span>🚀 Always improving</span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
