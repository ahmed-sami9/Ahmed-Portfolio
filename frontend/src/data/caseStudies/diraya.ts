import type { CaseStudy } from "./types";

// Diraya's technical deep dive. Content only: the page decides how it looks.
// Every claim here was checked against the Diraya codebase (backend/migrations,
// backend/src, frontend/src). Keep it that way: if the code changes, change this.

export const dirayaCaseStudy: CaseStudy = {
  architecture: {
    summary:
      "A React single-page app talks to a versioned Express REST API, which reads and writes PostgreSQL through raw SQL. Everything a teacher manages lives behind one signed-in dashboard.",

    diagram: {
      client: {
        title: "Browser",
        subtitle: "React + TypeScript",
        rows: [{ text: "Teacher dashboard" }, { text: "api/ → hooks/ → components" }],
        step: 1,
      },
      clientToApi: {
        request: { label: "Request", step: 2 },
        response: { label: "Response", step: 7 },
      },
      api: {
        title: "Express API",
        subtitle: "Node.js + Express 5 + TypeScript",
        rows: [
          { text: "middleware: CORS → JSON → Origin check → auth", step: 3 },
          { text: "routes → controllers → services → repositories", step: 4 },
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
      {
        title: "Routes",
        text: "URL + method → validation (a zod schema) → which controller handles it. No logic.",
      },
      { title: "Controllers", text: "Read the request, call a service, send the response. No SQL." },
      {
        title: "Services",
        text: "The business rules, e.g. no attendance for a day that hasn’t come yet. They never touch `req` or `res`.",
      },
      {
        title: "Repositories",
        text: "All the SQL lives here: parameterized queries, and transactions when several writes must succeed together.",
      },
      { title: "db.ts", text: "One shared connection pool for the whole API." },
    ],

    rule: "Controllers don’t know about the database. Services don’t know about HTTP. Only repositories write SQL.",

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
        text: "One context holds the signed-in teacher app-wide; protected routes send anyone signed out to sign in.",
      },
    ],

    requestFlow: {
      title: "A teacher saves the attendance sheet",
      steps: [
        "`AttendancePage` calls `save()` from the `useAttendanceSheet` hook.",
        "The hook calls `saveAttendanceSheet()`, which sends `PUT /api/v1/teacher/attendance/sheet` with the session cookie.",
        "The Origin check blocks other sites, then `authenticate` verifies the JWT and the server-side session.",
        "`validateSaveSheet` checks the body (zod), `putSheet` hands it to the service, which checks the rules.",
        "The repository’s `saveSheet` writes the session and every mark in one transaction.",
        "PostgreSQL commits, and the service reads the saved sheet back.",
        "`putSheet` sends the sheet as JSON, and the hook shows exactly what was stored.",
      ],
    },
  },

  database: {
    summary:
      "PostgreSQL through raw SQL (`pg`), with the schema versioned in migrations. It’s designed so the database itself refuses impossible data: every rule that matters is a constraint, not just an `if` in the code.",

    // Wide layout (4 columns × 3 rows), chosen so no two lines cross:
    //   teachers → grades → groups → class_sessions
    //               exams   students  attendance_records
    //       exam_results              student_notes
    tables: [
      {
        name: "teachers",
        columns: [{ name: "id", key: "pk" }, { name: "full_name" }, { name: "email" }],
        parents: [],
        cell: { col: 1, row: 1 },
      },
      {
        name: "grades",
        columns: [{ name: "id", key: "pk" }, { name: "teacher_id", key: "fk" }, { name: "name" }],
        parents: ["teachers"],
        cell: { col: 2, row: 1 },
      },
      {
        name: "groups",
        columns: [{ name: "id", key: "pk" }, { name: "grade_id", key: "fk" }, { name: "name" }],
        parents: ["grades"],
        cell: { col: 3, row: 1 },
      },
      {
        name: "students",
        columns: [
          { name: "id", key: "pk" },
          { name: "group_id", key: "fk" },
          { name: "grade_id", key: "fk" },
          { name: "code" },
          { name: "full_name" },
        ],
        parents: ["groups"],
        cell: { col: 3, row: 2 },
        highlight: true,
      },
      {
        name: "student_notes",
        columns: [{ name: "id", key: "pk" }, { name: "student_id", key: "fk" }, { name: "text" }],
        parents: ["students"],
        cell: { col: 4, row: 3 },
      },
      {
        name: "exams",
        columns: [
          { name: "id", key: "pk" },
          { name: "grade_id", key: "fk" },
          { name: "title" },
          { name: "max_mark" },
        ],
        parents: ["grades"],
        cell: { col: 2, row: 2 },
      },
      {
        name: "exam_results",
        columns: [
          { name: "exam_id", key: "pk-fk" },
          { name: "student_id", key: "pk-fk" },
          { name: "status" },
          { name: "score" },
        ],
        parents: ["exams", "students"],
        cell: { col: 2, row: 3 },
      },
      {
        name: "class_sessions",
        columns: [{ name: "id", key: "pk" }, { name: "group_id", key: "fk" }, { name: "held_on" }],
        parents: ["groups"],
        cell: { col: 4, row: 1 },
      },
      {
        name: "attendance_records",
        columns: [
          { name: "session_id", key: "pk-fk" },
          { name: "student_id", key: "pk-fk" },
          { name: "status" },
        ],
        parents: ["class_sessions", "students"],
        cell: { col: 4, row: 2 },
      },
    ],

    // Narrow screens: the same tables as three short families, top to bottom. A table's other
    // parents (e.g. exam_results also belongs to students) show as a chip on its card.
    chains: [
      { title: "Structure", tables: ["teachers", "grades", "groups", "students", "student_notes"] },
      { title: "Attendance", tables: ["class_sessions", "attendance_records"] },
      { title: "Exams", tables: ["exams", "exam_results"] },
    ],

    diagramNotes: [
      "Every table carries `teacher_id`: each teacher’s data is isolated and checked in one `WHERE`.",
      "Plus 3 auth tables: sessions, password-reset and email-verification tokens.",
    ],

    rules: [
      {
        rule: "A score can never be above the exam’s “out of”, even if “out of” is lowered later.",
        how: "max_mark copied with ON UPDATE CASCADE + CHECK (score <= max_mark)",
      },
      {
        rule: "A student’s group must belong to the student’s grade.",
        how: "FOREIGN KEY (group_id, grade_id) REFERENCES groups (id, grade_id)",
      },
      {
        rule: "Saving the same attendance sheet twice is safe.",
        how: "PRIMARY KEY (session_id, student_id) + ON CONFLICT DO UPDATE",
      },
      {
        rule: "“Absent” can’t have a score, and “scored” must have one.",
        how: "CHECK ((status = 'scored') = (score IS NOT NULL))",
      },
      {
        rule: "A grade that still has students can’t be deleted.",
        how: "FOREIGN KEY … NO ACTION (deliberately not RESTRICT)",
      },
    ],

    rulesCallout:
      "Nothing summarized is stored. Averages, attendance rates and “not entered yet” are computed when read, so they can never disagree with the data.",

    decisions: [
      {
        title: "Raw SQL with `pg`, versioned with migrations",
        text: "I see exactly what runs, and every schema change is a migration with an `up` and a `down`. The trade-off: more code than an ORM.",
      },
      {
        title: "Exact numbers and dates",
        text: "Marks are `numeric(5,1)`, so no 19.999999, and a CHECK allows only whole and half marks. Class days are a Cairo calendar `date`, so Saturday’s class can’t drift to Friday.",
      },
      {
        title: "`varchar` + CHECK, not a Postgres ENUM",
        text: "Statuses like present / late / absent are a CHECK list, so adding one later is a one-line migration.",
      },
      {
        title: "Indexes chosen for the real queries",
        text: "E.g. a separate `student_id` index, because the composite key starts with `session_id`; and a partial index that covers only demo accounts.",
      },
    ],

    query: {
      question: "Saving a whole class’s attendance: how does it stay correct?",
      source: "attendance.repository.ts · saveSheet (trimmed)",
      code: [
        "BEGIN;",
        "",
        "-- 1. Find or create the class session for this group and day",
        "INSERT INTO class_sessions",
        "  (teacher_id, grade_id, group_id, held_on)",
        "VALUES ($1, $2, $3, $4::date)",
        "ON CONFLICT ON CONSTRAINT class_sessions_group_id_held_on_unique",
        "DO UPDATE SET edited_at = ...  -- the “edited later” stamp",
        "RETURNING id;",
        "",
        "-- 2. Every student’s mark, in one statement",
        "INSERT INTO attendance_records",
        "  (session_id, student_id, grade_id, status, reason, is_make_up)",
        "SELECT $1, s.id, s.grade_id, x.status, x.reason, s.group_id <> $2",
        "FROM unnest($3::bigint[], $4::text[], $5::text[])",
        "  AS x (student_id, status, reason)",
        "JOIN students s ON s.id = x.student_id",
        "WHERE s.teacher_id = $6 AND s.grade_id = $7",
        "ON CONFLICT (session_id, student_id) DO UPDATE",
        "SET status = EXCLUDED.status, reason = EXCLUDED.reason;",
        "",
        "COMMIT;  -- ROLLBACK instead if any student wasn’t saved",
      ].join("\n"),
      notes: [
        {
          letter: "A",
          lines: [1, 22],
          title: "All or nothing",
          text: "One transaction: the session and every mark are saved together, or nothing is.",
        },
        {
          letter: "B",
          lines: [12, 13, 14, 15, 16, 17],
          title: "One insert for the whole class",
          text: "`unnest` turns the arrays into rows, so 30 students are 1 statement, not 30 round-trips.",
        },
        {
          letter: "C",
          lines: [18],
          title: "Only this teacher’s students",
          text: "The `WHERE` keeps ownership in the query. If fewer rows were saved than sent, the whole transaction rolls back.",
        },
        {
          letter: "D",
          lines: [19, 20, 7, 8],
          title: "Safe to repeat",
          text: "`ON CONFLICT … DO UPDATE` makes saving idempotent: a double click or a retry changes nothing.",
        },
      ],
    },

    safety: [
      {
        title: "Parameters, never string building",
        text: "Every value goes in as `$1`, `$2`…, so user input can’t change the query: no SQL injection, even without an ORM.",
      },
      {
        title: "Database errors become clear API errors",
        text: "A broken rule comes back from PostgreSQL with a code (`23505`, `23503`, `23514`); it’s turned into a named error for the user, and SQL details never leak.",
      },
    ],
  },

  // Every claim below is checked against Diraya's auth module (backend/src/modules/auth).
  authentication: {
    summary:
      "Four ways to sign in, one kind of session. Passwords are hashed with argon2, sessions live on the server so they can be ended at any moment, and every emailed link is hashed, single-use and short-lived.",
    flows: [
      {
        icon: "key",
        title: "Password",
        steps: [
          "Email + password checked with `argon2`",
          "Same error for a wrong email or a wrong password",
          "An unverified email is only mentioned after a correct password",
        ],
        keyPractice: "Nothing reveals which emails exist",
      },
      {
        icon: "user",
        title: "Google",
        steps: [
          "The browser only gets a one-time code",
          "The server exchanges it with its secret and checks the token was issued for Diraya",
          "Matched by Google’s permanent ID; the email must be Google-verified",
        ],
        keyPractice: "Linking to an unverified account wipes its password",
      },
      {
        icon: "mail",
        title: "Sign up + verify",
        steps: [
          "The account is created, but not signed in",
          "A link is emailed: 24 hours, single-use",
          "Clicking it verifies the email and signs in",
        ],
        keyPractice: "Prove you own the inbox before you get a session",
      },
      {
        icon: "rotate",
        title: "Password reset",
        steps: [
          "The same answer whether the account exists or not",
          "A 30-minute single-use link; only the newest one works",
          "One transaction: new password + every session ended; then the owner is emailed",
        ],
        keyPractice: "A reset signs everyone out",
      },
    ],
    session: {
      title: "Session",
      subtitle: "Every way in ends here, and it’s checked on every request",
      facts: [
        "httpOnly cookie",
        "3 h idle · 12 h max · 7 days with “remember me”",
        "ended at logout or password reset",
      ],
    },
    threats: [
      {
        attack: "steals the database",
        defense: "Passwords are slow-hashed; emailed links are stored only as hashes",
        details: ["argon2", "sha256"],
      },
      {
        attack: "injects a script into the page",
        defense: "The session cookie can’t be read by JavaScript",
        details: ["httpOnly"],
      },
      {
        attack: "submits a form from another site",
        defense: "Every write must come from Diraya’s exact address",
        details: ["Origin check", "SameSite=Lax"],
      },
      {
        attack: "guesses passwords",
        defense: "20 failed attempts per 15 minutes, per visitor",
        details: ["rate limit"],
      },
      {
        attack: "probes for registered emails",
        defense: "Login and reset answer the same either way",
        details: ["same response"],
      },
      {
        attack: "keeps using a stolen session",
        defense: "Sessions live on the server and can be ended instantly",
        details: ["revocable"],
      },
      {
        attack: "forges or edits the token",
        defense: "The signature, algorithm, issuer and audience are all checked",
        details: ["HS256 pinned"],
      },
      {
        attack: "floods someone’s inbox",
        defense: "One email per minute per account",
        details: ["cooldown"],
      },
    ],
    decisions: [
      {
        title: "A database check on every request",
        text: "It’s the price of being able to end a session instantly. A pure JWT can’t be revoked until it expires.",
      },
      {
        title: "A cookie instead of `localStorage`",
        text: "Scripts can’t steal it, but a cookie needs the CSRF Origin check, so both are there.",
      },
      {
        title: "One limiter per action, not one global one",
        text: "Login, sign-up, reset emails and link checks each get their own budget, so blocking one doesn’t block the others.",
      },
    ],
    code: {
      question: "Signing in with Google to an email that already has an account: who wins?",
      source: "auth.repository.ts · createOrLinkGoogleTeacher",
      code: [
        "INSERT INTO teachers (full_name, email, google_id, email_verified)",
        "VALUES ($1, $2, $3, TRUE)",
        "ON CONFLICT (email) DO UPDATE",
        "  SET google_id = EXCLUDED.google_id,",
        "      email_verified = TRUE,",
        "      password_hash = CASE",
        "        WHEN teachers.email_verified THEN teachers.password_hash",
        "        ELSE NULL",
        "      END",
        "  WHERE teachers.google_id IS NULL",
        "RETURNING id, full_name, email;",
      ].join("\n"),
      notes: [
        {
          letter: "A",
          lines: [3, 4, 5],
          title: "One email, one account",
          text: "An email that already has an account gets Google linked to it, instead of a second account.",
        },
        {
          letter: "B",
          lines: [6, 7, 8, 9],
          title: "An unverified password is wiped",
          text: "If the account was never verified, a stranger may have signed up with this email and set that password. Google proves who owns it, so the password goes. A verified owner keeps theirs.",
        },
        {
          letter: "C",
          lines: [10, 11],
          title: "Never re-linked",
          text: "An account already tied to another Google ID matches nothing, so no row comes back and the teacher sees “already linked to a different Google account”.",
        },
      ],
    },
  },
};
