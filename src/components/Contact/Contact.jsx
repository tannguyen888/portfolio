import { useState } from 'react'
import { motion } from 'framer-motion'
import { useScrollAnimation } from '../../hooks'

const Contact = () => {
  const { ref, isInView } = useScrollAnimation()
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState(null) // 'sending' | 'success' | 'error'

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')

    try {
      const res = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!res.ok) throw new Error('Failed')

      setStatus('success')
      setFormData({ name: '', email: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="py-12 md:py-20 px-4 md:px-6 bg-gray-50">
      <motion.div
        ref={ref}
        className="max-w-xl mx-auto"
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <h2 className="text-2xl text-black md:text-3xl font-bold text-center mb-6 md:mb-8">Contact</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 md:gap-4">
            <label className="text-black text-sm md:text-base">Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required className="border-b-black border-b-2 rounded-lg px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base text-black focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <label className="text-black text-sm md:text-base">Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required className="border-b-black border-b-2 rounded-lg px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base text-black focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <label className="text-black text-sm md:text-base">Message</label>
          <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Message" rows={5} required className="border-b-black border-b-2 rounded-lg px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base text-black focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <button type="submit" disabled={status === 'sending'} className="bg-blue-500 text-white py-2.5 md:py-3 rounded-lg hover:bg-blue-600 transition text-sm md:text-base disabled:opacity-50">
            {status === 'sending' ? 'Sending...' : 'Send Message'}
          </button>
          {status === 'success' && <p className="text-green-600 text-center text-sm">Message sent successfully!</p>}
          {status === 'error' && <p className="text-red-600 text-center text-sm">Failed to send. Please try again.</p>}
        </form>
      </motion.div>
    </section>
  )
}

export default Contact
