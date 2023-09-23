<a href="https://spirals.vercel.app">
  <img alt="Spirals – Generate beautiful AI spiral art with one click." src="/app/opengraph-image.png">
  <h1 align="center">Spirals</h1>
</a>

<p align="center">
  Generate beautiful AI spiral art with one click. Powered by Vercel and Replicate.
</p>

<p align="center">
  <a href="https://twitter.com/steventey">
    <img src="https://img.shields.io/twitter/follow/steventey?style=flat&label=steventey&logo=twitter&color=0bf&logoColor=fff" alt="Steven Tey Twitter follower count" />
  </a>
  <a href="https://github.com/steven-tey/spirals">
    <img src="https://img.shields.io/github/stars/steven-tey/spirals?label=steven-tey%2Fspirals" alt="Spirals repo star count" />
  </a>
</p>

<p align="center">
  <a href="#introduction"><strong>Introduction</strong></a> ·
  <a href="#tech-stack"><strong>Tech Stack</strong></a> ·
  <a href="#deploy-your-own"><strong>Deploy Your Own</strong></a> ·
  <a href="#author"><strong>Author</strong></a>
</p>
<br/>

## Introduction

Spirals is an AI app for you to generate beautiful spiral art with one click. Powered by Vercel and Replicate.

https://github.com/steven-tey/spirals/assets/28986134/9f0202d4-2a31-47a0-b43f-bdcd189743ef

## Tech Stack

- Next.js [App Router](https://nextjs.org/docs/app)
- Next.js [Server Actions](https://nextjs.org/docs/app/api-reference/functions/server-actions)
- [Bun](https://bun.sh/) for compilation
- [Vercel Blob](https://vercel.com/storage/blob) for image storage
- [Vercel KV](https://vercel.com/storage/kv) for redis
- [`promptmaker`](https://github.com/zeke/promptmaker) lib by @zeke for generating random prompts

## Deploy Your Own

You can deploy this template to Vercel with the button below:

[![Deploy with Vercel](https://vercel.com/button)](https://stey.me/spirals-deploy)

Note that you'll need to:

- Set up a [Replicate](https://replicate.com) account to get the `REPLICATE_API_TOKEN` env var.
- Set up [Vercel KV](https://vercel.com/docs/storage/vercel-kv/quickstart) to get the
- Set up [Vercel Blob](https://vercel.com/docs/storage/vercel-blob/quickstart)

## Author

- Steven Tey ([@steventey](https://twitter.com/steventey))
