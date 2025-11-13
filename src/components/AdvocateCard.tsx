'use client';

import type { Advocate } from '@/types/advocate';

interface AdvocateCardProps {
  advocate: Advocate;
}

export function AdvocateCard({ advocate }: AdvocateCardProps) {
  const {
    firstName,
    lastName,
    city,
    degree,
    specialties,
    yearsOfExperience,
    phoneNumber,
  } = advocate;

  const formattedPhone = formatPhoneNumber(phoneNumber);

  return (
    <article
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 p-6 border border-gray-200"
      style={{
        borderColor: 'rgb(229, 231, 235)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = '#265b4e';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgb(229, 231, 235)';
      }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-gray-900 mb-1">
            {firstName} {lastName}
          </h2>
          <p className="text-sm text-gray-600 font-medium">{degree}</p>
        </div>

        <button
          className="ml-4 px-4 py-2 text-white text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors"
          style={{ backgroundColor: '#265b4e' }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1a3f36'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#265b4e'}
          aria-label={`Connect with ${firstName} ${lastName}`}
        >
          Connect
        </button>
      </div>

      <div className="mb-4">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
          Specialties
        </h3>
        <div className="flex flex-wrap gap-2">
          {specialties.slice(0, 4).map((specialty, index) => (
            <span
              key={index}
              className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"
              style={{
                backgroundColor: 'rgba(38, 91, 78, 0.1)',
                color: '#265b4e',
                border: '1px solid rgba(38, 91, 78, 0.3)',
              }}
            >
              {specialty}
            </span>
          ))}
          {specialties.length > 4 && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
              +{specialties.length - 4} more
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-100">
        <div className="flex items-start gap-2">
          <svg
            className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <div className="min-w-0">
            <p className="text-xs text-gray-500 mb-0.5">Location</p>
            <p className="text-sm font-medium text-gray-900 truncate">{city}</p>
          </div>
        </div>

        <div className="flex items-start gap-2">
          <svg
            className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
            />
          </svg>
          <div className="min-w-0">
            <p className="text-xs text-gray-500 mb-0.5">Experience</p>
            <p className="text-sm font-medium text-gray-900">
              {yearsOfExperience} {yearsOfExperience === 1 ? 'year' : 'years'}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-2">
          <svg
            className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>
          <div className="min-w-0">
            <p className="text-xs text-gray-500 mb-0.5">Phone</p>
            <a
              href={`tel:${phoneNumber}`}
              className="text-sm font-medium hover:underline"
              style={{ color: '#265b4e' }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#1a3f36'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#265b4e'}
            >
              {formattedPhone}
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}

function formatPhoneNumber(phoneNumber: string | number): string {
  const phoneStr = String(phoneNumber);

  if (phoneStr.length === 10) {
    return `(${phoneStr.slice(0, 3)}) ${phoneStr.slice(3, 6)}-${phoneStr.slice(6)}`;
  }

  return phoneStr;
}
