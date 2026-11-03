declare module 'node:fs' {
  export function statSync(path: string): { mtime: Date }
}
