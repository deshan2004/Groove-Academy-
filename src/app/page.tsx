import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ClassSchedule from "@/components/ClassSchedule";
import EnrollmentSection from "@/components/EnrollmentSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-academy-black text-academy-white font-sans selection:bg-academy-gold selection:text-black">
      <Navbar />
      
      {/* Hero Section */}
      <Hero />
      
      {/* Separator */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-academy-gold/30 to-transparent" />
      
      {/* Classes Section */}
      <ClassSchedule />
      
      {/* Separator */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-academy-red/30 to-transparent" />
      
      {/* Enrollment Section */}
      <EnrollmentSection />
      
      {/* Footer */}
      <Footer />
    </main>
  );
}
