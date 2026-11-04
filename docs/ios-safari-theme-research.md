# iOS Safari theme and status bar investigation

Investigated 4 November 2026. Documentation and source review only; no iPhone or iOS simulator test was performed. No implementation changes were made.

## Findings

- Safari 15 introduced `theme-color` support for the iOS status bar and overscroll area, including separate light/dark hints. That historical support does not guarantee the same behavior in Safari 26. [WebKit Safari 15 announcement](https://webkit.org/blog/11989/new-webkit-features-in-safari-15/)
- Safari 26 uses page rendering and viewport-edge elements for color extension. WebKit engineer Wenson Hsieh explains that fixed/sticky elements near obscured viewport edges can trigger this behavior. [WebKit bug 301756, comment 2](https://bugs.webkit.org/show_bug.cgi?id=301756#c2)
- Updating `theme-color` alone is insufficient evidence that Safari 26 changed its chrome. A Safari 26.2 report documents status-bar tint changing incorrectly after soft navigation and says setting `theme-color` has no effect; the tracker remained NEW when reviewed. This is a report about navigation, not proof that every theme toggle fails. [WebKit bug 305546](https://bugs.webkit.org/show_bug.cgi?id=305546)
- Current WebKit source's `LocalFrameView::fixedContainerEdges` inspects viewport-constrained containers. It handles backdrop filters separately from direct background colors and can retain sampled colors in some paths. This is the development branch, not a guarantee about a particular shipped Safari build. [WebKit source](https://github.com/WebKit/WebKit/blob/main/Source/WebCore/page/LocalFrameView.cpp)
- Apple's archived `apple-mobile-web-app-status-bar-style` documentation scopes that tag to full-screen web apps. It is not a normal Safari-tab fix. The archive predates Safari 26 and should not be treated as a complete description of modern installed web apps. [Apple meta-tag reference](https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariHTMLRef/Articles/MetaTags.html)

## Current portfolio

Code inspection confirms:

- `index.html` selects the saved theme or device preference before React loads and sets the root theme, CSS `color-scheme`, and `theme-color`.
- `src/hooks/use-theme.ts` updates those values on theme changes.
- `src/styles/base.css` updates both root and body backgrounds: light `#f6f0e4`, dark `#0c282d`.
- `src/components/SiteHeader/site-header.css` uses `position: sticky; top: 0`, a matching theme-dependent background at 95% opacity, and `backdrop-filter: blur(16px)`.

Inference: the portfolio already changes the page surfaces Safari can use, so it is better prepared than a site that only changes metadata. The translucent blurred header means an exact solid status-bar color match should not be promised. Source review alone cannot prove immediate repaint or clock/battery icon contrast for this site.

## Recommendation and verification

Keep the theme-dependent root/body/header backgrounds and `theme-color` for browsers that use it. Do not add an Apple standalone status-bar tag or artificial fixed layers just to address an unobserved normal-tab issue.

Verify on an actual iPhone with its iOS/Safari version recorded: light and dark device appearances; manual page toggles both ways; fresh load and scrolled page; expanded and collapsed toolbar; back navigation. Check the clock/battery contrast separately from the background tint. Test a Home Screen launch separately if that mode is intended.

The accurate claim is: the page updates its theme signals immediately; Safari decides how and when its own status bar and toolbar reflect them. Immediate matching of Safari chrome has not been verified.
