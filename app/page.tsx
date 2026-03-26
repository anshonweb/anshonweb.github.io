import Footer from "@/components/footer";
import MatrixConvolution from "./components/matrix-convolution";
import Navigation from "@/components/navigation";
import SpotifyNowPlaying from "@/components/spotify";
import ThemeToggle from "./components/theme-toggle";

export default function Home() {
  return (
    <main className="home">
      <ThemeToggle />
      <MatrixConvolution />
      <Navigation />
      <SpotifyNowPlaying />
      <Footer />
    </main>
  );
}
