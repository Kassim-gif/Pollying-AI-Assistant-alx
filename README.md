# Pollying-AI-Assistant-alx
ALX PROJECT
# Polling App – AI Assistant Rules

1. 📁 Folder Structure
- Poll-related components must go in `/app/polls/`
- API routes live in `/app/api/`
- Shared UI components go in `/app/components/`

2. 🧩 Form Handling
- Use `react-hook-form` for form logic
- Use `shadcn/ui` for all UI elements (inputs, buttons, modals)
- Validate forms with `zod` schemas

3. 🔐 Supabase Integration
- Use Supabase for both auth and database
- Auth logic is imported from `/lib/supabaseClient.ts`
- Database operations use `supabase.from('polls')`

4. 🧠 Data & Naming
- Poll objects must include: `id`, `question`, `options[]`, `created_at`
- API endpoints follow REST: `GET /api/polls`, `POST /api/polls`
- Use `camelCase` for variables, `PascalCase` for components

5. 🛠️ Scaffolding Expectations
- When asked to scaffold a poll form:
  - Create component in `/app/polls/NewPollForm.tsx`
  - Use `react-hook-form`, `shadcn/ui`, and `zod`
  - Submit via Supabase to `/api/polls`
  - Include loading state and error handling

