import { NextResponse } from "next/server";

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const YOUTUBE_API_URL = "https://www.googleapis.com/youtube/v3";

interface VideoStats {
  videoId: string;
  title: string;
  thumbnail: string;
  channelId: string;
  channelTitle: string;
  publishedAt: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  channelStats: {
    subscriberCount: number;
    videoCount: number;
    averageViews: number;
  };
  metrics: {
    viewsRatio: number;
    engagementRate: number;
    daysAgo: number;
    isViral: boolean;
  };
}

async function getVideoDetails(videoId: string) {
  const response = await fetch(
    `${YOUTUBE_API_URL}/videos?part=statistics,snippet&id=${videoId}&key=${YOUTUBE_API_KEY}`
  );
  const data = await response.json();
  return data.items[0];
}

async function getChannelStats(channelId: string) {
  const response = await fetch(
    `${YOUTUBE_API_URL}/channels?part=statistics&id=${channelId}&key=${YOUTUBE_API_KEY}`
  );
  const data = await response.json();
  return data.items[0].statistics;
}

async function calculateMetrics(
  video: any,
  channelStats: any
): Promise<VideoStats> {
  const viewCount = parseInt(video.statistics.viewCount);
  const likeCount = parseInt(video.statistics.likeCount || "0");
  const commentCount = parseInt(video.statistics.commentCount || "0");
  const subscriberCount = parseInt(channelStats.subscriberCount);
  const videoCount = parseInt(channelStats.videoCount);
  const totalViews = parseInt(channelStats.viewCount);

  // Calculate average views per video for the channel
  const averageViews = Math.floor(totalViews / videoCount);

  // Calculate days since publication
  const publishDate = new Date(video.snippet.publishedAt);
  const now = new Date();
  const daysAgo = Math.floor(
    (now.getTime() - publishDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  // Calculate engagement rate (likes + comments) / views * 100
  const engagementRate = ((likeCount + commentCount) / viewCount) * 100;

  // Calculate views ratio compared to channel average
  const viewsRatio = viewCount / averageViews;

  // Determine if video is viral (more views than subscribers and 2x channel average)
  // AND published within the last 6 months (approximately 180 days)
  const isViral =
    viewCount > subscriberCount && viewsRatio > 2 && daysAgo <= 180;

  return {
    videoId: video.id,
    title: video.snippet.title,
    thumbnail: video.snippet.thumbnails.high.url,
    channelId: video.snippet.channelId,
    channelTitle: video.snippet.channelTitle,
    publishedAt: video.snippet.publishedAt,
    viewCount,
    likeCount,
    commentCount,
    channelStats: {
      subscriberCount,
      videoCount,
      averageViews,
    },
    metrics: {
      viewsRatio,
      engagementRate,
      daysAgo,
      isViral,
    },
  };
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q");

    if (!query) {
      return NextResponse.json(
        { error: "Search query is required" },
        { status: 400 }
      );
    }

    // Add publishedAfter parameter to search only videos from the last 6 months
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    const publishedAfter = sixMonthsAgo.toISOString();

    // Search for videos
    const searchResponse = await fetch(
      `${YOUTUBE_API_URL}/search?part=snippet&q=${query}&type=video&maxResults=10&publishedAfter=${publishedAfter}&key=${YOUTUBE_API_KEY}`
    );
    const searchData = await searchResponse.json();

    // Get detailed stats for each video and its channel
    const videoPromises = searchData.items.map(async (item: any) => {
      const video = await getVideoDetails(item.id.videoId);
      const channelStats = await getChannelStats(video.snippet.channelId);
      return calculateMetrics(video, channelStats);
    });

    const videos = await Promise.all(videoPromises);

    // Filter and sort videos by virality metrics
    const analyzedVideos = videos
      .filter((video) => video.metrics.isViral)
      .sort((a, b) => b.metrics.viewsRatio - a.metrics.viewsRatio);

    return NextResponse.json({ videos: analyzedVideos });
  } catch (error) {
    console.error("YouTube API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch YouTube data" },
      { status: 500 }
    );
  }
}
