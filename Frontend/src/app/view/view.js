'use client'

import React from "react"

import { useState } from 'react'
import styles from './view-reservation.module.css'

export default function ViewReservationPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [reservation, setReservation] = useState<Reservation | null>(null)
  const [isSearching, setIsSearching] = useState(false)
  const [error, setError] = useState('')
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = async (e) => {
    e.preventDefault()
    
    if (!searchQuery.trim()) {
      setError('Please enter a reservation number')
      return
    }
    
    setIsSearching(true)
    setError('')
    setReservation(null)
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800))
    
    // Search in localStorage
    const reservations = JSON.parse(localStorage.getItem('reservations') || '[]')
    const found = reservations.find(
      r => r.reservationNumber.toLowerCase() === searchQuery.toLowerCase()
    )
    
    if (found) {
      setReservation(found)
    } else {
      setError('No reservation found with this number')
    }
    
    setHasSearched(true)
    setIsSearching(false)
  }

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const calculateNights = (checkIn, checkOut) => {
    const start = new Date(checkIn)
    const end = new Date(checkOut)
    const diffTime = Math.abs(end.getTime() - start.getTime())
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>View Reservation</h1>
        <p className={styles.subtitle}>Search for existing reservations by reservation number.</p>
      </header>

      {/* Search Form */}
      <div className={styles.searchCard}>
        <form onSubmit={handleSearch} className={styles.searchForm}>
          <div className={styles.searchInputWrapper}>
            <svg className={styles.searchIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setError('')
              }}
              className={styles.searchInput}
              placeholder="Enter reservation number (e.g., OVR-123456-ABC)"
            />
          </div>
          <button 
            type="submit" 
            className={styles.searchBtn}
            disabled={isSearching}
          >
            {isSearching ? (
              <>
                <span className={styles.spinner}></span>
                Searching...
              </>
            ) : (
              'Search'
            )}
          </button>
        </form>
        
        {error && (
          <div className={styles.errorMessage}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="15" y1="9" x2="9" y2="15" />
              <line x1="9" y1="9" x2="15" y2="15" />
            </svg>
            {error}
          </div>
        )}
      </div>

      {/* Reservation Details */}
      {reservation && (
        <div className={styles.resultCard}>
          <div className={styles.resultHeader}>
            <div>
              <span className={styles.reservationLabel}>Reservation</span>
              <h2 className={styles.reservationNumber}>{reservation.reservationNumber}</h2>
            </div>
            <span className={styles.statusBadge}>Confirmed</span>
          </div>

          <div className={styles.detailsGrid}>
            <div className={styles.detailSection}>
              <h3 className={styles.sectionTitle}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                Guest Information
              </h3>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Name</span>
                <span className={styles.detailValue}>{reservation.guestName}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Contact</span>
                <span className={styles.detailValue}>{reservation.contactNumber}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Address</span>
                <span className={styles.detailValue}>{reservation.address}</span>
              </div>
            </div>

            <div className={styles.detailSection}>
              <h3 className={styles.sectionTitle}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
                Room Details
              </h3>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Room Type</span>
                <span className={styles.detailValue}>{reservation.roomLabel}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Rate per Night</span>
                <span className={styles.detailValue}>${reservation.roomRate}</span>
              </div>
            </div>

            <div className={styles.detailSection}>
              <h3 className={styles.sectionTitle}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                Stay Duration
              </h3>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Check-in</span>
                <span className={styles.detailValue}>{formatDate(reservation.checkIn)}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Check-out</span>
                <span className={styles.detailValue}>{formatDate(reservation.checkOut)}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Total Nights</span>
                <span className={styles.detailValue}>
                  {calculateNights(reservation.checkIn, reservation.checkOut)} nights
                </span>
              </div>
            </div>
          </div>

          <div className={styles.resultFooter}>
            <span className={styles.createdAt}>
              Reservation created: {new Date(reservation.createdAt).toLocaleString()}
            </span>
          </div>
        </div>
      )}

      {/* Empty State */}
      {hasSearched && !reservation && !error && (
        <div className={styles.emptyState}>
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <h3>No Results Found</h3>
          <p>Try searching with a different reservation number.</p>
        </div>
      )}

      {/* Initial State */}
      {!hasSearched && (
        <div className={styles.initialState}>
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <polyline points="10 9 9 9 8 9" />
          </svg>
          <h3>Search for a Reservation</h3>
          <p>Enter a reservation number above to view its details.</p>
        </div>
      )}
    </div>
  )
}
