import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Characters from './components/Characters'
import Works from './components/Works'
import Interactive from './components/Interactive'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
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
  )
}

export default App
