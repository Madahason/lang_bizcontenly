"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/hooks/useAuth";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/sign-in");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#17153B] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#9131E7]"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const stats = [
    { name: "Content Created", value: "24", icon: "📝" },
    { name: "Time Saved", value: "12hrs", icon: "⏰" },
    { name: "Audience Reach", value: "+48%", icon: "📈" },
    { name: "AI Credits", value: "850", icon: "✨" },
  ];

  const contentTypes = [
    {
      title: "Blog Creator",
      description:
        "Generate outlines, finalize sections, and add AI-created images that wow your readers",
      icon: "📝",
      action: "Create Blog",
      link: "/blog-creator",
      metrics: { published: 8, drafts: 3 },
    },
    {
      title: "Viral Video Hub",
      description:
        "Identify trending topics and generate fresh scripts for viral short-form or long-form content",
      icon: "🎥",
      action: "Create Video",
      link: "/viral-video-hub",
      metrics: { published: 5, drafts: 2 },
    },
    {
      title: "Reel Maker",
      description:
        "Design trending reels and social posts that drive engagement across platforms",
      icon: "📱",
      action: "Create Reel",
      link: "/reel-maker",
      metrics: { published: 15, drafts: 4 },
    },
    {
      title: "Trend Imager",
      description:
        "Generate stunning visuals that capture attention and boost engagement",
      icon: "🎨",
      action: "Create Image",
      link: "/trend-imager",
      metrics: { published: 12, drafts: 6 },
    },
  ];

  const recentContent = [
    {
      title: "10 Ways to Boost Your Content Strategy",
      type: "Blog Post",
      status: "Published",
      date: "2024-02-21",
      performance: "+156 views",
    },
    {
      title: "Behind the Scenes - Product Demo",
      type: "Video",
      status: "Draft",
      date: "2024-02-20",
      performance: "In review",
    },
    {
      title: "Social Media Growth Hacks 2024",
      type: "Social Post",
      status: "Published",
      date: "2024-02-19",
      performance: "+243 engagements",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user.email?.split("@")[0]}! 👋
          </h1>
          <p className="mt-2 text-gray-600">
            Ready to transform your reach and reclaim your time? Let's create
            some amazing content.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {stats.map((stat) => (
            <div
              key={stat.name}
              className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <span className="text-2xl mr-2">{stat.icon}</span>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    {stat.name}
                  </dt>
                </div>
                <dd className="mt-1 text-3xl font-semibold text-[#9131E7]">
                  {stat.value}
                </dd>
              </div>
            </div>
          ))}
        </div>

        {/* Content Creation Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {contentTypes.map((type) => (
            <div
              key={type.title}
              className="bg-white rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <span className="text-2xl mr-2">{type.icon}</span>
                  <h3 className="text-lg font-medium text-gray-900">
                    {type.title}
                  </h3>
                </div>
                <p className="text-sm text-gray-500 mb-4">{type.description}</p>
                <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                  <span>Published: {type.metrics.published}</span>
                  <span>Drafts: {type.metrics.drafts}</span>
                </div>
                <Link
                  href={type.link}
                  className="block w-full bg-[#9131E7] text-white px-4 py-2 rounded-md hover:bg-[#9131E7]/90 transition-colors text-center"
                >
                  {type.action}
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Content with Performance */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-900">
                Recent Content
              </h2>
              <Link
                href="/library"
                className="text-[#9131E7] hover:text-[#9131E7]/90 text-sm font-medium"
              >
                View All →
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Performance
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentContent.map((content, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {content.title}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {content.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            content.status === "Published"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {content.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {content.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {content.performance}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex space-x-2">
                          <button className="text-[#9131E7] hover:text-[#9131E7]/90">
                            Edit
                          </button>
                          <button className="text-[#9131E7] hover:text-[#9131E7]/90">
                            Share
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
