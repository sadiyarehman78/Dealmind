# Pre-GitHub Checklist

## Safe to commit
- `app/`
- `components/`
- `hooks/`
- `lib/`
- `public/`
- `README.md`
- `.env.example`
- `package.json`
- `package-lock.json`
- `next.config.ts`
- `tsconfig.json`
- `eslint.config.mjs`
- `postcss.config.mjs`
- `next-env.d.ts`
- `AGENTS.md`
- `CLAUDE.md`

## Must never be committed
- `.env.local`
- `.env`
- `.env.*` other than `.env.example`
- `node_modules/`
- `.next/`
- `build/`
- `dist/`
- `coverage/`
- `*.log`
- `*.tsbuildinfo`
- `.DS_Store`

## Remaining issues
- `GEMINI_API_KEY` is present in local `.env.local`; keep it out of Git.
- Build and lint should be re-run after the final commit set.
- If you add new environment variables later, mirror them in `.env.example`.
