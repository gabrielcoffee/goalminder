# Goalminder

<img width="660" alt="Goalminder logo" src="https://github.com/user-attachments/assets/0d000fc4-47e4-4a3c-a7f4-a0d2bfdba227" />

**My first product: a web app that keeps your goals in front of you.** You set a goal, pick an area and a reminder frequency, and report progress each time you check in. Built October to December 2024, before I had used React or Firebase.

**Status:** offline. The site ran at goalminderapp.online until mid-2025. The code still runs locally against your own Firebase project (see below).

## What it does

- **Goals by area.** Finance, fitness, hobbies, professional and more, each with a name, description, motivation, target date and reminder frequency.
- **Progress reports.** Every check-in records how it went and how you felt about it.
- **Charts.** Each goal's reports are plotted over time with Recharts.
- **Demo goals.** Three sample goals you can browse without an account.

The scheduled reminder emails were designed as the core of the product but never shipped. The frequency and time-of-day settings are stored and nothing reads them yet.

## Stack

| | |
|---|---|
| App | Next.js 14 (App Router), React 18, JavaScript |
| Styling | Tailwind CSS, Lucide icons |
| Data | Firebase Auth and Firestore (`users/{uid}/goals/{goalId}/reports`) |
| Charts | Recharts |
| Design | Figma |

## Run locally

Create a Firebase project with Email/Password authentication and Firestore, then copy its web config into `.env.local` (see `.env.example`):

```bash
npm install
npm run dev     # http://localhost:3000
```

## What I learned

This was my first time with React, Next.js, Firebase and Tailwind, and the first time I designed screens in Figma before writing code. Most of the time went into debugging things that broke in small ways. The main lesson was that shipping a product is mostly the unglamorous part: forms, auth states, loading states and edge cases.

## Screens

**Home**

<img width="800" alt="Goalminder home page" src="https://github.com/user-attachments/assets/449277dc-25c3-428b-b133-1c7e741f06ab" />

**Your goals**

<img width="800" alt="Goals list" src="https://github.com/user-attachments/assets/c795697e-a945-4847-baa2-8fa2439628aa" />

**A goal and its progress**

<img width="800" alt="Goal information" src="https://github.com/user-attachments/assets/3cebd104-e120-4f4a-828d-5c3ebea351db" />
<img width="800" alt="Goal progress chart" src="https://github.com/user-attachments/assets/a9e60d5f-d577-4642-b7cf-feb1b4d2f323" />

## License

MIT.
