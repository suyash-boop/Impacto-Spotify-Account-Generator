# Impacto - Spotify Account Automation Tool

[![Version](https://img.shields.io/badge/version-0.1.0-blue.svg)](https://github.com/your-username/impacto)
[![Node.js](https://img.shields.io/badge/node.js-20.18.0-green.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/typescript-5.0-blue.svg)](https://www.typescriptlang.org/)

**Impacto** is a powerful automation tool designed for Spotify account management. It provides functionality to generate multiple Spotify accounts and automate following actions using those accounts.

## ✨ Features

- 🤖 **Account Generation**: Automatically create multiple Spotify accounts
- 👥 **Account Following**: Use generated accounts to follow Spotify profiles
- 📧 **Email Integration**: Built-in email verification using Mail.tm API
- 🎨 **Beautiful CLI**: Interactive command-line interface with colorful banners
- 🔐 **Secure Storage**: Local storage of account credentials
- 🚀 **Browser Automation**: Powered by Puppeteer for web interactions

## 🚀 Quick Start

### Prerequisites

- Node.js 20.18.0 or higher
- pnpm package manager
- Windows environment (currently optimized for Windows)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/impacto.git
cd impacto
```

2. Install dependencies:
```bash
pnpm install
```

3. Start the application:
```bash
pnpm dev
```

## 📖 Usage

### Running the Application

```bash
pnpm dev
```

The application will present you with an interactive menu:

1. **Generate Spotify Accounts** - Create new Spotify accounts automatically
2. **Account Follower** - Use existing accounts to follow a Spotify profile

### Account Generation

- Specify the number of accounts to generate
- The tool will automatically:
  - Create temporary email addresses
  - Generate random names and passwords
  - Complete Spotify signup process
  - Verify email addresses
  - Save credentials locally

### Account Following

- Provide a Spotify profile URL
- The tool will:
  - Load all saved accounts from `spotify.txt`
  - Log in to each account
  - Follow the specified profile
  - Handle OTP verification automatically

## 📁 Project Structure

```
src/
├── cli/
│   ├── application/
│   │   ├── setup.ts           # Interactive CLI setup
│   │   └── actions/
│   │       └── account/
│   │           ├── generator.ts    # Account generation logic
│   │           └── follower.ts     # Account following logic
│   └── core/
│       └── init.ts            # Application initialization
├── constants/
│   └── index.ts               # App constants and ASCII art
├── data/
│   ├── firstNames.txt         # Random name database
│   └── accounts/
│       └── spotify.txt        # Generated account storage
├── services/
│   ├── email.ts               # Email service integration
│   └── getOTP.ts              # OTP retrieval service
├── ui/
│   └── banner.ts              # CLI banner and styling
├── utils/
│   └── functions/
│       ├── name.ts            # Name generation utility
│       ├── password.ts        # Password generation utility
│       ├── saveAccount.ts     # Account saving utility
│       └── totalLines.ts      # File line counting utility
└── index.ts                   # Main entry point
```

## 🔧 Configuration

### Email Service

The application uses Mail.tm for temporary email addresses. No additional configuration required.

### Account Storage

Generated accounts are stored locally in:
```
src/data/accounts/spotify.txt
```

Format: `email:password:emailPassword`

## 🛠️ Development

### Available Scripts

- `pnpm dev` - Start development server with hot reload
- `pnpm build` - Build the project for production
- `pnpm start` - Run the built application

### Adding New Features

1. Create new action files in `src/cli/application/actions/`
2. Update the setup menu in `src/cli/application/setup.ts`
3. Add necessary utilities in `src/utils/functions/`

## 📋 Dependencies

### Main Dependencies
- **puppeteer** - Browser automation
- **@cemalgnlts/mailjs** - Mail.tm API client
- **@clack/prompts** - Interactive CLI prompts
- **chalk** - Terminal styling
- **jiti** - TypeScript execution

### Development Dependencies
- **typescript** - Type checking
- **@types/node** - Node.js type definitions

## ⚠️ Important Notes

- This tool is for educational and testing purposes only
- Ensure compliance with Spotify's Terms of Service
- Use responsibly and respect rate limits
- Accounts generated are temporary and may be subject to platform policies

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🐛 Troubleshooting

### Common Issues

1. **Browser not launching**: Ensure Chrome/Chromium is installed
2. **Email verification failing**: Check internet connection and Mail.tm service status
3. **Account generation stuck**: Verify Spotify selectors are up to date

### Support

For support and questions, visit: [https://zyphra.xyz/support](https://zyphra.xyz/support)

## 🔮 Roadmap

- [ ] Cross-platform support (macOS, Linux)
- [ ] Multiple email service providers
- [ ] Account validation and cleanup
- [ ] Proxy support for enhanced privacy
- [ ] GUI interface option
- [ ] Batch operations optimization

---

**Made with ❤️ by the Impacto Team**