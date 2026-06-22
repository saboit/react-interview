# Task Board

A small **React + TypeScript + Vite** app used for the live pairing segment of our
React interview. It is a deliberately tiny app, but it is structured the way our
real frontend is — **Feature-Sliced Design (FSD)**, Redux Toolkit, named exports,
`*.slice.ts` slices, typed `useAppSelector` hooks, and a public `index.ts` per slice.

> This repo is a **mimic** of how we structure code — it is not a real ticket from
> our backlog. Nothing you do here is shipped anywhere.

## What it does

A classic task list: add tasks, toggle them complete, delete them, filter by
status, inline-edit, and clear completed. Some of that already works — and some of
it is **broken or unfinished on purpose** (see "The tasks" below).

## Getting started

Requires **Node 20+** (Node 24 recommended).

```bash
git clone https://github.com/saboit/react-interview.git
cd react-interview
npm install
npm run dev        # start the app at http://localhost:5173
npm test           # run the test suite once
npm run test:watch # run the tests in watch mode
```

Other scripts:

```bash
npm run build      # type-check + production build
npm run lint       # eslint
npm run format     # prettier --check
```

## The tasks

The work is expressed as **failing tests**. Run `npm test` and you'll see a handful
of red tests — each one is a small, self-contained task, and making it green is the
goal. You can run a single one while you work on it:

```bash
npx vitest run src/features/task-stats   # by folder
npx vitest run -t 'left to do'           # by test name
```

We'll work through them together during the session, starting at whichever level
fits. **You don't need to finish all of them** — we care about how you read, reason
about, and validate the code far more than raw speed.

## Tools

**Use whatever you normally use** — Google, ChatGPT, Claude Code, Copilot, Cursor.
AI is not cheating here; it's how we work. We're interested in how you direct it,
read its output, and decide whether to trust it.

## Project structure (Feature-Sliced Design)

Code is organized into FSD layers. A layer may only import from layers below it
(`app → pages → widgets → features → entities → shared`), and every slice exposes
its public API through an `index.ts` barrel.

```
src/
├── app/                      # composition root: store, providers, entrypoint
│   ├── entrypoint/           # App + main.tsx (StrictMode, router, Redux provider)
│   ├── store/                # configureStore, RootState / AppDispatch types
│   ├── styles/               # global styles
│   └── testing/              # renderWithProviders, setup
├── pages/
│   └── home/                 # the one route
├── widgets/
│   └── task-board/           # composes the features into the board
├── features/                 # one user-facing capability per slice
│   ├── add-task/             #   ui/
│   ├── task-list/            #   ui/  (TaskList + TaskItem)
│   ├── task-stats/           #   ui/
│   ├── filter-tasks/         #   ui/
│   ├── clear-completed/      #   ui/
│   └── persist-tasks/        #   lib/ (a hook, no UI)
├── entities/
│   └── task/                 # the Task model + Redux slice + selectors
│       ├── model/            #   task.slice.ts, task.types.ts
│       └── index.ts          #   public API
└── shared/                   # generic, domain-agnostic building blocks
    ├── ui/                   #   Button, Checkbox, TextInput
    └── lib/redux/            #   useAppDispatch, useAppSelector
```

### Conventions worth matching

- **Named exports only** (no default exports).
- **One slice = one folder** with `ui` / `model` / `lib` segments and an `index.ts`.
- Import across slices through the alias **`@/<layer>/<slice>`**; import _within_ a
  slice with relative paths.
- Redux slices live in `model/*.slice.ts`; selectors are `select*` functions.
- Components are `PascalCase.tsx` with a co-located `.css` and `.test.tsx`.
- Prettier: no semicolons, single quotes, 2-space indent.
