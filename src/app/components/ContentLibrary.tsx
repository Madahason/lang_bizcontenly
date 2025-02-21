"use client";

import { useState, useMemo } from "react";
import { useAppSelector } from "@/lib/store/store";
import { ContentItem } from "@/lib/store/slices/contentSlice";

interface ContentLibraryProps {
  onSelectItem: (item: ContentItem) => void;
}

const ContentLibrary: React.FC<ContentLibraryProps> = ({ onSelectItem }) => {
  const { items } = useAppSelector((state) => state.content);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<
    "all" | "blog" | "video" | "reel" | "image"
  >("all");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "draft" | "processing" | "completed" | "failed"
  >("all");
  const [sortBy, setSortBy] = useState<"date" | "title" | "type">("date");

  const filteredItems = useMemo(() => {
    return items
      .filter((item: ContentItem) => {
        const matchesSearch = item.title
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        const matchesType = typeFilter === "all" || item.type === typeFilter;
        const matchesStatus =
          statusFilter === "all" || item.status === statusFilter;
        return matchesSearch && matchesType && matchesStatus;
      })
      .sort((a: ContentItem, b: ContentItem) => {
        switch (sortBy) {
          case "date":
            return (
              new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
            );
          case "title":
            return a.title.localeCompare(b.title);
          case "type":
            return a.type.localeCompare(b.type);
          default:
            return 0;
        }
      });
  }, [items, searchTerm, typeFilter, statusFilter, sortBy]);

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
          {/* Search */}
          <div>
            <label
              htmlFor="search"
              className="block text-sm font-medium text-gray-700"
            >
              Search
            </label>
            <input
              type="text"
              name="search"
              id="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Search content..."
            />
          </div>

          {/* Type Filter */}
          <div>
            <label
              htmlFor="type"
              className="block text-sm font-medium text-gray-700"
            >
              Content Type
            </label>
            <select
              id="type"
              name="type"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as any)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              <option value="all">All Types</option>
              <option value="blog">Blog Posts</option>
              <option value="video">Videos</option>
              <option value="reel">Reels</option>
              <option value="image">Images</option>
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700"
            >
              Status
            </label>
            <select
              id="status"
              name="status"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              <option value="all">All Status</option>
              <option value="draft">Draft</option>
              <option value="processing">Processing</option>
              <option value="completed">Completed</option>
              <option value="failed">Failed</option>
            </select>
          </div>

          {/* Sort By */}
          <div>
            <label
              htmlFor="sort"
              className="block text-sm font-medium text-gray-700"
            >
              Sort By
            </label>
            <select
              id="sort"
              name="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              <option value="date">Date Updated</option>
              <option value="title">Title</option>
              <option value="type">Content Type</option>
            </select>
          </div>
        </div>
      </div>

      {/* Content List */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {filteredItems.map((item: ContentItem) => (
            <li key={item.id}>
              <button
                onClick={() => onSelectItem(item)}
                className="w-full text-left hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out"
              >
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        {/* Content Type Icon */}
                        <span
                          className={`
                          inline-flex items-center justify-center h-8 w-8 rounded-full
                          ${
                            item.type === "blog"
                              ? "bg-purple-100 text-purple-500"
                              : item.type === "video"
                              ? "bg-blue-100 text-blue-500"
                              : item.type === "reel"
                              ? "bg-pink-100 text-pink-500"
                              : "bg-green-100 text-green-500"
                          }
                        `}
                        >
                          {item.type === "blog"
                            ? "📝"
                            : item.type === "video"
                            ? "🎥"
                            : item.type === "reel"
                            ? "📱"
                            : "🖼️"}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-blue-600 truncate">
                          {item.title}
                        </p>
                        <p className="mt-1 text-xs text-gray-500">
                          Created{" "}
                          {new Date(item.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span
                        className={`
                          px-2 inline-flex text-xs leading-5 font-semibold rounded-full
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
                      <span className="text-gray-400">
                        <svg
                          className="h-5 w-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ContentLibrary;
