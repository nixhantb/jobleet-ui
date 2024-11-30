'use client'

import Link from 'next/link'
import { Zap } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Logo() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      className="flex justify-center"
    >
      <Link 
        href="/"
        className="inline-flex items-center gap-2 text-2xl font-bold text-primary hover:opacity-90 transition-opacity"
      >
        <Zap className="w-6 h-6" />
        <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Jobleet
        </span>
      </Link>
    </motion.div>
  )
}