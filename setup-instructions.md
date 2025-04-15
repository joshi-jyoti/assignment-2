# Setup Instructions for Electronic Gadget Landing Page

## Prerequisites
- Node.js (v18.0.0 or higher)
- npm (v8.0.0 or higher) or yarn (v1.22.0 or higher)
- Git

## Step 1: Clone the Repository
\`\`\`bash
git clone https://github.com/yourusername/gadget-landing-page.git
cd gadget-landing-page
\`\`\`

## Step 2: Install Dependencies
\`\`\`bash
npm install
# or
yarn install
\`\`\`

### Key Dependencies
- **next**: The Next.js framework
- **react** and **react-dom**: React library
- **tailwindcss**: Utility-first CSS framework
- **lucide-react**: Icon library
- **class-variance-authority**: For creating component variants
- **clsx**: Utility for constructing className strings
- **tailwind-merge**: For merging Tailwind CSS classes

## Step 3: Run the Development Server
\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

The application will be available at [http://localhost:3000](http://localhost:3000).

## File Structure
\`\`\`
gadget-landing-page/
├── app/                    # Next.js App Router
│   ├── cart/               # Cart page
│   ├── checkout/           # Checkout page
│   ├── login/              # Login page
│   ├── products/           # Products listing page
│   │   └── [id]/           # Dynamic product detail page
│   ├── profile/            # User profile page
│   ├── settings/           # User settings page
│   ├── signup/             # Signup page
│   ├── globals.css         # Global styles
│   ├── layout.js           # Root layout
│   └── page.js             # Homepage
├── components/             # Reusable components
│   ├── ui/                 # UI components (shadcn/ui)
│   │   ├── toast.jsx       # Toast component
│   │   ├── toaster.jsx     # Toaster component
│   │   └── use-toast.js    # Toast hook
│   ├── contact.js          # Contact section
│   ├── cta.js              # Call to action section
│   ├── faq.js              # FAQ section
│   ├── features.js         # Features section
│   ├── footer.js           # Footer component
│   ├── hero.js             # Hero section
│   ├── navbar.js           # Navigation bar
│   ├── newsletter.js       # Newsletter section
│   ├── shipping.js         # Shipping info section
│   └── testimonials.js     # Testimonials section
├── lib/                    # Utility functions
│   └── utils.js            # Helper functions
├── public/                 # Static assets
├── .eslintrc.json          # ESLint configuration
├── .gitignore              # Git ignore file
├── next.config.mjs         # Next.js configuration
├── package.json            # Project dependencies
├── postcss.config.js       # PostCSS configuration
├── tailwind.config.js      # Tailwind CSS configuration
└── tsconfig.json           # TypeScript configuration
\`\`\`

## VS Code Setup
For the best development experience, install these VS Code extensions:
- ESLint
- Prettier
- Tailwind CSS IntelliSense
- JavaScript and TypeScript Nightly

## Recommended VS Code Settings
Create a `.vscode/settings.json` file with:
\`\`\`json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "tailwindCSS.includeLanguages": {
    "javascript": "javascript",
    "html": "HTML"
  },
  "tailwindCSS.experimental.classRegex": [
    ["cva\$$([^)]*)\$$", "[\"'`]([^\"'`]*).*?[\"'`]"],
    ["cn\$$([^)]*)\$$", "[\"'`]([^\"'`]*).*?[\"'`]"]
  ]
}
\`\`\`

## Environment Variables
Create a `.env.local` file with:
\`\`\`
NEXT_PUBLIC_SITE_URL=http://localhost:3000
\`\`\`

## Deployment
This project is ready to be deployed on Vercel:
\`\`\`bash
npm install -g vercel
vercel
\`\`\`

## Additional Commands
- **Lint**: `npm run lint`
- **Build**: `npm run build`
- **Start Production Server**: `npm start`
