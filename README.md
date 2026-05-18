# MyQR - QR Code Generator

## About
MyQR is a modern web application built with Next.js and React that allows users to generate, customize, and download QR codes. With a beautiful UI powered by shadcn/ui and Tailwind CSS, MyQR provides an intuitive interface for creating QR codes for various use cases such as URLs, contact information, Wi-Fi networks, and more.

## Features
- Generate QR codes from text, URLs, contact info, etc.
- Customize QR code appearance (colors, logo, shape, gradient)
- Live preview as you customize
- Download QR codes as PNG or SVG
- Responsive design for mobile and desktop
- Built with TypeScript for type safety
- ESLint and Prettier configured for code quality

## Installation

Follow these steps to get a local copy up and running.

### Prerequisites
- Node.js (version 18 or higher recommended)
- npm or yarn or pnpm

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/my-qr.git
   cd my-qr
   ```

2. **Install dependencies**
   Using npm:
   ```bash
   npm install
   ```
   Using yarn:
   ```bash
   yarn install
   ```
   Using pnpm:
   ```bash
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Building for Production

To create an optimized production build:

```bash
npm run build
# or
yarn build
# or
pnpm build
```

Then start the production server:

```bash
npm run start
# or
yarn start
# or
pnpm start
```

## Linting

To run ESLint for code quality checks:

```bash
npm run lint
# or
yarn lint
# or
pnpm lint
```

## Cleaning

To remove the `.next` and `out` directories:

```bash
npm run clean
# or
yarn clean
# or
pnpm clean
```

## Technologies Used

- **Framework**: [Next.js](https://nextjs.org/) 15
- **Language**: TypeScript
- **UI Library**: [shadcn/ui](https://ui.shadcn.com/) with [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: [Motion](https://motion.dev/)
- **QR Code Generation**: [qr-code-styling](https://github.com/terrybu/qr-code-styling)
- **Form Handling**: React Hook Form with resolvers
- **Styling**: Tailwind CSS, class-variance-authority, clsx, tailwind-merge
- **Image Conversion**: html-to-image

## Project Structure

```
my-qr/
├─ src/
│  ├─ app/          # Next.js app router
│  ├─ components/   # Reusable components
│  ├─ lib/          # Utility functions and libraries
│  ├─ styles/       # Global styles
│  ├─ types/        # TypeScript type definitions
├─ public/          # Static assets
├─ scripts/         # Helper scripts
├─ .eslintrc.json   # ESLint configuration
├─ tailwind.config.js # Tailwind CSS configuration
├─ postcss.config.js # PostCSS configuration
└─ tsconfig.json    # TypeScript configuration
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Your Name - [@your_twitter](https://twitter.com/your_twitter) - email@example.com

Project Link: [https://github.com/your-username/my-qr](https://github.com/your-username/my-qr)