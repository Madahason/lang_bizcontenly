"use client";

import Link from "next/link";
import { useState } from "react";

export default function PricingPage() {
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  const toggleFaq = (id: string) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="py-20 text-center">
        <h1 className="text-5xl font-bold mb-6">Simple, Transparent Pricing</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Choose the perfect plan for your content creation needs. Start with
          our free trial and scale as you grow.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Free Trial */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold mb-2">Free Trial</h2>
            <div className="flex items-baseline mb-4">
              <span className="text-4xl font-bold">Free</span>
              <span className="text-gray-500 ml-2">/7 days</span>
            </div>
            <p className="text-gray-600 mb-6">
              Experience the full potential of BizContently
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center">
                <svg
                  className="h-5 w-5 text-[#9131E7] mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Full access to all core features
              </li>
              <li className="flex items-center">
                <svg
                  className="h-5 w-5 text-[#9131E7] mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Limited content generation
              </li>
              <li className="flex items-center">
                <svg
                  className="h-5 w-5 text-[#9131E7] mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Basic AI models
              </li>
              <li className="flex items-center">
                <svg
                  className="h-5 w-5 text-[#9131E7] mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Standard support
              </li>
              <li className="flex items-center">
                <svg
                  className="h-5 w-5 text-[#9131E7] mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                1 user account
              </li>
            </ul>
            <Link
              href="/sign-up"
              className="block w-full bg-[#9131E7] text-white text-center py-3 rounded-full font-medium hover:bg-[#9131E7]/90 transition-colors"
            >
              Start Free Trial
            </Link>
          </div>

          {/* Basic Plan */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold mb-2">Basic</h2>
            <div className="flex items-baseline mb-4">
              <span className="text-4xl font-bold">$29</span>
              <span className="text-gray-500 ml-2">/per month</span>
            </div>
            <p className="text-gray-600 mb-6">
              Perfect for casual creators and beginners
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center">
                <svg
                  className="h-5 w-5 text-[#9131E7] mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                10 blog posts per month
              </li>
              <li className="flex items-center">
                <svg
                  className="h-5 w-5 text-[#9131E7] mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                20 social media posts
              </li>
              <li className="flex items-center">
                <svg
                  className="h-5 w-5 text-[#9131E7] mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Standard AI image generation
              </li>
              <li className="flex items-center">
                <svg
                  className="h-5 w-5 text-[#9131E7] mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Basic analytics
              </li>
              <li className="flex items-center">
                <svg
                  className="h-5 w-5 text-[#9131E7] mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Email support
              </li>
              <li className="flex items-center">
                <svg
                  className="h-5 w-5 text-[#9131E7] mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                1 user account
              </li>
            </ul>
            <Link
              href="/sign-up"
              className="block w-full bg-[#9131E7] text-white text-center py-3 rounded-full font-medium hover:bg-[#9131E7]/90 transition-colors"
            >
              Get Started
            </Link>
          </div>

          {/* Pro Plan */}
          <div className="bg-[#9131E7] text-white rounded-2xl p-8 shadow-lg relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#9131E7] text-white px-4 py-1 rounded-full text-sm">
              Most Popular
            </div>
            <h2 className="text-2xl font-bold mb-2">Pro</h2>
            <div className="flex items-baseline mb-4">
              <span className="text-4xl font-bold">$79</span>
              <span className="text-white/70 ml-2">/per month</span>
            </div>
            <p className="text-white/90 mb-6">
              Ideal for professional content creators
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center">
                <svg
                  className="h-5 w-5 text-white mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Unlimited blog posts
              </li>
              <li className="flex items-center">
                <svg
                  className="h-5 w-5 text-white mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Unlimited social media posts
              </li>
              <li className="flex items-center">
                <svg
                  className="h-5 w-5 text-white mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Priority access to new AI models
              </li>
              <li className="flex items-center">
                <svg
                  className="h-5 w-5 text-white mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Advanced analytics
              </li>
              <li className="flex items-center">
                <svg
                  className="h-5 w-5 text-white mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Priority support
              </li>
              <li className="flex items-center">
                <svg
                  className="h-5 w-5 text-white mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                3 user accounts
              </li>
              <li className="flex items-center">
                <svg
                  className="h-5 w-5 text-white mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                API access
              </li>
            </ul>
            <Link
              href="/sign-up"
              className="block w-full bg-white text-[#9131E7] text-center py-3 rounded-full font-medium hover:bg-gray-50 transition-colors"
            >
              Upgrade to Pro
            </Link>
          </div>

          {/* Enterprise Plan */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold mb-2">Enterprise</h2>
            <div className="flex items-baseline mb-4">
              <span className="text-4xl font-bold">Custom</span>
              <span className="text-gray-500 ml-2">/custom plan</span>
            </div>
            <p className="text-gray-600 mb-6">
              Tailored solutions for large teams
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center">
                <svg
                  className="h-5 w-5 text-[#9131E7] mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Custom content limits
              </li>
              <li className="flex items-center">
                <svg
                  className="h-5 w-5 text-[#9131E7] mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                White-labeling options
              </li>
              <li className="flex items-center">
                <svg
                  className="h-5 w-5 text-[#9131E7] mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Dedicated account manager
              </li>
              <li className="flex items-center">
                <svg
                  className="h-5 w-5 text-[#9131E7] mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Custom integrations
              </li>
              <li className="flex items-center">
                <svg
                  className="h-5 w-5 text-[#9131E7] mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                24/7 priority support
              </li>
              <li className="flex items-center">
                <svg
                  className="h-5 w-5 text-[#9131E7] mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Unlimited user accounts
              </li>
              <li className="flex items-center">
                <svg
                  className="h-5 w-5 text-[#9131E7] mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Full API access
              </li>
            </ul>
            <Link
              href="/contact-sales"
              className="block w-full bg-[#9131E7] text-white text-center py-3 rounded-full font-medium hover:bg-[#9131E7]/90 transition-colors"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <h2 className="text-3xl font-bold text-center mb-2">
          Frequently Asked Questions
        </h2>
        <p className="text-gray-600 text-center mb-12">
          Have questions? We're here to help.
        </p>

        <div className="space-y-4">
          {/* FAQ Items */}
          <div className="border border-gray-200 rounded-lg">
            <button
              className="w-full text-left px-6 py-4 focus:outline-none"
              onClick={() => toggleFaq("trial")}
            >
              <div className="flex justify-between items-center">
                <span className="font-medium">
                  What happens after my free trial ends?
                </span>
                <svg
                  className={`w-5 h-5 transform transition-transform ${
                    expandedFaq === "trial" ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </button>
            {expandedFaq === "trial" && (
              <div className="px-6 pb-4">
                <p className="text-gray-600">
                  After your free trial ends, you can choose to upgrade to any
                  of our paid plans to continue using BizContently. Your content
                  will be saved and accessible once you subscribe.
                </p>
              </div>
            )}
          </div>

          <div className="border border-gray-200 rounded-lg">
            <button
              className="w-full text-left px-6 py-4 focus:outline-none"
              onClick={() => toggleFaq("switch")}
            >
              <div className="flex justify-between items-center">
                <span className="font-medium">Can I switch between plans?</span>
                <svg
                  className={`w-5 h-5 transform transition-transform ${
                    expandedFaq === "switch" ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </button>
            {expandedFaq === "switch" && (
              <div className="px-6 pb-4">
                <p className="text-gray-600">
                  Yes, you can upgrade or downgrade your plan at any time.
                  Changes will be reflected in your next billing cycle.
                </p>
              </div>
            )}
          </div>

          <div className="border border-gray-200 rounded-lg">
            <button
              className="w-full text-left px-6 py-4 focus:outline-none"
              onClick={() => toggleFaq("payment")}
            >
              <div className="flex justify-between items-center">
                <span className="font-medium">
                  What payment methods do you accept?
                </span>
                <svg
                  className={`w-5 h-5 transform transition-transform ${
                    expandedFaq === "payment" ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </button>
            {expandedFaq === "payment" && (
              <div className="px-6 pb-4">
                <p className="text-gray-600">
                  We accept all major credit cards, PayPal, and bank transfers
                  for Enterprise plans.
                </p>
              </div>
            )}
          </div>

          <div className="border border-gray-200 rounded-lg">
            <button
              className="w-full text-left px-6 py-4 focus:outline-none"
              onClick={() => toggleFaq("contract")}
            >
              <div className="flex justify-between items-center">
                <span className="font-medium">
                  Is there a long-term contract?
                </span>
                <svg
                  className={`w-5 h-5 transform transition-transform ${
                    expandedFaq === "contract" ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </button>
            {expandedFaq === "contract" && (
              <div className="px-6 pb-4">
                <p className="text-gray-600">
                  No, all our plans are month-to-month with no long-term
                  commitment required. Enterprise plans can be customized with
                  annual billing options.
                </p>
              </div>
            )}
          </div>

          <div className="border border-gray-200 rounded-lg">
            <button
              className="w-full text-left px-6 py-4 focus:outline-none"
              onClick={() => toggleFaq("enterprise")}
            >
              <div className="flex justify-between items-center">
                <span className="font-medium">
                  What's included in the Enterprise plan?
                </span>
                <svg
                  className={`w-5 h-5 transform transition-transform ${
                    expandedFaq === "enterprise" ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </button>
            {expandedFaq === "enterprise" && (
              <div className="px-6 pb-4">
                <p className="text-gray-600">
                  Enterprise plans include custom content limits,
                  white-labeling, dedicated account management, custom
                  integrations, priority 24/7 support, and unlimited user
                  accounts.
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600">
            Still have questions?{" "}
            <Link
              href="/contact"
              className="text-[#9131E7] hover:text-[#9131E7]/90"
            >
              Contact our team
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
