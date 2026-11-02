import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";
import { pages } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map((page) => ({
    url: absoluteUrl(page.path),
    changeFrequency: "monthly",
    priority: page.priority,
  }));
}
