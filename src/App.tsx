import { useRef, useState, useEffect } from "react"
import { useMousePosition } from "@/hooks/use-mouse-position"
import Roles from './pages/Roles'
import ApplicationForm from './pages/ApplicationForm'
import './App.css'
import TransitionWrapper from './components/TransitionWrapper';

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentPage, setCurrentPage] = useState<'home' | 'roles' | 'form'>('home')
  const [fade, setFade] = useState(false)
  const { x, y, initializeTracking } = useMousePosition(containerRef)

  useEffect(() => {
    if (currentPage === 'home' && containerRef.current) {
      initializeTracking()
    }
  }, [currentPage, initializeTracking])

  // Generate random grid pattern with more density
  const generateRandomPattern = (width: number, height: number) => {
    const types = ['l', 'm', 'd', 'b'] // light, medium, dark, black
    const weights = [0.3, 0.3, 0.25, 0.15] // probability distribution
    const sizes = ['sm', 'md', 'lg'] // size variations
    
    return Array(height).fill(null).map(() => 
      Array(width).fill(null).map(() => {
        const rand = Math.random()
        let cumulative = 0
        // Ensure larger symbols appear less frequently
        const size = Math.random() > 0.85 ? 'lg' : Math.random() > 0.5 ? 'md' : 'sm'
        for (let i = 0; i < weights.length; i++) {
          cumulative += weights[i]
          if (rand < cumulative) {
            return `${types[i]}-${size}`
          }
        }
        return `${types[0]}-${size}`
      }).join(',')
    )
  }

  // Increased width to match text content width, adjusted height for proportion
  const gridPattern = generateRandomPattern(24, 10) // Wider and taller grid

  const handlePageChange = (page: 'home' | 'roles' | 'form') => {
    setFade(true);
    setTimeout(() => {
      setCurrentPage(page);
      setFade(false);
    }, 500);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <div className="main-container" ref={containerRef}>
            <header>
              <h1 className="brand">Kenesis.</h1>
            </header>

            <div className="content-wrapper">
              <div className="content">
                <div className="hero-section">
                  <h2 className="headline">Hey,</h2>
                  
                  <div className="plus-grid">
                    {gridPattern.map((row, rowIndex) => (
                      <div key={rowIndex} className="plus-row">
                        {row.split(',').map((type, colIndex) => (
                          <span 
                            key={`${rowIndex}-${colIndex}`} 
                            className={`plus plus-${type}`}
                          >
                            +
                          </span>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-section">
                  <div className="description">
                    <p>
                      At <strong>Kenesis</strong>, we bring <em>our ideas</em> to life with precision—from{' '}
                      <span className="highlight-blue">innovative design</span>{' '}
                      and{' '}
                      <span className="highlight-red">groundbreaking technology</span>{' '}
                      to{' '}
                      <span className="highlight-green">seamless deployment</span>
                      —all crafted to redefine possibilities.
                    </p>
                  </div>

                  <p className="subtext">
                  build groundbreaking solutions and shaping the future of innovation with us.
                  </p>

                  <div className="button-group">
                    <button className="btn btn-outline" onClick={() => handlePageChange('roles')}>Show roles</button>
                    <button className="btn btn-solid" onClick={() => handlePageChange('form')}>Apply →</button>
                  </div>
                </div>
              </div>
            </div>

            <div className="cursor-tracker">
              <div
                className="cursor-line vertical"
                style={{ left: `${x}px` }}
              />
              <div
                className="cursor-line horizontal"
                style={{ top: `${y}px` }}
              />
              <div
                className="cursor-dot"
                style={{
                  top: `${y}px`,
                  left: `${x}px`,
                }}
              />
            </div>
          </div>
        )
      case 'roles':
        return <Roles onBack={() => handlePageChange('home')} onApply={() => handlePageChange('form')} />
      case 'form':
        return <ApplicationForm onBack={() => handlePageChange(currentPage === 'roles' ? 'roles' : 'home')} />
      default:
        return null
    }
  }

  return (
    <TransitionWrapper>
      <div className={`app ${fade ? 'fade-out' : ''}`}> 
        {renderPage()}
      </div>
    </TransitionWrapper>
  )
}
