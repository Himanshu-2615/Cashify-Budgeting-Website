"use client"
import { useUser } from '@clerk/nextjs';
import React from 'react';


function Hero() {
  const { isSignedIn } = useUser();

  return (
    <section className="bg-gray-50 flex items-center flex-col">
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl font-extrabold sm:text-5xl">
            Manage Your Expenses
            <strong className="font-bold text-primary sm:block"> Control Your Money </strong>
          </h1>

          <p className="mt-4 sm:text-xl/relaxed">
            Start creating budgets and tracking your expenses with ease.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              className="block w-full rounded-sm bg-violet-600 px-12 py-3 text-sm font-medium text-white shadow-sm hover:bg-violet-800 focus:ring-3 focus:outline-none sm:w-auto"
              href={isSignedIn ? "/dashboard" : "/sign-in"}
            >
              {isSignedIn ? "Go to Dashboard" : "Get Started"}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
