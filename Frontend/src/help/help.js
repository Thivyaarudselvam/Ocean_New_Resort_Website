'use client'

import { useState } from 'react'
import styles from './help.module.css'

const helpSections = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <polygon points="10 8 16 12 10 16 10 8" />
      </svg>
    ),
    content: [
      {
        title: 'Logging In',
        description: 'Use your assigned username and password to log into the system. Contact your supervisor if you need login credentials or if you forget your password.'
      },
      {
        title: 'Dashboard Overview',
        description: 'After logging in, you will see the main dashboard with quick access to all system functions including new reservations, viewing existing bookings, calculating bills, and accessing help.'
      },
      {
        title: 'Navigation',
        description: 'Use the sidebar menu on the left to navigate between different sections of the system. On mobile devices, tap the menu icon to open the navigation.'
      }
    ]
  },
  {
    id: 'reservations',
    title: 'Managing Reservations',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
    content: [
      {
        title: 'Creating a New Reservation',
        description: 'Go to "Add Reservation" from the dashboard. Fill in all required fields including reservation number (or click Generate), guest name, contact information, room type, and check-in/check-out dates. Click "Create Reservation" to save.'
      },
      {
        title: 'Generating Reservation Numbers',
        description: 'Click the "Generate" button next to the reservation number field to automatically create a unique reservation number. You can also enter a custom number if required by your hotel\'s policy.'
      },
      {
        title: 'Viewing Reservation Details',
        description: 'Go to "View Reservation" and enter the reservation number in the search box. The system will display all details including guest information, room type, and stay duration.'
      },
      {
        title: 'Room Types Available',
        description: 'Standard Room ($99/night), Deluxe Room ($199/night), Ocean Suite ($399/night), and Penthouse ($599/night). Each room type has different amenities and views.'
      }
    ]
  },
  {
    id: 'billing',
    title: 'Billing & Checkout',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M7 15h0M2 9.5h20" />
      </svg>
    ),
    content: [
      {
        title: 'Calculating a Bill',
        description: 'Go to "Calculate Bill" and enter the reservation number. The system will automatically calculate the total cost based on the room rate and number of nights, plus applicable taxes (12%).'
      },
      {
        title: 'Bill Components',
        description: 'Each bill includes: Room charges (rate × nights), Tax (12% of room total), and the Grand Total. All amounts are displayed in US dollars.'
      },
      {
        title: 'Printing Bills',
        description: 'Click the "Generate / Print Bill" button to open the print dialog. You can print the bill directly or save it as a PDF for digital records.'
      },
      {
        title: 'Guest Receipt',
        description: 'The printed bill includes all guest and reservation information, itemized charges, and hotel contact details for future reference.'
      }
    ]
  },
  {
    id: 'troubleshooting',
    title: 'Troubleshooting',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
    content: [
      {
        title: 'Reservation Not Found',
        description: 'Double-check the reservation number for typos. Ensure you are searching with the complete reservation number including the prefix (e.g., OVR-123456-ABC).'
      },
      {
        title: 'Cannot Create Reservation',
        description: 'Ensure all required fields are filled correctly. Check-out date must be after check-in date. Phone numbers must be at least 10 digits.'
      },
      {
        title: 'Print Not Working',
        description: 'Make sure your browser allows pop-ups for this site. Check that your printer is connected and has paper. Try using Chrome or Firefox for best printing results.'
      },
      {
        title: 'Session Expired',
        description: 'If you are logged out unexpectedly, simply log back in with your credentials. Your saved reservations will still be available.'
      }
    ]
  }
]

export default function HelpPage() {
  const [activeSection, setActiveSection] = useState('getting-started')

  const currentSection = helpSections.find(s => s.id === activeSection)

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Help & Support</h1>
        <p className={styles.subtitle}>Staff instructions and system guide for Ocean View Resort.</p>
      </header>

      <div className={styles.content}>
        {/* Section Navigation */}
        <aside className={styles.sidebar}>
          <nav className={styles.sectionNav}>
            {helpSections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`${styles.sectionBtn} ${activeSection === section.id ? styles.sectionBtnActive : ''}`}
              >
                {section.icon}
                <span>{section.title}</span>
              </button>
            ))}
          </nav>

          <div className={styles.contactCard}>
            <h4>Need More Help?</h4>
            <p>Contact the IT department for technical support.</p>
            <div className={styles.contactInfo}>
              <span>Phone: (555) 123-4567</span>
              <span>Email: support@oceanviewresort.com</span>
            </div>
          </div>
        </aside>

        {/* Help Content */}
        <main className={styles.main}>
          {currentSection && (
            <div className={styles.sectionContent}>
              <div className={styles.sectionHeader}>
                <span className={styles.sectionIcon}>{currentSection.icon}</span>
                <h2>{currentSection.title}</h2>
              </div>

              <div className={styles.helpItems}>
                {currentSection.content.map((item, index) => (
                  <div key={index} className={styles.helpItem}>
                    <h3 className={styles.helpItemTitle}>
                      <span className={styles.helpItemNumber}>{index + 1}</span>
                      {item.title}
                    </h3>
                    <p className={styles.helpItemDesc}>{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Quick Tips */}
      <section className={styles.quickTips}>
        <h3 className={styles.quickTipsTitle}>Quick Tips</h3>
        <div className={styles.tipsGrid}>
          <div className={styles.tipCard}>
            <span className={styles.tipIcon}>💡</span>
            <p>Always verify guest ID before check-in</p>
          </div>
          <div className={styles.tipCard}>
            <span className={styles.tipIcon}>📋</span>
            <p>Double-check dates before confirming reservations</p>
          </div>
          <div className={styles.tipCard}>
            <span className={styles.tipIcon}>🔐</span>
            <p>Log out when leaving your workstation</p>
          </div>
          <div className={styles.tipCard}>
            <span className={styles.tipIcon}>📞</span>
            <p>Call IT support for any technical issues</p>
          </div>
        </div>
      </section>
    </div>
  )
}
