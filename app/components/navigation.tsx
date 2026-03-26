export default function Navigation() {
  const links = [
    { href: "/blog", text: "BLOG" },
    { href: "https://x.com/anshonweb", text: "TWITTER" },
    { href: "https://github.com/anshonweb", text: "GITHUB" },
    { href: "mailto:ansh.a.3112@gmail.com", text: "MAIL" },
  ];

  return (
    <nav className="home-nav">
      {links.map(({ href, text }) => (
        <a href={href} key={href} rel="noopener noreferrer" target="_blank">
          {text}
        </a>
      ))}
    </nav>
  );
}