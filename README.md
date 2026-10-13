# Task API — FlyRank Backend AI Engineering

A small REST API for creating and managing to-do tasks. This project uses Node.js, Express, and Swagger UI. Task data is kept in memory, so it resets whenever the server restarts; this is intentional for the first CRUD assignment.

## Requirements

- Node.js 18 or newer
- npm

## Install and run

```bash
npm install
npm start
```

The API runs at `http://localhost:3000`. Open `http://localhost:3000/docs` for interactive Swagger documentation.

## Endpoints

| Method | Path | Purpose |
|---|---|---|
| GET | `/` | Show API name and version |
| GET | `/health` | Health check |
| GET | `/tasks` | List all tasks |
| GET | `/tasks/:id` | Get one task |
| POST | `/tasks` | Create a task |
| PUT | `/tasks/:id` | Update a task's title and/or done state |
| DELETE | `/tasks/:id` | Delete a task |

## Example requests

List tasks:

```bash
curl -i http://localhost:3000/tasks
```

Create a task:

```bash
curl -i -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Buy milk"}'
```

Invalid create request (expected `400 Bad Request`):

```bash
curl -i -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{}'
```

Get a missing task (expected `404 Not Found`):

```bash
curl -i http://localhost:3000/tasks/99
```

## Data model

Each task has:
- `id`: numeric identifier
- `title`: non-empty string
- `done`: boolean

## Testing checklist

- [ ] Check `/` and `/health`
- [ ] List tasks and retrieve an existing task
- [ ] Confirm an unknown ID returns `404`
- [ ] Create a task and confirm it returns `201`
- [ ] Confirm a missing or blank title returns `400`
- [ ] Update `title` and `done`; check invalid bodies return `400`
- [ ] Delete a task and confirm `204` with no response body
- [ ] Complete the CRUD cycle through Swagger UI
- [ ] Save a screenshot of `/docs` in `screenshots/swagger.png`
- [ ] Add actual terminal output and the screenshot to this README before submitting

## Git history

The assignment asks for at least six meaningful commits, one per stage. Create these as you complete and test each stage. Do not fabricate earlier commits or claim stages you have not completed.

Suggested commit messages:
1. `Stage 0: hello server`
2. `Stage 1: root and health endpoints`
3. `Stage 2: read endpoints with 404`
4. `Stage 3: create with validation`
5. `Stage 4: full CRUD`
6. `Stage 5: Swagger UI`
7. `Stage 6: publish and docs`

## Notes

This project is intended as a learning exercise. Review the code, run the tests yourself, and update this README with your own screenshots and observed outputs before submitting.
