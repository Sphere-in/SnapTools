"use client"


import React from 'react'
import { motion } from "framer-motion"

const Heqading = () => {
    return (
        <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            <motion.h1
                className="text-5xl md:text-6xl font-extrabold tracking-tight mb-4 bg-gradient-to-r from-purple-500 via-pink-500 to-sky-400 text-transparent bg-clip-text"
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 200 }}
            >
                Snap Tools
            </motion.h1>
            <motion.p
                className="text-xl text-muted-foreground max-w-2xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
            >
                A comprehensive collection of essential tools for developers, students, and professionals.
                Clean, fast, and always available.
            </motion.p>
        </motion.div>
    )
}

export default Heqading