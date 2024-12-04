'use client';

import React from 'react';

export default function AboutUsPage() {
  return (
    <div className="w-full min-h-screen bg-white text-[#013c6c]">
      <div className="p-8 max-w-7xl mx-auto">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-[#013c6c]">About Us</h1>
          <p className="text-lg mb-6">
            Connecting people to their perfect rental home, hassle-free.
          </p>
        </section>

        {/* Our Story Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-4 text-[#013c6c]">Our Story</h2>
          <p className="text-lg leading-relaxed text-gray-700">
            We started Dwello to help people easily find their perfect rental property. After experiencing the struggles of searching for quality rental properties ourselves, we realized there had to be a better way. Our goal is to empower renters and landlords with tools that make renting easy and stress-free.
          </p>
        </section>

        {/* Our Values Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-4 text-[#013c6c]">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: 'Transparency', description: 'We believe in being transparent with both renters and landlords.' },
              { title: 'Customer-Centric', description: 'Our users are at the core of everything we do.' },
              { title: 'Innovation', description: 'We continually innovate to simplify the rental process.' },
              { title: 'Trust & Safety', description: 'Your safety and trust are our top priorities.' },
            ].map((value, index) => (
              <div key={index} className="p-6 bg-[#013c6c] rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-[#fdc100]">{value.title}</h3>
                <p className="text-white">{value.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Meet the Team Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-4 text-[#013c6c]">Meet the Team</h2>
          <p className="text-lg leading-relaxed mb-8 text-gray-700">
            Our team consists of passionate UCSC students dedicated to making the rental process better for everyone.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'Matthew Chen'},
              { name: 'Lola Quiroga'},
              { name: 'Derrick Lee' },
              { name: 'George Austin'},
              { name: 'JiaCheng Liu'},
              { name: 'Nij Tandel'},
            ].map((member, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-lg"
              >
                <h3 className="text-xl font-semibold text-[#013c6c]">{member.name}</h3>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="text-center mb-16">
          <h2 className="text-3xl font-semibold mb-6 text-[#013c6c]">Ready to Find Your Perfect Home?</h2>
          <a
            href="/listings/default"
            className="inline-block bg-[#fdc100] text-white px-8 py-4 rounded-lg text-lg hover:bg-[#e5b800] transition"
          >
            Browse Listings
          </a>
        </section>
      </div>
    </div>
  );
}
