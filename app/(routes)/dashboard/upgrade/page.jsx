import React from 'react';
import { ArrowRight, Star, Shield } from 'lucide-react';

function UpgradePremium() {
  return (
    <section className="bg-white py-16">
      <div className="max-w-screen-lg mx-auto text-center px-4">
        <h1 className="text-5xl font-bold text-gray-800 mb-6">
          Unlock Premium Features
          <strong className="block font-bold text-purple-600 text-5xl">Choose Your Plan</strong>
        </h1>
        <p className="text-lg text-gray-600 sm:text-xl mb-12">
          Select the plan that fits your needs and start managing your finances like a pro.
        </p>

        <div className="flex justify-center gap-8">
          <div className="w-full max-w-xs p-6 bg-gradient-to-r from-purple-100 via-purple-200 to-purple-300 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Basic Plan</h2>
            <p className="text-xl font-medium text-gray-700 mb-4">
              Perfect for individuals who want essential budgeting tools.
            </p>
            <div className="flex justify-center gap-2 items-center mb-4">
              <Star size={24} className="text-yellow-500" />
              <p className="text-lg font-semibold text-gray-800">$9.99/month</p>
            </div>
            <button
              className="flex items-center justify-center gap-2 mx-auto rounded-lg bg-purple-600 px-6 py-3 text-sm font-medium text-white shadow-lg hover:bg-purple-700 focus:ring-3 focus:outline-none sm:w-auto"
            >
              Upgrade to Basic
              <ArrowRight size={20} />
            </button>
          </div>

          <div className="w-full max-w-xs p-6 bg-gradient-to-r from-purple-100 via-purple-200 to-purple-300 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Premium Plan</h2>
            <p className="text-xl font-medium text-gray-700 mb-4">
              Get advanced tools and priority support for complete financial control.
            </p>
            <div className="flex justify-center gap-2 items-center mb-4">
              <Shield size={24} className="text-green-500" />
              <p className="text-lg font-semibold text-gray-800">$19.99/month</p>
            </div>
            <button
              className="flex items-center justify-center gap-2 mx-auto rounded-lg bg-purple-600 px-6 py-3 text-sm font-medium text-white shadow-lg hover:bg-purple-700 focus:ring-3 focus:outline-none sm:w-auto"
            >
              Upgrade to Premium
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default UpgradePremium;
