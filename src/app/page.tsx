"use client";

import { useState } from "react";
import Dashboard from "@/app/components/Dashboard";
import ContentWizard from "@/app/components/ContentWizard";
import BlogCreator from "@/app/components/BlogCreator";
import VideoCreator from "@/app/components/VideoCreator";
import ReelCreator from "@/app/components/ReelCreator";
import ImageCreator from "@/app/components/ImageCreator";
import ContentLibrary from "@/app/components/ContentLibrary";
import { ContentItem } from "@/lib/store/slices/contentSlice";
import Link from "next/link";

export default function Home() {
  const [showWizard, setShowWizard] = useState(false);
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(
    null
  );

  const handleContentSelect = (content: ContentItem) => {
    setSelectedContent(content);
  };

  const handleWizardComplete = () => {
    setShowWizard(false);
    setSelectedContent(null);
  };

  const handleWizardCancel = () => {
    setShowWizard(false);
    setSelectedContent(null);
  };

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-[#9131E7] py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
            Reclaim Your Time and{" "}
            <span className="text-white">Transform Your Reach</span> with
            <div className="mt-2">BizContently</div>
          </h1>
          <p className="text-white/80 text-xl mb-6 max-w-3xl mx-auto">
            All-in-one AI-powered content creation and distribution—so you can
            focus on what matters most: growing your business.
          </p>
          <p className="text-white/70 mb-8">
            Say goodbye to content overwhelm—hello to effortless growth.
          </p>
          <Link
            href="/sign-up"
            className="bg-white text-[#9131E7] px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/90 transition-colors"
          >
            Get started for free →
          </Link>
        </div>
      </section>

      {/* Why BizContently Section */}
      <section className="bg-[#17153B] py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4 text-white">
            Why BizContently?
          </h2>
          <p className="text-white/70 mb-12">
            Transform your content strategy with powerful AI-driven solutions
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white/10 p-8 rounded-2xl">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold mb-2 text-white">Problem</h3>
              <p className="text-white/70 mb-4">
                Wasted hours on manual keyword research and scattered tools.
              </p>
              <h3 className="font-semibold text-white mb-2">Solution</h3>
              <p className="text-white/70">
                Our AI-powered platform centralizes everything, giving you
                real-time keyword insights at the click of a button.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white/10 p-8 rounded-2xl">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold mb-2 text-white">Problem</h3>
              <p className="text-white/70 mb-4">
                Struggling to create engaging content that actually drives
                traffic.
              </p>
              <h3 className="font-semibold text-white mb-2">Solution</h3>
              <p className="text-white/70">
                Automatically generate high-quality blog posts, reels, and video
                scripts designed to rank and resonate.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white/10 p-8 rounded-2xl">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold mb-2 text-white">Problem</h3>
              <p className="text-white/70 mb-4">
                No time or energy left to manage multi-platform publishing.
              </p>
              <h3 className="font-semibold text-white mb-2">Solution</h3>
              <p className="text-white/70">
                Seamlessly publish across WordPress, Medium, YouTube, and more
                with just a few clicks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-[#433D8B] py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4 text-white">
            Everything You Need to Supercharge Your Content Strategy
          </h2>
          <p className="text-white/70 mb-12">
            Powerful features designed to help you create, manage, and
            distribute content effortlessly
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="p-6">
              <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">
                Effortless Blog Posts That Pass AI Detection
              </h3>
              <p className="text-white/70">
                Generate outlines, finalize sections, and automatically add
                AI-created images that wow your readers—without the dreaded
                'robotic' feel.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6">
              <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">
                Viral Video Insights at Your Fingertips
              </h3>
              <p className="text-white/70">
                Identify trending videos across platforms, extract key insights,
                and generate fresh scripts for short-form or long-form content.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6">
              <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">
                Publish Everywhere in One Click
              </h3>
              <p className="text-white/70">
                Push your content to WordPress, Medium, Instagram, and more—all
                from a single dashboard.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-6">
              <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">
                Stay Organized & In Control
              </h3>
              <p className="text-white/70">
                Easily manage all your generated content, media assets, and user
                preferences to keep your workflow smooth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-gradient-to-r from-[#9131E7] to-[#433D8B] py-20 px-4 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Transform Your Content Strategy?
          </h2>
          <p className="text-xl mb-8">
            Be among the first to access BizContently and experience
            streamlined, AI-powered content creation. Get notified when we
            launch!
          </p>
          <Link
            href="/sign-up"
            className="bg-white text-[#9131E7] px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
          >
            Get started for free →
          </Link>
          <p className="text-sm mt-4 text-purple-200">
            Limited spots available • No credit card required
          </p>
        </div>
      </section>
    </main>
  );
}
