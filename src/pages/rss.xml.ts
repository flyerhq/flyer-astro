import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context: any) {
  const blog = await getCollection("blog");

  return rss({
    title: "Flyer Chat | Blog",
    description:
      "Open-source chat SDK for Flutter and React Native. Build fast, real-time apps and AI agents with a high-performance, customizable, cross-platform UI.",
    site: context.site,
    items: blog.map((post) => ({
      title: post.data.title,
      pubDate: post.data.publishDate,
      description: post.data.excerpt,
      // Compute RSS link from post `id`
      // This example assumes all posts are rendered as `/blog/[id]` routes
      link: `/blog/${post.id}/`,
    })),
    customData: `<language>en-us</language>`,
  });
}
