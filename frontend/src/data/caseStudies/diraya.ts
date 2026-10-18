import type { CaseStudy } from "./types";

// Diraya's technical deep dive. Content only: the page decides how it looks.
//
// TODO(Ahmed) before launch, so everything here is true:
//   - the request flow uses EXAMPLE names (AttendanceForm, useMarkAttendance, ...):
//     replace them with one real action and its real file/function names
//   - step 4 says the controller "checks the request body": confirm how you validate
//   - is the backend TypeScript too? If yes, add it to the API box's subtitle
export const dirayaCaseStudy: CaseStudy = {
  architecture: {
    summary:
      "A React single-page app talks to a versioned Express REST API, which reads and writes PostgreSQL through raw SQL. Teachers and students get separate interfaces on the same API.",

    diagram: {
      client: {
        title: "Browser",
        subtitle: "React + TypeScript",
        rows: [{ text: "Teacher dashboard" }, { text: "Student pages" }],
        step: 1,
      },
      clientToApi: {
        request: { label: "Request", step: 2 },
        response: { label: "Response", step: 7 },
      },
      api: {
        title: "Express API",
        subtitle: "Node.js + Express",
        rows: [
          { text: "middleware: CORS → JSON → auth (JWT) → role check", step: 3 },
          { text: "routes → controllers → services", step: 4 },
        ],
      },
      apiToDatabase: {
        request: { label: "Query", step: 5 },
        response: { label: "Result", step: 6 },
      },
      database: {
        title: "PostgreSQL",
        subtitle: "Raw SQL, no ORM",
        rows: [],
      },
    },

    backendLayers: [
      { title: "Routes", text: "URL + method → which controller handles it. No logic." },
      { title: "Controllers", text: "Read the request, call a service, send the response. No SQL." },
      { title: "Services", text: "Business logic and SQL. They never touch `req` or `res`." },
      { title: "db.ts", text: "One shared connection pool for the whole API." },
    ],

    rule: "Controllers don’t know about the database. Services don’t know about HTTP.",

    notes: [
      {
        title: "`app.ts` vs `server.ts`",
        text: "The app is built in one file and started in the other, so it can be tested without opening a port.",
      },
      {
        title: "`/api/v1`",
        text: "Every route is versioned, so the API can change later without breaking the frontend.",
      },
    ],

    frontendLayers: [
      {
        title: "`api/ → hooks/ → components`",
        text: "Components never call fetch directly: they use hooks, which use the API functions.",
      },
      {
        title: "`AuthContext`",
        text: "One context holds the logged-in user app-wide, with separate route trees for teachers and students.",
      },
    ],

    requestFlow: {
      title: "A teacher marks attendance",
      steps: [
        "`AttendanceForm` calls `useMarkAttendance()`.",
        "The hook calls `api.attendance.mark()`, which sends `POST /api/v1/attendance`.",
        "The auth middleware verifies the JWT and checks the user is a teacher.",
        "The route hands it to `attendanceController.mark`, which checks the request body.",
        "`attendanceService.mark` runs the SQL through the shared pool.",
        "PostgreSQL sends back the saved rows, and the service returns them to the controller.",
        "The controller sends the JSON response, and the hook updates the screen.",
      ],
    },
  },
};
