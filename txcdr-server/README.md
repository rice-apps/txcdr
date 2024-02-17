# TXCDR Backend

## Installation

Clone the entire repo

```bash
git clone https://github.com/rice-apps/txcdr.git
cd txcdr/txcdr-server
```

Install dependencies

```bash
npm install
```

Generate Prisma types

```bash
npx prisma generate
```

## Usage

### Environment variables

Make sure you have the following environment variables in `.env`:

- SUPERBASE_URL
- SUPERBASE_KEY
- DATABASE_URL

Ask a TL for these environment variables!

### Running the server

```bash
npm start
```
