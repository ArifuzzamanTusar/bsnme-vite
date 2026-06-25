import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Hero from './components/sections/Hero'
import TrustBar from './components/sections/TrustBar'
import HowItWorks from './components/sections/HowItWorks'
import Coverage from './components/sections/Coverage'
import Services from './components/sections/Services'
import Testimonials from './components/sections/Testimonials'
import WhyUs from './components/sections/WhyUs'
import ShopOwners from './components/sections/ShopOwners'
import FAQ from './components/sections/FAQ'
import CTAStrip from './components/sections/CTAStrip'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <HowItWorks />
        <Coverage />
        <Services />
        <Testimonials />
        <WhyUs />
        <ShopOwners />
        <FAQ />
        <CTAStrip />
      </main>
      <Footer />
    </>
  )
}
