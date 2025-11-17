# routed-anecdotes

## Prerequisites
- **Node.js 18+** (LTS recommended)
- **npm** (included with Node.js)

---

## Development

Install dependencies:

```bash
npm install
```

Start the development server:

```
npm run dev
```

The application will be available at:
```
http://localhost:5173
```

## Production

Build the production bundle:

```
npm run build
```

Preview the production build locally:

```
npm run preview
```

Use npm package called serve to serve the project in port 5173:

```
install: npm install -g serve
```
```
serve: serve -s -l 5173 dist
```

