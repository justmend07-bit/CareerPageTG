import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import Itinerary from "@/components/itinerary"
import Gallery from "@/components/gallery"
import Testimonials from "@/components/testimonials"
import Form from "@/components/form"
import Footer from "@/components/footer"

export default function TrekRegistration() {
  return (
    <div className=" relative min-h-screen bg-gradient-to-t to-amber-100 via-orange-50 from-white overflow-hidden  ">
      <Navbar />
      <Hero />
      <Itinerary />
      <Gallery />
      <Testimonials />
      <Form />
      <Footer />
    </div>
  )
}