import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "blog-ansh",
};

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <div className="blog-container">
      <header className="blog-header">
        <Link href="/" className="site-title">~/blog</Link>
        <nav>
          <Link href="/">HOME</Link>
          <a href="https://x.com/anshonweb" target="_blank" rel="noopener noreferrer">
            TWITTER
          </a>
          <a href="https://github.com/anshonweb" target="_blank" rel="noopener noreferrer">
            GITHUB
          </a>
        </nav>
      </header>

      <main>
        <div className="post-list">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="post-item">
              <span className="post-date">{post.date}</span>
              <span className="post-title">{post.title}</span>
            </Link>
          ))}
        </div>
      </main>

      <footer className="blog-footer">
        <span>© {new Date().getFullYear()}</span>
        <span>•</span>
        <span className="prompt">ansh@unreal:~#</span>
      </footer>
    </div>
  );
}
