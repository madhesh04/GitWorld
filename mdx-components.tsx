import type { MDXComponents } from 'mdx/types'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="font-pixel text-amber text-lg mb-6 leading-relaxed">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="font-pixel text-amber-dark text-sm mb-4 mt-8 leading-relaxed">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-pixel text-forest-light text-xs mb-3 mt-6 leading-relaxed">
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p className="font-body text-slate-200 leading-7 mb-4">{children}</p>
    ),
    code: ({ children }) => (
      <code className="font-mono text-pixel-green bg-navy-light px-1.5 py-0.5 rounded text-sm">
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className="font-mono bg-navy-light border border-forest p-4 rounded mb-4 overflow-x-auto text-sm text-pixel-green leading-6">
        {children}
      </pre>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-amber pl-4 my-4 text-slate-300 italic">
        {children}
      </blockquote>
    ),
    strong: ({ children }) => (
      <strong className="text-amber font-bold">{children}</strong>
    ),
    ul: ({ children }) => (
      <ul className="font-body text-slate-200 list-disc list-inside mb-4 space-y-1">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="font-body text-slate-200 list-decimal list-inside mb-4 space-y-1">
        {children}
      </ol>
    ),
    ...components,
  }
}
