'use client'

import React from "react"

import { useState, useRef } from 'react'
import styles from './bill.module.css'

export default function BillPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [reservation, setReservation] = useState(null)
  const [isSearching, setIsSearching] = useState(false)
  const [error, setError] = useState('')
  const billRef = useRef(null)

  const handleSearch = async (e) => {
    e.preventDefault()
    
    if (!searchQuery.trim()) {
      setError('Please enter a reservation number')
      return
    }
    
    setIsSearching(true)
    setError('')
    setReservation(null)
    
    await new Promise(resolve => setTimeout(resolve, 800))
    
    const reservations = JSON.parse(localStorage.getItem('reservations') || '[]')
    const found = reservations.find(
      r => r.reservationNumber.toLowerCase() === searchQuery.toLowerCase()
    )
    
    if (found) {
      setReservation(found)
    } else {
      setError('No reservation found with this number')
    }
    
    setIsSearching(false)
  }

  const calculateNights = (checkIn, checkOut) => {
    const start = new Date(checkIn)
    const end = new Date(checkOut)
    const diffTime = Math.abs(end.getTime() - start.getTime())
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  const handlePrint = () => {
    if (billRef.current) {
      const printContents = billRef.current.innerHTML
      const originalContents = document.body.innerHTML
      
      document.body.innerHTML = `
        <html>
          <head>
            <title>Bill - ${reservation?.reservationNumber}</title>
            <style>
              body { font-family: 'Segoe UI', sans-serif; padding: 40px; background: white; color: #1e293b; }
              .bill-header { text-align: center; margin-bottom: 40px; border-bottom: 2px solid #14b8a6; padding-bottom: 20px; }
              .bill-header h1 { color: #0f2744; margin: 0; font-size: 28px; }
              .bill-header p { color: #64748b; margin: 8px 0 0; }
              .bill-details { display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin-bottom: 30px; }
              .detail-section h3 { color: #14b8a6; font-size: 14px; text-transform: uppercase; margin-bottom: 16px; }
              .detail-item { margin-bottom: 12px; }
              .detail-label { color: #64748b; font-size: 13px; }
              .detail-value { color: #1e293b; font-size: 15px; font-weight: 500; }
              .bill-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
              .bill-table th, .bill-table td { padding: 12px; text-align: left; border-bottom: 1px solid #e2e8f0; }
              .bill-table th { background: #f1f5f9; color: #64748b; font-size: 13px; text-transform: uppercase; }
              .bill-table td { color: #1e293b; }
              .bill-total { background: #0f2744; color: white; padding: 20px; border-radius: 8px; text-align: right; }
              .bill-total .label { color: #94a3b8; font-size: 14px; }
              .bill-total .amount { font-size: 32px; font-weight: 700; color: #14b8a6; }
              .bill-footer { text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #e2e8f0; color: #64748b; font-size: 13px; }
              @media print { body { padding: 20px; } }
            </style>
          </head>
          <body>${printContents}</body>
        </html>
      `
      
      window.print()
      document.body.innerHTML = originalContents
      window.location.reload()
    }
  }

  const nights = reservation ? calculateNights(reservation.checkIn, reservation.checkOut) : 0
  const roomTotal = reservation ? nights * reservation.roomRate : 0
  const tax = roomTotal * 0.12
  const grandTotal = roomTotal + tax

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Calculate Bill</h1>
        <p className={styles.subtitle}>Generate and print bills for guest checkouts.</p>
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
              placeholder="Enter reservation number to generate bill"
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
              'Find'
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

      {/* Bill Display */}
      {reservation && (
        <>
          <div className={styles.billCard} ref={billRef}>
            <div className="bill-header">
              <h1>Ocean View Resort</h1>
              <p>123 Oceanfront Drive, Paradise Beach, CA 90210</p>
            </div>

            <div className="bill-details">
              <div className="detail-section">
                <h3>Guest Information</h3>
                <div className="detail-item">
                  <div className="detail-label">Name</div>
                  <div className="detail-value">{reservation.guestName}</div>
                </div>
                <div className="detail-item">
                  <div className="detail-label">Contact</div>
                  <div className="detail-value">{reservation.contactNumber}</div>
                </div>
                <div className="detail-item">
                  <div className="detail-label">Address</div>
                  <div className="detail-value">{reservation.address}</div>
                </div>
              </div>

              <div className="detail-section">
                <h3>Reservation Details</h3>
                <div className="detail-item">
                  <div className="detail-label">Reservation #</div>
                  <div className="detail-value">{reservation.reservationNumber}</div>
                </div>
                <div className="detail-item">
                  <div className="detail-label">Check-in</div>
                  <div className="detail-value">{new Date(reservation.checkIn).toLocaleDateString()}</div>
                </div>
                <div className="detail-item">
                  <div className="detail-label">Check-out</div>
                  <div className="detail-value">{new Date(reservation.checkOut).toLocaleDateString()}</div>
                </div>
              </div>
            </div>

            <table className="bill-table">
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Qty</th>
                  <th>Rate</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{reservation.roomLabel}</td>
                  <td>{nights} night{nights !== 1 ? 's' : ''}</td>
                  <td>${reservation.roomRate.toFixed(2)}</td>
                  <td>${roomTotal.toFixed(2)}</td>
                </tr>
                <tr>
                  <td>Tax (12%)</td>
                  <td>-</td>
                  <td>-</td>
                  <td>${tax.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>

            <div className="bill-total">
              <div className="label">Grand Total</div>
              <div className="amount">${grandTotal.toFixed(2)}</div>
            </div>

            <div className="bill-footer">
              <p>Thank you for choosing Ocean View Resort!</p>
              <p>For inquiries, please call: (555) 123-4567</p>
            </div>
          </div>

          {/* Summary Cards */}
          <div className={styles.summaryGrid}>
            <div className={styles.summaryCard}>
              <span className={styles.summaryLabel}>Number of Nights</span>
              <span className={styles.summaryValue}>{nights}</span>
            </div>
            <div className={styles.summaryCard}>
              <span className={styles.summaryLabel}>Room Rate</span>
              <span className={styles.summaryValue}>${reservation.roomRate}/night</span>
            </div>
            <div className={styles.summaryCard}>
              <span className={styles.summaryLabel}>Room Total</span>
              <span className={styles.summaryValue}>${roomTotal.toFixed(2)}</span>
            </div>
            <div className={`${styles.summaryCard} ${styles.summaryCardHighlight}`}>
              <span className={styles.summaryLabel}>Grand Total</span>
              <span className={styles.summaryValueLarge}>${grandTotal.toFixed(2)}</span>
            </div>
          </div>

          {/* Print Button */}
          <div className={styles.actions}>
            <button onClick={handlePrint} className={styles.printBtn}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 6 2 18 2 18 9" />
                <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                <rect x="6" y="14" width="12" height="8" />
              </svg>
              Generate / Print Bill
            </button>
          </div>
        </>
      )}

      {/* Initial State */}
      {!reservation && !error && (
        <div className={styles.initialState}>
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="M7 15h0M2 9.5h20" />
          </svg>
          <h3>Generate a Bill</h3>
          <p>Enter a reservation number above to calculate and print a bill.</p>
        </div>
      )}
    </div>
  )
}
