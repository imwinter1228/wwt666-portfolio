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
      <div className="fixed inset-0 z-0" style={{ background: '#FFFBF5' }}>
        <Ferrofluid
          colors={['#f97316', '#fbbf24', '#fb923c', '#fed7aa']}
          speed={0.25}
          scale={1.4}
          turbulence={0.7}
          fluidity={0.12}
          rimWidth={0.25}
          sharpness={2.5}
          shimmer={0.6}
          glow={1.2}
          flowDirection="down"
          opacity={0.45}
          mouseInteraction={true}
          mouseStrength={0.4}
          mouseRadius={0.25}
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
