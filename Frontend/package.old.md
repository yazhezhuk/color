{
  "name": "my-app",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "predeploy": "npm run build",
    "deploy": "npx gh-pages -d out -t"
  },
  "dependencies": {
    "@tanstack/react-query": "^5.74.4",
    "lodash": "^4.17.21",
    "lodash.debounce": "^4.0.8",
    "next": "15.3.1",
    "react": "^19.0.0",
    "react-colorful": "^5.6.1",
    "react-dom": "^19.0.0",
    "react-hook-form": "^7.56.0"
  },
  "devDependencies": {
    "@eslint/eslintrc": "^3",
    "@tailwindcss/postcss": "^4",
    "@types/lodash": "^4.17.16",
    "@types/lodash.debounce": "^4.0.9",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "15.3.1",
    "tailwindcss": "^4",
    "typescript": "^5"
  }
}
