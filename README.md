# Blog with Next.js and MongoDB

A full-stack blog app that allows adding, editing, deleting, and viewing posts with pagination and slug-based detail pages.

## Tech stack

- [Next.js 16](https://nextjs.org/)
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [MongoDB](https://www.mongodb.com/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [Lucide React](https://lucide.dev/)

## Project Structure

```
app/
├── page.tsx
├── layout.tsx
├── globals.css
├── posts/
│   └── [slug]/
│       └── page.tsx
└── api/
    └── posts/
        ├── route.ts
        └── [id]/
            └── route.ts
components/
├── BlogPage.tsx
├── BlogPagination.tsx
├── PostForm.tsx
└── PostList.tsx
lib/
├── mongodb.ts
└── posts.ts
types/
└── post.ts
```

## Getting Started

Create a `.env` file in the project root:

```bash
MONGODB_URI=YOUR_MONGODB_URI
```

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

## License

MIT
