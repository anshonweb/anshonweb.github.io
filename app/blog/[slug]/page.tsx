import Link from "next/link";
import { getPost, getAllPosts } from "@/lib/posts";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  return { title: `${post.title} — ansh` };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);

  return (
    <div className="post-page">
      <div className="post-page-header">
        <Link href="/blog" className="back-link">← back</Link>
        <h1 className="post-page-title">{post.title}</h1>
        <span className="post-page-date">{post.date}</span>
      </div>

      <article
        className="post-body"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />

      <footer className="blog-footer">
        <span>© {new Date().getFullYear()}</span>
        <span>•</span>
        <span className="prompt">ansh@unreal:~#</span>
      </footer>
    </div>
  );
}
