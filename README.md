# Neev Rambhia — Portfolio v2

A high-performance, minimalist personal portfolio built to showcase engineering projects, open source contributions, and UI/UX design work. 

Designed and engineered with a focus on speed, typography, and graceful motion.

## 🚀 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animation**: [GSAP](https://gsap.com/) (Scroll-driven reveals) + [Framer Motion](https://www.framer.com/motion/) (Micro-interactions)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Typography**: Bricolage Grotesque (Headings) & Figtree (Body) via `next/font`
- **Forms**: [Web3Forms](https://web3forms.com/) (Client-side email forwarding)

## 📁 Project Structure

```text
├── app/                  # Next.js App Router (pages, layout, routing, SEO)
│   ├── (site)/           # Route group for main site pages
│   └── globals.css       # Global design tokens and tailwind configuration
├── components/           # React components
│   ├── layout/           # Shared structural components (Nav, Footer)
│   ├── sections/         # Major page sections (Hero, About, Projects)
│   └── ui/               # Reusable primitive components (Cards, Badges)
├── content/              # Raw data layer (projects, profile info)
├── lib/                  # Utilities (GSAP setup, cn, metadata, fonts)
└── public/               # Static assets (images, favicons)
```

## 🛠️ Local Development

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Environment Variables**
   Copy `.env.example` to `.env.local` and add your Web3Forms access key (required for the contact form to function).
   ```bash
   cp .env.example .env.local
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📈 Performance & SEO

This project is built to score 90+ on Lighthouse out-of-the-box.
- **Images**: Ensure all imagery added to `public/` is optimized (WebP/AVIF) and utilizes the `next/image` component to prevent Cumulative Layout Shift (CLS).
- **Accessibility**: All interactive elements are fully keyboard navigable with visible `:focus-visible` states globally enforced in `globals.css`. Contrast ratios meet WCAG AA standards.
- **SEO**: `robots.txt` and `sitemap.xml` are dynamically generated via `app/robots.ts` and `app/sitemap.ts`.

## 🌐 Deployment

Designed for seamless deployment on [Vercel](https://vercel.com).
Simply connect your GitHub repository and Vercel will automatically configure the build settings for Next.js.
