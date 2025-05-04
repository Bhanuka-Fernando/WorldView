import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

export default function About() {
  return (
    <div style={{ backgroundColor: "rgba(245, 245, 245)" }}>
      <Navbar />
      <div className="p-6 md:p-12 max-w-7xl mx-auto mt-10">
        <div className="text-center space-y-8">
          <h2 className="text-4xl font-extrabold text-gray-800 mb-6 tracking-wide">
            🌍 About Explore Countries
          </h2>
          <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Welcome to <strong>Explore Countries</strong>—your go-to web app for discovering fascinating details about countries across the globe. 
            Whether you're a travel enthusiast, a geography lover, or simply curious about the world, our platform provides easy access to country details, regions, languages, and much more.
          </p>

          <div className="space-y-12">
            <div className="max-w-2xl mx-auto">
              <h3 className="text-3xl font-semibold text-gray-800 mb-4">🔍 Discover Countries by Region & Language</h3>
              <p className="text-lg text-gray-600">
                Explore countries from different continents like Africa, Asia, Europe, and the Americas. Our app lets you filter countries based on the region and the language they speak. Whether you’re looking to discover French-speaking countries in Europe or explore African nations, <strong>Explore Countries</strong> gives you the tools to find exactly what you're looking for!
              </p>
            </div>

            <div className="max-w-2xl mx-auto">
              <h3 className="text-3xl font-semibold text-gray-800 mb-4">🌐 Search for Your Favorite Countries</h3>
              <p className="text-lg text-gray-600">
                Searching for a specific country? Just type the name in the search bar, and we'll show you the results in a flash. Our app covers a vast database of countries and offers relevant and updated details so you can always find the latest information.
              </p>
            </div>

            <div className="max-w-2xl mx-auto">
              <h3 className="text-3xl font-semibold text-gray-800 mb-4">💬 Multilingual Support</h3>
              <p className="text-lg text-gray-600">
                <strong>Explore Countries</strong> understands the importance of language diversity. We’ve integrated multilingual support to help you explore countries where your language is spoken. Choose from a variety of languages and find countries with a similar cultural or linguistic heritage.
              </p>
            </div>

            <div className="max-w-2xl mx-auto">
              <h3 className="text-3xl font-semibold text-gray-800 mb-4">🛠 Built with Simplicity & Speed</h3>
              <p className="text-lg text-gray-600">
                We prioritize simplicity, ease of use, and speed. Our clean and intuitive interface allows you to easily search, filter, and explore countries without any hassle. Get country details fast, and enjoy a seamless experience on any device.
              </p>
            </div>

            <div className="max-w-2xl mx-auto">
              <h3 className="text-3xl font-semibold text-gray-800 mb-4">🎯 Our Mission</h3>
              <p className="text-lg text-gray-600">
                At <strong>Explore Countries</strong>, our mission is to make learning about the world both fun and educational. By offering easy-to-access country data, we hope to inspire curiosity, broaden your horizons, and encourage a deeper understanding of the global community.
              </p>
            </div>

            <div className="max-w-2xl mx-auto">
              <h3 className="text-3xl font-semibold text-gray-800 mb-4">💡 Stay Connected</h3>
              <p className="text-lg text-gray-600">
                Have feedback or want to suggest a new feature? We’d love to hear from you! Our team is constantly working to improve the app, and we appreciate any input. Feel free to contact us anytime.
              </p>
            </div>
          </div>

          <p className="text-lg text-gray-700">
            Thank you for visiting <strong>Explore Countries</strong>. Start discovering the world today!
          </p>
        </div>
      </div>
    </div>
  );
}
