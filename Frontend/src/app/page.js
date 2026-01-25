'use client'

import Link from 'next/link'
import Image from 'next/image'
import styles from './landing.module.css'

export default function LandingPage() {
  return (
    <div className={styles.page}>
      {/* Navigation */}
      <nav className={styles.nav}>
        <div className={styles.navContainer}>
          <div className={styles.logo}>
            <div className={styles.logoIconWrapper}>
              <svg className={styles.logoSvg} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M2 12c2-2 4-4 6-4s4 2 6 2 4-2 6-2 4 2 6 4" />
                <path d="M2 18c2-2 4-4 6-4s4 2 6 2 4-2 6-2 4 2 6 4" />
              </svg>
            </div>
            <span className={styles.logoText}>Ocean View </span>
          </div>
          <div className={styles.navLinks}>
            <Link href="/login" className={styles.navLink}>Login</Link>
            <Link href="/register" className={styles.navLinkBtn}>Register</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section with Image */}
      <header className={styles.hero}>
        <div className={styles.heroImageWrapper}>
          <Image
            src="/images/hero-resort.jpg"
            alt="Ocean View Resort - Luxury beachfront resort with infinity pool"
            fill
            priority
            className={styles.heroImage}
          />
        </div>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Welcome to <span className={styles.highlight}>Ocean View Resort</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Experience luxury where the ocean meets paradise. 
            Discover breathtaking views, world-class amenities, and unforgettable memories.
          </p>
          <div className={styles.heroBtns}>
            <Link href="/register" className={styles.btnPrimary}>
              Get Started
            </Link>
            <Link href="/login" className={styles.btnSecondary}>
              Staff Login
            </Link>
          </div>
        </div>
        <div className={styles.heroWave}>
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
            <path 
              fill="rgba(10, 22, 40, 0.95)" 
              d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,64C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
            />
          </svg>
        </div>
      </header>

      {/* Amenities Section with Images */}
      <section className={styles.amenities}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>World-Class Amenities</h2>
          <p className={styles.sectionSubtitle}>
            Indulge in premium facilities designed for your ultimate comfort and relaxation
          </p>
          <div className={styles.amenityGrid}>
            <div className={styles.amenityCard}>
              <div className={styles.amenityImageWrapper}>
                <Image
                  src="/images/amenity-spa.jpg"
                  alt="Luxury spa and wellness center"
                  fill
                  className={styles.amenityImage}
                />
              </div>
              <div className={styles.amenityOverlay}>
                <h3>Spa & Wellness</h3>
                <p>Rejuvenate with our signature treatments</p>
              </div>
            </div>
            <div className={styles.amenityCard}>
              <div className={styles.amenityImageWrapper}>
                <Image
                  src="/images/amenity-dining.jpg"
                  alt="Fine dining restaurant with ocean view"
                  fill
                  className={styles.amenityImage}
                />
              </div>
              <div className={styles.amenityOverlay}>
                <h3>Fine Dining</h3>
                <p>Award-winning culinary experiences</p>
              </div>
            </div>
            <div className={styles.amenityCard}>
              <div className={styles.amenityImageWrapper}>
                <Image
                  src="/images/amenity-pool.jpg"
                  alt="Infinity pool overlooking the ocean"
                  fill
                  className={styles.amenityImage}
                />
              </div>
              <div className={styles.amenityOverlay}>
                <h3>Infinity Pool</h3>
                <p>Swim with panoramic ocean views</p>
              </div>
            </div>
            <div className={styles.amenityCard}>
              <div className={styles.amenityImageWrapper}>
                <Image
                  src="/images/amenity-beach.jpg"
                  alt="Private beach with cabanas"
                  fill
                  className={styles.amenityImage}
                />
              </div>
              <div className={styles.amenityOverlay}>
                <h3>Private Beach</h3>
                <p>Exclusive access to pristine shores</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Room Types with Real Images */}
      <section className={styles.rooms}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Our Accommodations</h2>
          <p className={styles.sectionSubtitle}>
            Choose from our selection of beautifully appointed rooms and suites
          </p>
          <div className={styles.roomGrid}>
            <div className={styles.roomCard}>
              <div className={styles.roomImageWrapper}>
                <Image
                  src="/images/room-standard.jpg"
                  alt="Standard Room with ocean view"
                  fill
                  className={styles.roomImage}
                />
                <span className={styles.roomBadge}>Standard</span>
              </div>
              <div className={styles.roomInfo}>
                <h3>Standard Room</h3>
                <p>Comfortable and affordable with all essential amenities for a pleasant stay</p>
                <div className={styles.roomFooter}>
                  <span className={styles.roomPrice}>$99 / night</span>
                  <span className={styles.roomFeatures}>Queen Bed | Ocean View</span>
                </div>
              </div>
            </div>
            <div className={styles.roomCard}>
              <div className={styles.roomImageWrapper}>
                <Image
                  src="/images/room-deluxe.jpg"
                  alt="Deluxe Room with private balcony"
                  fill
                  className={styles.roomImage}
                />
                <span className={styles.roomBadgePopular}>Most Popular</span>
              </div>
              <div className={styles.roomInfo}>
                <h3>Deluxe Room</h3>
                <p>Spacious rooms with partial ocean views, premium amenities, and private balcony</p>
                <div className={styles.roomFooter}>
                  <span className={styles.roomPrice}>$199 / night</span>
                  <span className={styles.roomFeatures}>King Bed | Balcony</span>
                </div>
              </div>
            </div>
            <div className={styles.roomCard}>
              <div className={styles.roomImageWrapper}>
                <Image
                  src="/images/room-suite.jpg"
                  alt="Ocean Suite with panoramic views"
                  fill
                  className={styles.roomImage}
                />
                <span className={styles.roomBadgePremium}>Premium</span>
              </div>
              <div className={styles.roomInfo}>
                <h3>Ocean Suite</h3>
                <p>Luxurious suites with panoramic ocean views, living area, and private terrace</p>
                <div className={styles.roomFooter}>
                  <span className={styles.roomPrice}>$399 / night</span>
                  <span className={styles.roomFeatures}>King Suite | Terrace</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={styles.stats}>
        <div className={styles.container}>
          <div className={styles.statsGrid}>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>15+</span>
              <span className={styles.statLabel}>Years of Excellence</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>200+</span>
              <span className={styles.statLabel}>Luxury Rooms</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>50k+</span>
              <span className={styles.statLabel}>Happy Guests</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>4.9</span>
              <span className={styles.statLabel}>Guest Rating</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <div className={styles.container}>
          <h2>Ready for Your Dream Getaway?</h2>
          <p>Book your stay at Ocean View Resort and create memories that last a lifetime.</p>
          <Link href="/register" className={styles.btnPrimary}>
            Book Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.footerContent}>
            <div className={styles.footerBrand}>
              <div className={styles.logoIconWrapper}>
                <svg className={styles.logoSvg} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M2 12c2-2 4-4 6-4s4 2 6 2 4-2 6-2 4 2 6 4" />
                  <path d="M2 18c2-2 4-4 6-4s4 2 6 2 4-2 6-2 4 2 6 4" />
                </svg>
              </div>
              <span>Ocean View Resort</span>
            </div>
            <p className={styles.footerText}>
              123 Oceanfront Drive, Paradise Beach, CA 90210
            </p>
            <p className={styles.footerText}>
              2026 Ocean View Resort. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
