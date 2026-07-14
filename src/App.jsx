import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Characters from './components/Characters'
import Works from './components/Works'
import Interactive from './components/Interactive'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Ferrofluid from './components/Ferrofluid'

function App() {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      <div className="fixed inset-0 z-0" style={{ background: '#0a0705' }}>
        <Ferrofluid
          colors={['#f97316', '#fbbf24', '#fb923c', '#fed7aa']}
          speed={0.3}
          scale={1.3}
          turbulence={0.8}
          fluidity={0.1}
          rimWidth={0.3}
          sharpness={2.5}
          shimmer={0.8}
          glow={2.0}
          flowDirection="down"
          opacity={0.8}
          mouseInteraction={true}
          mouseStrength={0.5}
          mouseRadius={0.3}
        />
      </div>

      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <Characters />
          <Works />
          <Interactive />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default App
