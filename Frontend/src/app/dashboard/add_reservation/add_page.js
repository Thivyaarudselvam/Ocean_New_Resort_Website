'use client'

import React from "react"

import { useState } from 'react'
import styles from './add-reservation.module.css'

const roomTypes = [
  { value: 'standard', label: 'Standard Room', rate: 99 },
  { value: 'deluxe', label: 'Deluxe Room', rate: 199 },
  { value: 'suite', label: 'Ocean Suite', rate: 399 },
  { value: 'penthouse', label: 'Penthouse', rate: 599 },
]

export default function AddReservationPage() {
  const [formData, setFormData] = useState({
    reservationNumber: '',
    guestName: '',
    address: '',
    contactNumber: '',
    roomType: '',
    checkIn: '',
    checkOut: ''
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const generateReservationNumber = () => {
    const prefix = 'OVR'
    const timestamp = Date.now().toString().slice(-6)
    const random = Math.random().toString(36).substring(2, 5).toUpperCase()
    return `${prefix}-${timestamp}-${random}`
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleGenerateNumber = () => {
    const newNumber = generateReservationNumber()
    setFormData(prev => ({ ...prev, reservationNumber: newNumber }))
    if (errors.reservationNumber) {
      setErrors(prev => ({ ...prev, reservationNumber: '' }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.reservationNumber.trim()) {
      newErrors.reservationNumber = 'Reservation number is required'
    }
    
    if (!formData.guestName.trim()) {
      newErrors.guestName = 'Guest name is required'
    }
    
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required'
    }
    
    if (!formData.contactNumber.trim()) {
      newErrors.contactNumber = 'Contact number is required'
    } else if (!/^[\d\s+()-]{10,}$/.test(formData.contactNumber)) {
      newErrors.contactNumber = 'Please enter a valid phone number'
    }
    
    if (!formData.roomType) {
      newErrors.roomType = 'Room type is required'
    }
    
    if (!formData.checkIn) {
      newErrors.checkIn = 'Check-in date is required'
    }
    
    if (!formData.checkOut) {
      newErrors.checkOut = 'Check-out date is required'
    } else if (formData.checkIn && new Date(formData.checkOut) <= new Date(formData.checkIn)) {
      newErrors.checkOut = 'Check-out must be after check-in'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Store reservation in localStorage for demo
    const reservations = JSON.parse(localStorage.getItem('reservations') || '[]')
    const selectedRoom = roomTypes.find(r => r.value === formData.roomType)
    reservations.push({
      ...formData,
      roomRate: selectedRoom?.rate || 0,
      roomLabel: selectedRoom?.label || '',
      createdAt: new Date().toISOString()
    })
    localStorage.setItem('reservations', JSON.stringify(reservations))
    
    setSuccess(true)
    setIsSubmitting(false)
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setSuccess(false)
      setFormData({
        reservationNumber: '',
        guestName: '',
        address: '',
        contactNumber: '',
        roomType: '',
        checkIn: '',
        checkOut: ''
      })
    }, 3000)
  }

  const today = new Date().toISOString().split('T')[0]

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Add New Reservation</h1>
        <p className={styles.subtitle}>Create a new room reservation for incoming guests.</p>
      </header>

      {success && (
        <div className={styles.successAlert}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
          <div>
            <strong>Reservation Created Successfully!</strong>
            <p>Reservation #{formData.reservationNumber} has been saved.</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Reservation Details</h2>
          
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="reservationNumber" className={styles.label}>
                Reservation Number
              </label>
              <div className={styles.inputWithBtn}>
                <input
                  type="text"
                  id="reservationNumber"
                  name="reservationNumber"
                  value={formData.reservationNumber}
                  onChange={handleChange}
                  className={`${styles.input} ${errors.reservationNumber ? styles.inputError : ''}`}
                  placeholder="e.g., OVR-123456-ABC"
                />
                <button 
                  type="button" 
                  onClick={handleGenerateNumber}
                  className={styles.generateBtn}
                >
                  Generate
                </button>
              </div>
              {errors.reservationNumber && <span className={styles.error}>{errors.reservationNumber}</span>}
            </div>
          </div>
        </div>

        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Guest Information</h2>
          
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="guestName" className={styles.label}>Guest Name</label>
              <input
                type="text"
                id="guestName"
                name="guestName"
                value={formData.guestName}
                onChange={handleChange}
                className={`${styles.input} ${errors.guestName ? styles.inputError : ''}`}
                placeholder="Full name of guest"
              />
              {errors.guestName && <span className={styles.error}>{errors.guestName}</span>}
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="contactNumber" className={styles.label}>Contact Number</label>
              <input
                type="tel"
                id="contactNumber"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                className={`${styles.input} ${errors.contactNumber ? styles.inputError : ''}`}
                placeholder="Phone number"
              />
              {errors.contactNumber && <span className={styles.error}>{errors.contactNumber}</span>}
            </div>
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="address" className={styles.label}>Address</label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className={`${styles.textarea} ${errors.address ? styles.inputError : ''}`}
              placeholder="Guest's address"
              rows={3}
            />
            {errors.address && <span className={styles.error}>{errors.address}</span>}
          </div>
        </div>

        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Room & Dates</h2>
          
          <div className={styles.formGroup}>
            <label htmlFor="roomType" className={styles.label}>Room Type</label>
            <select
              id="roomType"
              name="roomType"
              value={formData.roomType}
              onChange={handleChange}
              className={`${styles.select} ${errors.roomType ? styles.inputError : ''}`}
            >
              <option value="">Select a room type</option>
              {roomTypes.map((room) => (
                <option key={room.value} value={room.value}>
                  {room.label} - ${room.rate}/night
                </option>
              ))}
            </select>
            {errors.roomType && <span className={styles.error}>{errors.roomType}</span>}
          </div>
          
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="checkIn" className={styles.label}>Check-in Date</label>
              <input
                type="date"
                id="checkIn"
                name="checkIn"
                value={formData.checkIn}
                onChange={handleChange}
                min={today}
                className={`${styles.input} ${errors.checkIn ? styles.inputError : ''}`}
              />
              {errors.checkIn && <span className={styles.error}>{errors.checkIn}</span>}
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="checkOut" className={styles.label}>Check-out Date</label>
              <input
                type="date"
                id="checkOut"
                name="checkOut"
                value={formData.checkOut}
                onChange={handleChange}
                min={formData.checkIn || today}
                className={`${styles.input} ${errors.checkOut ? styles.inputError : ''}`}
              />
              {errors.checkOut && <span className={styles.error}>{errors.checkOut}</span>}
            </div>
          </div>
        </div>

        <div className={styles.formActions}>
          <button 
            type="button" 
            className={styles.cancelBtn}
            onClick={() => setFormData({
              reservationNumber: '',
              guestName: '',
              address: '',
              contactNumber: '',
              roomType: '',
              checkIn: '',
              checkOut: ''
            })}
          >
            Clear Form
          </button>
          <button 
            type="submit" 
            className={styles.submitBtn}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className={styles.spinner}></span>
                Creating...
              </>
            ) : (
              'Create Reservation'
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
