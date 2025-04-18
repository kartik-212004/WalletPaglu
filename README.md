# Laxmi Crypto Wallet

A secure, client-side cryptocurrency wallet for Ethereum and Solana blockchains.

![Laxmi Crypto Wallet](https://via.placeholder.com/600x300/1a1a2e/ffffff?text=Laxmi+Crypto+Wallet)

## Features

- **Multi-Blockchain Support**: Currently supports Ethereum, with Solana support coming soon
- **Client-side Security**: All cryptographic operations happen in your browser
- **Persistent Storage**: Uses both localStorage and cookies for reliable wallet storage
- **Recovery Phrases**: Generate and securely store wallet recovery phrases
- **Wallet Management**:
  - Create new wallets
  - Import existing wallets via private key
  - Backup wallets to JSON files
  - Restore wallets from backup files
  - Securely delete wallets

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with custom components
- **Blockchain**: ethers.js for Ethereum operations
- **Animations**: Motion for smooth transitions
- **Storage**: Cookies and localStorage for persistence
- **UI Components**: Custom shadcn/ui components
- **Package Manager**: pnpm for fast, disk-efficient package management

## Getting Started

### Prerequisites

- Node.js 18.0.0 or higher
- pnpm (recommended)

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/walletpaglu.git
cd walletpaglu
```

2. Install dependencies
```bash
npm install -g pnpm

pnpm install
```

3. Run the development server
```bash
pnpm dev
```

4. Build for production
```bash
pnpm build
pnpm start
```


## Usage

### Creating a New Wallet

1. On the home page, select a blockchain (Ethereum or Solana)
2. Leave the private key field empty and click "Generate Wallet"
3. Your new wallet will be created with a recovery phrase
4. Securely store your recovery phrase - it's the only way to recover your wallet if you lose access

### Importing an Existing Wallet

1. On the home page, select a blockchain
2. Enter your private key in the field and click "Generate Wallet"
3. Your wallet will be imported and ready to use

### Backup and Restore

- **Backup**: On the wallet page, click "Backup Wallet" to download a JSON file containing your wallet information
- **Restore**: On the wallet creation page, click "Import Wallet Backup" and select your backup file

### Security Features

- Private keys are never sent to any server
- Recovery phrases are shown only once for newly created wallets
- Option to hide/show private key when needed
- Confirmation dialog before wallet deletion

## Security Notice

This wallet is designed for educational purposes. While we've implemented various security measures, please consider the following:

- Use at your own risk for significant cryptocurrency holdings
- Always backup your private keys and recovery phrases
- Be cautious when entering your private key on any website
- For maximum security, consider hardware wallets for large amounts



## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 