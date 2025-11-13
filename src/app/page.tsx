'use client';

import { AdvocateTable } from '@/components/AdvocateTable';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-emerald-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold" style={{ color: '#265b4e' }}>
                Solace
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Health Care Advocate Network
              </p>
            </div>
            <div className="hidden sm:block">
              <div className="flex items-center gap-4">
                <a
                  href="#"
                  className="text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                  About
                </a>
                <a
                  href="#"
                  className="text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                  Resources
                </a>
                <button
                  className="px-4 py-2 text-white text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors"
                  style={{ backgroundColor: '#265b4e' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1a3f36'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#265b4e'}
                >
                  Become an Advocate
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="text-white" style={{ background: 'linear-gradient(to right, #265b4e, #10b981)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-3xl">
            <h2 className="text-4xl font-bold mb-4">
              Find Your Health Care Advocate
            </h2>
            <p className="text-xl mb-6" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
              At Solace, we match patients with advocates who are best suited to their needs.
              Connect with experienced professionals who understand your journey and can provide
              personalized guidance, support, and resources throughout your health care experience.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  style={{ color: 'rgba(255, 255, 255, 0.8)' }}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm">100,000+ Advocates</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  style={{ color: 'rgba(255, 255, 255, 0.8)' }}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm">All Health Specialties</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  style={{ color: 'rgba(255, 255, 255, 0.8)' }}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm">Nationwide Coverage</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <AdvocateTable />
      </main>

      <footer className="bg-gray-900 text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-xl font-bold mb-4">Solace</h3>
              <p className="text-gray-400 mb-4">
                At Solace, we aim to match patients with the advocate who is best suited to their needs.
                Our advocates provide personalized support, guidance, and resources throughout your health care journey.
              </p>
              <p className="text-sm text-gray-500">
                &copy; 2024 Solace. All rights reserved.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">
                Resources
              </h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white text-sm">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white text-sm">
                    How It Works
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white text-sm">
                    For Advocates
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white text-sm">
                    Support Resources
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">
                Contact
              </h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white text-sm">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white text-sm">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white text-sm">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white text-sm">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
