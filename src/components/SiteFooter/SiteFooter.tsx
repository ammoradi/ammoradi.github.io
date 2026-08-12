import { Heart } from "lucide-react";

export function SiteFooter() {
  return (
    <footer>
      <p>© {new Date().getFullYear()} Amir Mohammad Moradi</p>
      <p className="footer-made" aria-label="Made with love by Codex">
        Made with <Heart aria-hidden="true" /> by Codex
      </p>
      <a href="#top">Back to top ↑</a>
    </footer>
  );
}
