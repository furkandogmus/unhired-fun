# Unhired.fun

A free and anonymous job-search misery leaderboard.

Turn ghosting, automatic rejections, and seven-stage interviews into the
score they deserve.

**Live:** [unhired-fun.netlify.app](https://unhired-fun.netlify.app)

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Implemented

- responsive landing page;
- five-step scoring quiz;
- deterministic score, league, title, and badge;
- shareable result URLs;
- dynamic Open Graph and X/Twitter cards;
- native sharing, X, LinkedIn, and copy-link actions;
- preseason leaderboard with locally saved results;
- public scoring methodology.

The global leaderboard currently uses sample entries plus browser-local
results. A production deployment needs an anonymous database and abuse
controls before accepting public scores.

## Contributing

Issues and pull requests are welcome. Read [CONTRIBUTING.md](./CONTRIBUTING.md)
before jumping in.

> If your PR gets rejected, congratulations: you have unlocked the authentic
> Unhired.fun contributor experience.

## Project notes

- [Scoring system](./docs/UNHIRED-SCORING.md)
- [MVP notes](./docs/UNHIRED-MVP.md)

## License

[MIT](./LICENSE)
