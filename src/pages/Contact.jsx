// src/pages/Contact.jsx
import React, { useRef, useState } from 'react'
import '../styles/Contact.css'

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  // Refs para cada campo
  const nameRef = useRef(null)
  const emailRef = useRef(null)
  const messageRef = useRef(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Validar cada campo: si falta alguno, se hace scroll y se le da focus
    if (!formData.name.trim()) {
      nameRef.current.scrollIntoView({ behavior: "smooth", block: "center" })
      nameRef.current.focus()
      return
    }
    if (!formData.email.trim()) {
      emailRef.current.scrollIntoView({ behavior: "smooth", block: "center" })
      emailRef.current.focus()
      return
    }
    if (!formData.message.trim()) {
      messageRef.current.scrollIntoView({ behavior: "smooth", block: "center" })
      messageRef.current.focus()
      return
    }

    // Si todo está correcto:
    alert("Mensaje enviado correctamente. ¡Gracias por contactarme!")
    setFormData({ name: '', email: '', message: '' })
  }

  return (
    <section className="content contact-f" id="contact-f">
      <h2>Contacto</h2>
      <form className="contact-form" id="contact-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Nombre</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Tu nombre"
          value={formData.name}
          onChange={handleChange}
          ref={nameRef}
          required
        />

        <label htmlFor="email">Correo Electrónico</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="tucorreo@ejemplo.com"
          value={formData.email}
          onChange={handleChange}
          ref={emailRef}
          required
        />

        <label htmlFor="message">Mensaje</label>
        <textarea
          id="message"
          name="message"
          rows="5"
          placeholder="Escribe tu mensaje aquí..."
          value={formData.message}
          onChange={handleChange}
          ref={messageRef}
          required
        ></textarea>

        <button type="submit">Enviar</button>
      </form>
    </section>
  )
}

export default Contact
