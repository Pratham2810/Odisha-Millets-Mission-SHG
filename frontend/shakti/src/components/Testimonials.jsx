import React from "react";
import Image from 'next/image'

const Testimonials = () => (
  <div className="container mx-auto py-24 px-6 md:px-48">
    <h2 className="text-3xl font-semibold text-center text-green-800 mb-12">
      What our Clients Say
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Testimonial 1 */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 flex flex-col items-center space-y-4">
        <div className="w-32 h-32 bg-gray-300 rounded-full mb-4" >
          <Image src="/SovHappy.jpeg" width={300} height={200} className="w-32 h-32 bg-gray-300 rounded-full mb-4" />
        </div>
        <p className="text-gray-700 text-center">
          Mission Shakti has been a game-changer for our womens self-help
          group. Before, selling our handloom sarees was a huge challenge. We
          relied on local fairs and middlemen, and never knew how much our
          products were truly worth.
        </p>
        <div className="flex items-center space-x-2">
          <svg
            className="w-6 h-6 text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
          <p className="text-gray-600 font-medium">Sovan Pattanaik</p>
        </div>
      </div>

      {/* Testimonial 2 */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 flex flex-col items-center space-y-4">
        <div className="w-32 h-32 bg-gray-300 rounded-full mb-4" >
          <Image src="/smilan.jpeg" width={300} height={200} className="w-32 h-32 bg-gray-300 rounded-full mb-4" />
        </div>
        <p className="text-gray-700 text-center">
          Our self-help group specializes in traditional tribal art and
          metalwork. These crafts are passed down through generations in our
          families, but reaching a wider audience was always difficult. The
          Mission Shakti website has given us a platform to share our unique art
          forms and connect with customers who appreciate handmade, authentic
          products.
        </p>
        <div className="flex items-center space-x-2">
          <svg
            className="w-6 h-6 text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
          <p className="text-gray-600 font-medium">M. K. Sahoo</p>
        </div>
      </div>

      {/* Testimonial 3 */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 flex flex-col items-center space-y-4">
        <div className="w-32 h-32 bg-gray-300 rounded-full mb-4" >
          <Image src="/PraDom.jpeg" width={300} height={200} className="w-32 h-32 bg-gray-300 rounded-full mb-4" />
        </div>

        <p className="text-gray-700 text-center">
          Since joining a Mission Shakti-affiliated farmers cooperative, Ive
          seen a dramatic improvement in my livelihood. The cooperative provides
          training on organic farming techniques, helps us source high-quality
          seeds and fertilizers, and now, through the e-commerce platform,
          connects us directly with consumers who are looking for healthy,
          locally-grown produce.
        </p>
        <div className="flex items-center space-x-2">
          <svg
            className="w-6 h-6 text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
          <p className="text-gray-600 font-medium">P. P. Mohanty</p>
        </div>
      </div>
    </div>

    {/* Embedded YouTube Video */}
    <div className="flex justify-center mt-16">
      <iframe
        width="800"
        height="515"
        src="https://www.youtube.com/embed/A7edMIZWNNA"
        title="YouTube video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  </div>
);

export default Testimonials;
