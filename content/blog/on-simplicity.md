---
title: On Simplicity
date: October 2024
excerpt: Simple doesn't mean easy. It means essential.
tags: [Design, Philosophy]
readTime: 3 min read
---

# On Simplicity

Simple doesn't mean easy. It means essential.

When I redesigned this site, I removed almost everything. The previous version had animations, parallax effects, custom cursors—all the bells and whistles.

This version has none of that. Just content, typography, and intentional white space.

## Less is Hard

It's easy to add. It's hard to subtract.

Every additional element dilutes your message. Every animation competes for attention. Every color choice adds complexity.

Simplicity is about knowing what to leave out.

## What Remains

When you strip away the unnecessary, what's left has to be good. Really good.

- Typography becomes critical
- Spacing matters
- Every word counts

There's nowhere to hide in a simple design. That's the point.

## Simplicity in Code

The same applies to code. The best solutions are often the simplest ones.

```typescript
// Complicated
const result = data
  .filter(x => x.active)
  .map(x => ({ ...x, formatted: true }))
  .reduce((acc, x) => [...acc, x], []);

// Simple
const result = data
  .filter(x => x.active)
  .map(x => ({ ...x, formatted: true }));
```

Simple doesn't mean dumbed down. It means distilled to the essence.
