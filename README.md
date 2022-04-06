<div align="center">
<img src="https://raw.githubusercontent.com/MCarlomagno/persssist/main/public/images/banner.png" alt="banner image"/>
</div>

# Persssist

[![Vercel](https://img.shields.io/github/deployments/mcarlomagno/persssist/production?label=vercel&logo=vercel&logoColor=white)](https://persssist.vercel.app/)
![Tests](https://github.com/MCarlomagno/persssist/actions/workflows/truffle.yml/badge.svg)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Storage web application running on top of Rinkeby testnet that uses IPFS protocol for storing files in an open and decentralized way.

## How it works

#### Architecture
This is a dApp or decentralized application with a simple frontend connected with a set of backend services composed by a Smart Contract deployed to Rinkeby testnet and a storage service using IPFS.

The **Smart Contract** role is to store basic information about the users and files stored in the app. 

>  **IPFS** is a P2P API for storing files in a decentralized way, where each client work as a node for persisting files.
> [Learn more](https://ipfs.io/)

![Alt text](./public/images/docs/diagram.svg)

#### Stack

- [Solidity](https://docs.soliditylang.org/en/v0.8.13/) for Smart Contract development on **Ethereum**.
- [Truffle Suite](https://trufflesuite.com/) for local infrastructure and SC deployment.
- [Ganache](https://trufflesuite.com/ganache/index.html) as a local development blockchain.
- [Metamask](https://metamask.io/) for in-browser user authentication.
- [React.js](https://reactjs.org/) (Next.js Framework).
- [Mocha/Chai](https://mochajs.org/) for Smart Contract testing
- [Tailwind CSS](https://tailwindcss.com/) for styling components.
- [Ant UI](https://ant.design/) framework for prebuilt UI components.
- [Github Actions](https://docs.github.com/en/actions) for CI and automated tests.
- [Vercel](https://vercel.com/) for CD and Frontend hosting.

#### Basic Process

1. The users connect their account to **Metamask** after pressing _Connect_ button (the app attempts to do this automatically if there is an existing account logged in in Metamask).
2. Once there is a connected account in the app, the app enables the button for start uploading files on the **Upload** section.
3. Once you uploaded your first file, you will be able to see the result in the **Files** section (Below the upload section). 

## Running locally

#### Configuring the app

First, configure `.env` file for blockchain configuration

```bash
INFURA_PROJECT_ID = <Your Infura Project ID>
PRIVATE_KEY = <Your Infura private key>
ACCOUNT_ADDRESS = <Your Account Address>
```

Then, configure `.env.local` file for frontend application.


```bash
NEXT_PUBLIC_MODE = <PROD | DEV (depending of your environment)>
NEXT_PUBLIC_CONTRACT = <Address of the smart contract>
```
#### Smart contract migration and deployment

In case you want to run locally for development, run a local blockchain using Ganache.

First, initialize truffle project on the repo.

```bash
truffle init
```

Then migrate smart contracts to ganache or any other network (see `truffle-config.js` for configuring networks).

In case you're running Ganache.

```bash
truffle migrate --network development
```

In case you prefer to debug against a deployed Smart Contract on rinkeby.

```bash
truffle migrate --network rinkeby
```

#### Running frontend application

Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
