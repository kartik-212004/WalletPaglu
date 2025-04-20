# Laxmi Crypto Wallet  ![bitcoin](/public/bitcoin.jpg)

> *"Where your crypto comes to party, but with bodyguards"* 💰🎉

 ### A secure, client-side clean AF cryptocurrency wallet for Ethereum and Solana blockchains that doesn't suck.

## Features That Actually Work

- **Multi-Blockchain Support**: Currently supports Ethereum, with Solana support coming soon (because one blockchain is never enough!)
- **Client-side Security**: All cryptographic operations happen in your browser (we don't peek, promise!)
- **Persistent Storage**: Uses both localStorage and cookies for reliable wallet storage (like having money under both your mattress AND in your sock drawer)
- **Recovery Phrases**: Generate and securely store wallet recovery phrases (write these down or tattoo them somewhere safe)
- **Wallet Management for Humans**:
  - Create new wallets faster than you can say "crypto winter"
  - Import existing wallets via private key (bring your bags over)
  - Backup wallets to JSON files (for the paranoid, which you should be)
  - Restore wallets from backup files (for when stuff hits the fan)
  - Securely delete wallets (digital Marie Kondo-ing)

## Tech Stack That Makes Developers Drool

- **Framework**: Next.js 14 with App Router (because we're fancy like that)
- **Styling**: Tailwind CSS with custom components (no bootstrap in sight, you're welcome)
- **Blockchain**: ethers.js for Ethereum operations (the cool kids' choice)
- **Animations**: Motion for smooth transitions (silky smooth like your best pickup lines)
- **Storage**: Cookies and localStorage for persistence (your wallet remembers you even when your ex doesn't)
- **UI Components**: Custom shadcn/ui components (prettier than most dating app profiles)
- **Package Manager**: pnpm for fast, disk-efficient package management (because ain't nobody got time for slow installs)

## Getting Started (Even Your Grandma Could Do It)

### Prerequisites (Stuff You Need)

- Node.js 18.0.0 or higher (the fresh stuff)
- pnpm (recommended because we're not savages)

### Installation (Don't Worry, It's Not IKEA-level Complicated)

1. Clone the repository (fancy talk for "copy this code")

```bash
git clone https://github.com/yourusername/walletpaglu.git
cd walletpaglu
```

2. Install dependencies (the digital equivalent of buying furniture)

```bash
npm install -g pnpm

pnpm install
```

3. Run the development server (where the magic happens)

```bash
pnpm dev
```

4. Build for production (when you're ready for the big leagues)

```bash
pnpm build
pnpm start
```

## Usage (The "How Not to Lose Your Money" Guide)

### Creating a New Wallet

1. On the home page, select a blockchain (Ethereum or Solana) - flip a coin if undecided
2. Leave the private key field empty and click "Generate Wallet" (like making a baby wallet)
3. Your new wallet will be created with a recovery phrase (treat this like your social security number but even more secret)
4. Securely store your recovery phrase - it's the only way to recover your wallet if you lose access (don't be that person)

### Importing an Existing Wallet

1. On the home page, select a blockchain (the blockchain where your money lives)
2. Enter your private key in the field and click "Generate Wallet" (careful with copy-paste, no one wants typos here)
3. Your wallet will be imported and ready to use (welcome back, your money missed you)

### Backup and Restore (For When Life Happens)

- **Backup**: On the wallet page, click "Backup Wallet" to download a JSON file containing your wallet information (like taking a photo of your house before the hurricane)
- **Restore**: On th