# TXCDR Frontend

## Installation

Clone the entire repo

```bash
git clone https://github.com/rice-apps/txcdr.git
cd txcdr/txcdr-client
```

Install dependencies

```bash
npm install
```

Generate Apollo Code Generator files

```bash
npm run compile
```

## Usage

### Setup

Always compile to create the Apollo code-gen files after making new changes:

```bash
npm run compile
```

### Environment variables

Make sure you have the following environment variables in `.env`:

- EXPO_PUBLIC_MAPS_KEY (your Google Maps API key)

Ask a TL for these environment variables or generate the keys yourself (if you can)!

### Running the app

```bash
npx expo start
```

Make sure to test the app on both your phone and an emulator of a different OS.
