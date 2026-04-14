import { Header, Hero, About, Projects, Skills, Contact, Footer, StarryBackground, AiChat } from './components'

function App() {
  return (
    <div className="relative min-h-screen text-white overflow-x-hidden">
      <StarryBackground />
      <div className="relative z-10">
        <Header />
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
        <Footer />
      </div>
      <AiChat />
    </div>
  )
}

export default App
