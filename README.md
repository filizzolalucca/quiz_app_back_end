# Sustainability Quiz: Back End

REST API for a sustainability quiz app: it handles student sign-up and login, serves quiz questions by subject and records each student's score. Built with NestJS and Supabase (PostgreSQL).

University project (2024) by Emanuel, Lucca and Pedro. The mobile app lives in [quiz_app_front_end_flutter](https://github.com/filizzolalucca/quiz_app_front_end_flutter).

<p>
  <img src="https://img.shields.io/badge/NestJS-E0234E?logo=nestjs&logoColor=white" alt="NestJS">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Supabase-3FCF8E?logo=supabase&logoColor=white" alt="Supabase">
</p>

## Features

- **Accounts**: sign-up, login and name change, with passwords hashed using bcrypt
- **Quizzes by subject**: returns a set of questions with their answers and a help text, picking the next questionnaire the student hasn't taken yet
- **Scores**: stores the result of each quiz attempt per student and subject

## Endpoints

| Method | Route | Description |
|---|---|---|
| `POST` | `/auth/singup` | Create a student account |
| `POST` | `/auth/signinv2` | Log in with email and password |
| `POST` | `/auth/editName` | Change the student's name |
| `POST` | `/questions/questions` | Get the next quiz for a subject |
| `POST` | `/storeData/storeData` | Save a quiz score |

## Project structure

```
src/
├── main.ts            # Starts the server on port 3000
├── app.module.ts
├── auth/              # Sign-up, login, name change
├── questions/         # Quiz questions and answers
└── storeData/         # Score storage
```

## Getting started

```bash
npm install
npm run start:dev
```

The API runs at `http://localhost:3000`. It expects a Supabase project with `users`, `Resposta` and question tables. Update the Supabase URL and key in the services to point to your own project.

## Authors

Emanuel, Pedro and **Lucca Filizzola** · [@filizzolalucca](https://github.com/filizzolalucca)
