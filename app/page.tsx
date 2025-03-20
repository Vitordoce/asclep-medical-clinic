import Image from "next/image";
import Header from "./components/Header";

export default function Home() {
  return (
    <div className="font-sans">
      <Header />
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white">
        <div className="container mx-auto px-6 py-20 max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Innovative Healthcare for a Better Tomorrow</h1>
              <p className="text-xl mb-8">Experience cutting-edge medical care with personalized attention at Asclep Medical Center.</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-white text-blue-600 px-6 py-3 rounded-md font-medium text-lg hover:bg-blue-50 transition-colors">
                  Book Appointment
                </button>
                <button className="bg-transparent border-2 border-white px-6 py-3 rounded-md font-medium text-lg hover:bg-white/10 transition-colors">
                  Virtual Consultation
                </button>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="relative h-80 w-full">
                <div className="absolute inset-0 bg-blue-600 rounded-lg transform rotate-3"></div>
                <div className="absolute inset-0 bg-white rounded-lg overflow-hidden">
                  <Image
                    src="/doctor-team.jpg"
                    alt="Medical team"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{ objectFit: 'cover' }}
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose Asclep</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Our advanced technology and patient-centered approach make us the preferred choice for healthcare.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Cutting-Edge Technology</h3>
              <p className="text-gray-600">Access to the latest medical innovations and equipment for accurate diagnosis and effective treatment.</p>
            </div>
            
            <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Expert Medical Team</h3>
              <p className="text-gray-600">Our specialists are leaders in their fields with extensive experience and ongoing training.</p>
            </div>
            
            <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Patient-Centered Care</h3>
              <p className="text-gray-600">Personalized treatment plans and compassionate care focused on your individual needs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Doctors Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Meet Our Specialists</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Our team of experienced doctors is committed to providing the highest standard of care.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Doctor 1 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow">
              <div className="h-64 relative">
                <Image
                  src="/doctor-1.jpg"
                  alt="Dr. Emma Wilson"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800">Dr. Emma Wilson</h3>
                <p className="text-blue-600 mb-3">Cardiologist</p>
                <p className="text-gray-600 mb-4">Specializing in advanced cardiac care with over 15 years of experience in treating complex heart conditions.</p>
                <button className="text-blue-600 font-medium hover:text-blue-800 transition-colors">View Profile →</button>
              </div>
            </div>
            
            {/* Doctor 2 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow">
              <div className="h-64 relative">
                <Image
                  src="/doctor-2.jpg"
                  alt="Dr. James Chen"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800">Dr. James Chen</h3>
                <p className="text-blue-600 mb-3">Neurologist</p>
                <p className="text-gray-600 mb-4">Expert in neurological disorders with a focus on innovative treatments and research in brain health.</p>
                <button className="text-blue-600 font-medium hover:text-blue-800 transition-colors">View Profile →</button>
              </div>
            </div>
            
            {/* Doctor 3 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow">
              <div className="h-64 relative">
                <Image
                  src="/doctor-3.jpg"
                  alt="Dr. Sarah Johnson"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800">Dr. Sarah Johnson</h3>
                <p className="text-blue-600 mb-3">Dermatologist</p>
                <p className="text-gray-600 mb-4">Specializing in advanced skin treatments and cosmetic procedures with a holistic approach to skin health.</p>
                <button className="text-blue-600 font-medium hover:text-blue-800 transition-colors">View Profile →</button>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-10">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-md font-medium text-lg hover:bg-blue-700 transition-colors">
              View All Specialists
            </button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Find answers to common questions about our services and procedures.</p>
          </div>
          
          <div className="space-y-6">
            {/* FAQ Item 1 */}
            <div className="bg-white rounded-xl p-6 shadow-md">
              <button className="flex justify-between items-center w-full text-left">
                <h3 className="text-lg font-semibold text-gray-800">What insurance plans do you accept?</h3>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="mt-3">
                <p className="text-gray-600">We accept most major insurance plans including Medicare, Blue Cross Blue Shield, Aetna, Cigna, and UnitedHealthcare. Please contact our office to verify coverage for your specific plan.</p>
              </div>
            </div>
            
            {/* FAQ Item 2 */}
            <div className="bg-white rounded-xl p-6 shadow-md">
              <button className="flex justify-between items-center w-full text-left">
                <h3 className="text-lg font-semibold text-gray-800">How do I schedule an appointment?</h3>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="mt-3">
                <p className="text-gray-600">You can schedule an appointment by calling our office, using our online booking system, or through our mobile app. Virtual consultations are also available for eligible patients.</p>
              </div>
            </div>
            
            {/* FAQ Item 3 */}
            <div className="bg-white rounded-xl p-6 shadow-md">
              <button className="flex justify-between items-center w-full text-left">
                <h3 className="text-lg font-semibold text-gray-800">What should I bring to my first appointment?</h3>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="mt-3">
                <p className="text-gray-600">Please bring your insurance card, photo ID, list of current medications, medical history records, and any referral forms if required by your insurance. Arriving 15 minutes early to complete paperwork is recommended.</p>
              </div>
            </div>
            
            {/* FAQ Item 4 */}
            <div className="bg-white rounded-xl p-6 shadow-md">
              <button className="flex justify-between items-center w-full text-left">
                <h3 className="text-lg font-semibold text-gray-800">Do you offer telehealth services?</h3>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="mt-3">
                <p className="text-gray-600">Yes, we offer secure telehealth services for consultations, follow-ups, and certain treatments. Our virtual platform is HIPAA-compliant and accessible through your computer or smartphone.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Patient Reviews</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">See what our patients are saying about their experience at Asclep Medical Center.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Review 1 */}
            <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-600 mb-6">&ldquo;The staff at Asclep Medical Center was incredibly attentive and professional. Dr. Wilson took the time to thoroughly explain my condition and treatment options. I felt listened to and cared for throughout my visit.&rdquo;</p>
              <div>
                <h4 className="font-semibold text-gray-800">Robert Thompson</h4>
                <p className="text-gray-500 text-sm">Patient since 2020</p>
              </div>
            </div>
            
            {/* Review 2 */}
            <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-600 mb-6">&ldquo;The telehealth service at Asclep is exceptional. I was able to consult with Dr. Chen from home, and the follow-up care was seamless. The technology they use makes healthcare so much more accessible.&rdquo;</p>
              <div>
                <h4 className="font-semibold text-gray-800">Michelle Garcia</h4>
                <p className="text-gray-500 text-sm">Patient since 2021</p>
              </div>
            </div>
            
            {/* Review 3 */}
            <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-600 mb-6">&ldquo;I&apos;ve been to many medical facilities, but Asclep stands out for their innovative approach. The digital check-in process was efficient, and the advanced imaging technology they used provided accurate results quickly.&rdquo;</p>
              <div>
                <h4 className="font-semibold text-gray-800">David Kim</h4>
                <p className="text-gray-500 text-sm">Patient since 2019</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-blue-900 to-blue-800 text-white">
        <div className="container mx-auto px-6 py-16 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            {/* Logo and About */}
            <div className="md:col-span-1">
              <div className="mb-6">
                <h3 className="text-2xl font-bold">Asclep</h3>
                <p className="text-blue-200 mt-1">Advanced Medical Care</p>
              </div>
              <p className="text-blue-100 mb-4">Pioneering healthcare with technology and compassion.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-blue-200 hover:text-white">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-blue-200 hover:text-white">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-blue-200 hover:text-white">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
            
            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-blue-200 hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="text-blue-200 hover:text-white transition-colors">Services</a></li>
                <li><a href="#" className="text-blue-200 hover:text-white transition-colors">Doctors</a></li>
                <li><a href="#" className="text-blue-200 hover:text-white transition-colors">Appointments</a></li>
                <li><a href="#" className="text-blue-200 hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>
            
            {/* Services */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Our Services</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-blue-200 hover:text-white transition-colors">Primary Care</a></li>
                <li><a href="#" className="text-blue-200 hover:text-white transition-colors">Specialty Care</a></li>
                <li><a href="#" className="text-blue-200 hover:text-white transition-colors">Telehealth</a></li>
                <li><a href="#" className="text-blue-200 hover:text-white transition-colors">Diagnostics</a></li>
                <li><a href="#" className="text-blue-200 hover:text-white transition-colors">Preventive Care</a></li>
              </ul>
            </div>
            
            {/* Contact */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-300 mt-1 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-blue-100">123 Medical Center Drive<br />San Francisco, CA 94158</span>
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-300 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-blue-100">(555) 123-4567</span>
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-300 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-blue-100">info@asclep.com</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-blue-700 mt-12 pt-8 text-center md:text-left md:flex md:justify-between md:items-center">
            <p className="text-blue-200">© 2023 Asclep Medical Center. All rights reserved.</p>
            <div className="mt-4 md:mt-0">
              <a href="#" className="text-blue-200 hover:text-white mr-4">Privacy Policy</a>
              <a href="#" className="text-blue-200 hover:text-white">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
