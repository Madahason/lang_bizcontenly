"use client";

import { useState } from "react";
import { useAppSelector, useAppDispatch } from "@/lib/store/store";
import { ContentItem } from "@/lib/store/slices/contentSlice";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<
    "blog" | "video" | "reel" | "image"
  >("blog");
  const { items, loading } = useAppSelector((state) => state.content);
  const dispatch = useAppDispatch();

  const tabs = [
    { id: "blog", label: "Blog Creator" },
    { id: "video", label: "Video Hub" },
    { id: "reel", label: "Reel Maker" },
    { id: "image", label: "Social Images" },
  ] as const;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Bizcontently</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {tabs.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`
                  py-4 px-1 border-b-2 font-medium text-sm
                  ${
                    activeTab === id
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }
                `}
              >
                {label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content Area */}
        <div className="mt-8">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {/* Create New Content Button */}
              <div className="flex justify-end">
                <button
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  onClick={() => {
                    // TODO: Implement new content creation
                  }}
                >
                  Create New{" "}
                  {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                </button>
              </div>

              {/* Content List */}
              <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200">
                  {items
                    .filter((item) => item.type === activeTab)
                    .map((item) => (
                      <li key={item.id}>
                        <div className="px-4 py-4 sm:px-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <p className="text-sm font-medium text-blue-600 truncate">
                                {item.title}
                              </p>
                              <p className="ml-2 flex-shrink-0 flex">
                                <span
                                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                                    ${
                                      item.status === "completed"
                                        ? "bg-green-100 text-green-800"
                                        : item.status === "processing"
                                        ? "bg-yellow-100 text-yellow-800"
                                        : item.status === "failed"
                                        ? "bg-red-100 text-red-800"
                                        : "bg-gray-100 text-gray-800"
                                    }
                                  `}
                                >
                                  {item.status}
                                </span>
                              </p>
                            </div>
                            <div className="ml-2 flex-shrink-0 flex">
                              <p className="text-sm text-gray-500">
                                {new Date(item.updatedAt).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
