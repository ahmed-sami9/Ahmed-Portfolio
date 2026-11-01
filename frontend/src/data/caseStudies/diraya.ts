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

    // Wide layout (4 columns × 4 rows), chosen so no line crosses a table. students is the hub:
    // the empty cells above and below it are corridors where its elbow lines bend.
    //   teachers        grades         groups     group_schedules
    //   (note)          exams          ·          class_sessions
    //   (note)          exam_results   students   attendance_records
    //   payment_months  payments       ·          student_months
    tables: [
      {
        name: "teachers",
        columns: [{ name: "id", key: "pk" }, { name: "full_name" }, { name: "email" }],
        parents: [],
        cell: { col: 1, row: 1 },
      },
      {
        name: "grades",
        columns: [
          { name: "id", key: "pk" },
          { name: "teacher_id", key: "fk" },
          { name: "name" },
          { name: "monthly_fee" },
        ],
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
        name: "group_schedules",
        columns: [
          { name: "id", key: "pk" },
          { name: "group_id", key: "fk" },
          { name: "weekday" },
          { name: "start_time" },
        ],
        parents: ["groups"],
        cell: { col: 4, row: 1 },
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
        cell: { col: 3, row: 3 },
        highlight: true,
      },
      {
        name: "class_sessions",
        columns: [{ name: "id", key: "pk" }, { name: "group_id", key: "fk" }, { name: "held_on" }],
        parents: ["groups"],
        cell: { col: 4, row: 2 },
      },
      {
        name: "attendance_records",
        columns: [
          { name: "session_id", key: "pk-fk" },
          { name: "student_id", key: "pk-fk" },
          { name: "status" },
        ],
        parents: ["class_sessions", "students"],
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
        name: "payments",
        columns: [
          { name: "id", key: "pk" },
          { name: "student_id", key: "fk" },
          { name: "amount" },
          { name: "voided_at" },
        ],
        parents: ["students"],
        cell: { col: 2, row: 4 },
      },
      {
        name: "payment_months",
        columns: [
          { name: "payment_id", key: "pk-fk" },
          { name: "month", key: "pk" },
          { name: "amount" },
        ],
        parents: ["payments"],
        cell: { col: 1, row: 4 },
      },
      {
        name: "student_months",
        columns: [
          { name: "student_id", key: "pk-fk" },
          { name: "month", key: "pk" },
          { name: "skip_reason" },
          { name: "note" },
        ],
        parents: ["students"],
        cell: { col: 4, row: 4 },
      },
    ],

    // Narrow screens: the same tables as short families, top to bottom. A table's other
    // parents (e.g. exam_results also belongs to students) show as a chip on its card.
    chains: [
      { title: "Structure", tables: ["teachers", "grades", "groups", "students"] },
      { title: "Timetable", tables: ["group_schedules"] },
      { title: "Attendance", tables: ["class_sessions", "attendance_records"] },
      { title: "Exams", tables: ["exams", "exam_results"] },
      { title: "Payments", tables: ["payments", "payment_months"] },
      { title: "Skipped months & notes", tables: ["student_months"] },
    ],

    diagramNotes: [
      "Top-level tables carry `teacher_id`; marks, attendance and payments are reached through their student. Either way, who owns a row is checked in the query’s `WHERE`.",
      "Not drawn: `student_notes`, the teacher’s own `teacher_notes` and `activity` feed, and 3 auth tables (sessions, password-reset and email-verification tokens).",
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

  // Checked against Diraya's payments and demo modules, migrations and tests.
  // TODO(Ahmed): read each one aloud; if a line doesn't sound like you, reword it.
  keyDecisions: {
    summary:
      "The choices that shaped Diraya beyond any one layer. Each sits next to the obvious alternative, what it cost, and where it lives in the code.",
    decisions: [
      {
        question: "How do you record money so the history can always be trusted?",
        obvious: {
          option: "A “paid” checkbox per student per month",
          why: "No partial payments, no paying several months at once, and no record of who paid what, or when.",
        },
        chosen: {
          option: "Payments are records; each month’s status is worked out from them",
          how: [
            "A payment that covers several months is split across them, oldest first",
            "A mistake is voided with a reason, never deleted, so the history stays complete",
            "Due, paid and status are never stored: one query computes them, so every screen agrees",
          ],
        },
        cost: "Reads do more work: every status is calculated with joins when it’s read, instead of read from a column.",
        code: [
          { label: "payments.repository.ts", path: "backend/src/modules/payments/payments.repository.ts" },
          { label: "create-payments migration", path: "backend/migrations/1792000000000_create-payments.js" },
        ],
      },
      {
        question: "What if the same payment is sent twice, or two arrive at once?",
        obvious: {
          option: "Disable the button after the first click",
          why: "It can’t help with a retry after a lost response: the server has no way to know it’s a repeat.",
        },
        chosen: {
          option: "Each payment carries its own ID, and the student is locked while it’s written",
          how: [
            "The form sends one `request_id`; a repeat hits a `UNIQUE` constraint and inserts nothing",
            "The repeat gets the same answer as the first request, not an error",
            "`SELECT … FOR UPDATE` on the student, so two payments at once can’t both fill the same month",
          ],
        },
        cost: "Two writes about the same student wait for each other: a short queue in exchange for totals that are always right.",
        code: [
          { label: "payments.repository.ts", path: "backend/src/modules/payments/payments.repository.ts" },
          { label: "payments.repository.test.ts", path: "backend/src/modules/payments/payments.repository.test.ts" },
        ],
      },
      {
        question: "How do you test rules that live in the database?",
        obvious: {
          option: "Mock the database",
          why: "A mock can’t run a CHECK constraint or a row lock, so tests would pass while the real rules break.",
        },
        chosen: {
          option: "Tests run against a real PostgreSQL test database",
          how: [
            "Exams and payments have repository tests for the SQL and constraints, and API tests that start the real app with a real session cookie",
            "Each run creates its own teachers and deletes them at the end",
            "A guard refuses to run on any database whose name doesn’t contain `_test`",
          ],
        },
        cost: "Slower than mocks, and the files run one at a time (`--test-concurrency=1`) because they share one database.",
        code: [
          { label: "assertTestDatabase.ts", path: "backend/src/test/assertTestDatabase.ts" },
          { label: "exams.api.test.ts", path: "backend/src/modules/exams/exams.api.test.ts" },
        ],
      },
      {
        question: "How can someone try it without signing up?",
        obvious: {
          option: "One shared demo account",
          why: "Two visitors at the same time would edit, and delete, each other’s data.",
        },
        chosen: {
          option: "A brand-new teacher account for every visit",
          how: [
            "Created and filled from a sample-data template in one transaction: complete, or not at all",
            "Its email ends in `.invalid`, a domain that can never receive mail",
            "After 24 hours it’s deleted, along with everything it owns (`ON DELETE CASCADE`)",
          ],
        },
        cost: "Every visit writes to the database, so starting a demo is rate limited. Old demos are removed when the next one starts, so no scheduled job is needed.",
        code: [
          { label: "demo.service.ts", path: "backend/src/modules/demo/demo.service.ts" },
          { label: "add-demo-teachers migration", path: "backend/migrations/1791402339531_add-demo-teachers.js" },
        ],
      },
    ],
    principle:
      "The thread through all four: make the wrong outcome impossible, not just unlikely. Shared data, lost history, a double charge, a wiped database: each one is blocked by design, not by being careful.",
  },

  // DRAFT: each story is checked against Diraya's migrations, but the takeaways are written
  // for Ahmed to rewrite in his own words. Add the deployment lesson after going live.
  // TODO(Ahmed): rewrite every "lesson" line in your words before launch.
  lessons: {
    summary:
      "Three things I got wrong at first. Each was fixed with a migration that repaired the existing data, and each changed what I decide at the start of a project.",
    items: [
      {
        title: "Emails that differed only by capitals",
        problem:
          "I stored emails exactly as they were typed, so “Ahmed@x.com” and “ahmed@x.com” could sign up as two teachers, and password login missed an account Google had saved in lower case.",
        fix: "The API now lower-cases every email it receives, and a migration lower-cased the stored ones. If two accounts clash, it stops and names them instead of guessing which to keep, and a CHECK refuses any other case.",
        lesson:
          "Normalize input at the boundary from day one. Deciding when two values count as “the same” is a design decision, not a detail.",
        code: [
          { label: "lowercase-teacher-emails migration", path: "backend/migrations/1792600000000_lowercase-teacher-emails.js" },
          { label: "auth.validation.ts", path: "backend/src/modules/auth/auth.validation.ts" },
        ],
      },
      {
        title: "Students who belonged to no group",
        problem:
          "At first a student only needed a grade. But groups own the attendance sheets, so a student outside every group would silently appear on none of them.",
        fix: "A migration moved every such student into their grade’s oldest group (creating “Group 1” where none existed), made the group required, and added a composite foreign key so a student’s group must belong to their grade.",
        lesson:
          "Model the real-world rule in the schema first. If a state is wrong, make it impossible, before data piles up that has to be repaired.",
        code: [
          { label: "require-student-group migration", path: "backend/migrations/1791700000000_require-student-group.js" },
        ],
      },
      {
        title: "A fee that could be empty",
        problem:
          "A grade’s monthly fee started as optional. When payments arrived, an empty fee had no meaning: the system couldn’t work out what a student owed.",
        fix: "A migration set every missing fee to 0 and made the column required, so a free grade now says 0 instead of nothing.",
        lesson:
          "Decide early what “unknown” means for every field money will depend on. A NULL is a question every query has to answer.",
        code: [
          { label: "require-grade-fee migration", path: "backend/migrations/1792100000000_require-grade-fee.js" },
        ],
      },
    ],
  },
};
