import clsx from 'clsx'
import Link from '@docusaurus/Link'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Layout from '@theme/Layout'
import { useHistory } from '@docusaurus/router'
import { useRef, useCallback, useState, useEffect } from 'react'

import Heading from '@theme/Heading'
import styles from './index.module.css'

// Algolia search trigger component
function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('')
  const searchInputRef = useRef(null)
  const history = useHistory()

  // Function to trigger Algolia search
  const openSearchPage = useCallback(() => {
    // This will navigate to the search page with the current query
    if (searchQuery.trim()) {
      history.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    } else {
      // If empty, just open the search modal
      document.querySelector('.DocSearch-Button').click()
    }
  }, [searchQuery, history])

  // Handle Enter key press
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Enter') {
        openSearchPage()
      }
    },
    [openSearchPage]
  )

  // Handle Cmd+K / Ctrl+K shortcut
  useEffect(() => {
    const handleKeyPress = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        document.querySelector('.DocSearch-Button').click()
      }
    }

    document.addEventListener('keydown', handleKeyPress)
    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [])

  return (
    <>
      <input ref={searchInputRef} type="text" className={styles.searchInput} placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} onKeyDown={handleKeyDown} />
      <button className={styles.searchButton} onClick={openSearchPage} aria-label="Search">
        <span>⌘</span>
        <span>K</span>
      </button>
    </>
  )
}

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext()
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.searchBox} style={{ marginBottom: '50px' }}>
          <div className={styles.searchContainer}>
            <SearchBar />
          </div>
        </div>
      </div>
    </header>
  )
}

function Features() {
  return (
    <section className={styles.featuresSection}>
      <div className={styles.featureGrid}>
        <div className={styles.featureColumn}>
          <ul className={styles.featureList}>
            <li>Integrate in minutes and generate high-quality designs at scale.</li>
            <li>Access all Sivi features including visual editor via UI SDK and low-level core APIs are also available.</li>
            <li>Sivi generates multi-layered vector designs for your marketing and business use cases.</li>
          </ul>
        </div>
        <div className={styles.featureColumn}>
          <ul className={styles.featureList}>
            <li>Generate designs using natural language prompts that describe your design needs.</li>
            <li>Scale cost-effectively with flexible, developer-friendly integration options.</li>
            <li>Get Superuser Features. White-labeling, UI customisation, custom SDK deployment options.</li>
          </ul>
        </div>
      </div>
      <div className={styles.knowMoreButtonContainer}>
        <Link className={`button ${styles.knowMoreButton}`} to="/docs/intro">
          How does Sivi work?
        </Link>
      </div>
    </section>
  )
}

function IntegrationMethods() {
  return (
    <section className={styles.integrationSection}>
      <div className="container">
        <div className={styles.integrationHeader}>
          <h2>Ways to Integrate Sivi into Your App</h2>
          <p>Choose the integration method that best fits your development timeline and requirements</p>
        </div>
        <div className={styles.integrationGrid}>
          <div className={styles.integrationCard}>
            <div className={styles.integrationNumber}>
              <span>1</span>
            </div>
            <div className={styles.integrationContent}>
              <h3>Simple Client-Only SDK Integration</h3>
              <div className={styles.timeTag}>Approx time: 60 minutes to production</div>
              <ul className={styles.integrationList}>
                <li>Integrate our UI SDK as an HTML widget embed into your app</li>
                <li>Your end-users will be redirected to create a Sivi account</li>
                <li>End-users can use the widget for design generation with in your app</li>
                <li>Access generated designs using SDK Events for seamless integration</li>
              </ul>
              <div className={styles.pricingTag}>Pricing: Free to all users</div>
              <Link className={`button ${styles.integrationButton}`} to="/docs/sivi-ui-sdk/installation-config">
                Get Started
              </Link>
            </div>
          </div>

          <div className={styles.integrationCard}>
            <div className={styles.integrationNumber}>
              <span>2</span>
            </div>
            <div className={styles.integrationContent}>
              <h3>Simple Server-Only API Integration</h3>
              <div className={styles.timeTag}>Approx time: 4 hours to production</div>
              <ul className={styles.integrationList}>
                <li>Use our core Server APIs to generate designs with your API_KEY</li>
                <li>Handle input and storage of user data on your end</li>
                <li>Full control over the user experience and data flow</li>
                <li>Perfect for backend-heavy applications</li>
              </ul>
              <div className={styles.pricingTag}>Pricing: Starts with our Power plan. API Sandbox available.</div>
              <Link className={`button ${styles.integrationButton}`} to="/docs/sivi-api/core-api/core-overview">
                Get Started
              </Link>
            </div>
          </div>

          <div className={styles.integrationCard}>
            <div className={styles.integrationNumber}>
              <span>3</span>
            </div>
            <div className={styles.integrationContent}>
              <h3>Client SDK + User Management APIs</h3>
              <div className={styles.timeTag}>Approx time: 2 days to production</div>
              <ul className={styles.integrationList}>
                <li>Integrate our UI SDK as an HTML widget embed into your app</li>
                <li>Use our user management APIs to create and manage users with your API_KEY</li>
                <li>End-users can use the widget for design generation with in your app</li>
                <li>Access generated designs using SDK Events for seamless integration</li>
              </ul>
              <div className={styles.pricingTag}>Pricing: Starts with our Superpower plan + per user storage cost</div>
              <Link className={`button ${styles.integrationButton}`} to="/docs/sivi-ui-sdk/superuser-features/superuser-installation-config">
                Get Started
              </Link>
            </div>
          </div>

          <div className={styles.integrationCard}>
            <div className={styles.integrationNumber}>
              <span>4</span>
            </div>
            <div className={styles.integrationContent}>
              <h3>Enterprise Integration</h3>
              <div className={styles.timeTag}>Volume-based: Minimum 1000 users per month</div>
              <ul className={styles.integrationList}>
                <li>Combination of Server APIs and UI SDK capabilities</li>
                <li>Custom theme and white-labeling options for UI SDK</li>
                <li>Flexible deployment options and staging environments</li>
                <li>Dedicated support and custom feature development</li>
                <li>Influence feature prioritization</li>
              </ul>
              <div className={styles.pricingTag}>Pricing: Talk to us for best deals</div>
              <a className={`button ${styles.integrationButton}`} href="mailto:support@sivi.ai?subject=Enterprise%20Integration%20Inquiry">
                Contact Sales
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function DocumentationSection() {
  return (
    <section className={styles.documentationSection}>
      <div className="container">
        <div className={styles.docGrid}>
          <div className={styles.docCard}>
            <h3>UI SDK Documentation</h3>
            <p>Quickly embed Sivi's design generation capabilities into your web app using ready-to-use UI components and widgets.</p>
            <Link className={`button button--primary ${styles.docButton}`} to="/docs/sivi-ui-sdk/overview">
              View Document
            </Link>
          </div>
          <div className={styles.docCard}>
            <h3>API Documentation</h3>
            <p>Integrate Sivi's AI design generation capabilities using a simple REST API and create stunning visuals at scale.. Fast to set up and cost effective.</p>
            <Link className={`button button--primary ${styles.docButton}`} to="/docs/sivi-api/overview">
              View Document
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

function SiviWidgetDemo() {
  return (
    <section className={styles.widgetSection}>
      <div className="container">
        <h3>Sivi UI SDK Integration.</h3>
        <p>Embed Sivi's design generation capabilities into your web app using ready-to-use UI widgets.</p>
        <div className={styles.widgetImageContainer}>
          <img src="/assets/images/uisdk-4-368d829427fb7079afb981377a0ed71c.png" alt="Sivi Widget Demo - Restaurant Design Interface" className={styles.widgetImage} />
        </div>
        <div className={styles.widgetButtonContainer}>
          <Link className={`button ${styles.widgetButton}`} to="/docs/sivi-ui-sdk/overview">
            Try UI SDK
          </Link>
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext()
  return (
    <Layout title={`${siteConfig.title}`} description="Sivi AI for Developers. Sivi is a generative AI for design creation.">
      <HomepageHeader />
      <main>
        <IntegrationMethods />
        <Features />
        <SiviWidgetDemo />
        <DocumentationSection />
      </main>
    </Layout>
  )
}
