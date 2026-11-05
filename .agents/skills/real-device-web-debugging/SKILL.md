---
name: real-device-web-debugging
description: Diagnose browser UI failures with a user testing on a physical phone or tablet. Use when a web bug occurs on a real mobile device, especially when desktop emulation does not reproduce it or the user offers to test a local build.
---

# Real-device web debugging

Use the user's device as a feedback loop: reproduce the reported behavior, capture evidence that distinguishes possible causes, change one thing, and have the user verify the result. Coordinate with the user in short, specific steps and keep working on independent checks while waiting.

## Connect the device

1. Find the app's existing dev command and confirm which checkout and revision it serves. Preserve unrelated work and avoid modifying shared configuration just to expose the server.
2. Start a temporary dev server bound to a reachable LAN interface using the project's existing tooling. Find the computer's current LAN address and give the user the full URL, including port. The phone and computer generally need to be on the same network. Only expose the development app and data appropriate for that network; stop the server when finished.
3. If the phone cannot connect, verify the server is running, its bind address, address and port, network isolation, and firewall. An agent sandbox may allow the server to start while preventing LAN access; use an authorized execution environment when available. Do not weaken firewall or network protections without authorization. Offer a supported alternative if access remains blocked.

## Capture and reproduce

1. Ask the user to perform the smallest sequence that shows the symptom. A recording or screenshot establishes visible behavior; it does not by itself establish event order or root cause.
2. When event timing matters and remote inspection is unavailable, add **temporary, opt-in** diagnostics to the local build. Show a compact, scrollable on-page log or use an existing device inspector. Capture only events relevant to the hypothesis, their order, target, related target, and relevant UI state. For touch/focus issues consider pointer down/up/cancel, focus in/out, and click. Include an accessible way to read or capture the log without obscuring the control being tested.
3. Give exact instructions to reload, reproduce once, and share the relevant log or screenshot. Avoid collecting values, credentials, page content, or unrelated personal data. Treat device-reported evidence as the source for event ordering; emulation and synthetic events are approximations.
4. Turn the observed sequence into a fast, repeatable check at an appropriate public boundary. Include every ordering detail that affects behavior. If it passes before the fix or differs from the device symptom, refine it rather than claiming reproduction. When an unattended reproduction is impossible, use the user's device as the explicit manual loop and state that limitation.

## Fix and verify

1. State the leading explanation and alternatives supported by the evidence. Make a minimal change; verify it against the captured sequence and existing behavior, including keyboard, outside dismissal, cancellation, and reopening where relevant.
2. Ask the user to reload the updated local build and repeat the original scenario, plus the most relevant adjacent interactions. If it still fails, obtain a fresh trace and revise the reproduction before trying another fix. Do not claim real-device success until the user confirms it.
3. Remove only the temporary instrumentation and other artifacts created for diagnosis, stop the temporary server, and run the project's appropriate tests and checks. Report what was verified on the device and any remaining limitations.
