// The shape of a project's technical deep dive ("case study").
// Each section is optional: a section only appears once its content exists.
//
// Text fields may wrap code in backticks, e.g. "They never touch `req` or `res`."
// The page renders those parts in the mono font (see TextWithCode).

// A titled line of text: a layer, a note, a decision...
export type Point = {
  title: string;
  text: string;
};

// A line inside a diagram box. `step` links it to the request flow (shown as a numbered badge).
export type DiagramRow = {
  text: string;
  step?: number;
};

export type DiagramBox = {
  title: string;
  subtitle: string;
  rows: DiagramRow[];
  step?: number;
};

// One side of a diagram connection: a short word ("Request", "Query"), plus the request-flow
// step it belongs to, if it's its own step.
export type LinkSide = {
  label: string;
  step?: number;
};

// A two-way connection between two boxes: what goes there (above the line) and what
// comes back (below it). Deliberately abstract: the details (/api/v1, the pool) live in
// the notes and layers below the diagram, so the picture stays quick to read.
export type DiagramLink = {
  request: LinkSide;
  response: LinkSide;
};

export type Architecture = {
  summary: string;
  diagram: {
    client: DiagramBox;
    clientToApi: DiagramLink;
    api: DiagramBox;
    apiToDatabase: DiagramLink;
    database: DiagramBox;
  };
  backendLayers: Point[];
  rule: string; // the one principle behind the layers, highlighted
  notes: Point[];
  frontendLayers: Point[];
  requestFlow: {
    title: string; // the real action being traced, e.g. "A teacher marks attendance"
    steps: string[]; // in order; their numbers match the badges in the diagram
  };
};

// ------------------------------- Database --------------------------------

// A column shown in the schema diagram. Only the ones that tell the story, never all of them.
// "pk-fk": part of a composite primary key that is also a foreign key (e.g. exam_results).
export type SchemaColumn = {
  name: string;
  key?: "pk" | "fk" | "pk-fk";
};

// One table in the diagram.
// `parents`: the tables it belongs to (its foreign keys). Each one becomes a 1 → N line.
// `cell`: where it sits on the wide layout, a 4-column × 3-row grid. On narrow screens the
// tables simply stack in the order of this list, so the order is also the reading order.
export type SchemaTable = {
  name: string;
  columns: SchemaColumn[];
  parents: string[];
  cell: { col: 1 | 2 | 3 | 4; row: 1 | 2 | 3 };
  highlight?: boolean; // the central table, the one most others connect to
};

// A rule the database itself enforces: what it means in plain English, then how.
export type DatabaseRule = {
  rule: string;
  how: string; // the constraint, shown as code
};

// One marked line of the showcase query, explained beside the code.
export type QueryNote = {
  letter: string; // "A", "B"... letters, so they never get mixed up with request-flow steps
  // the lines of `code` it explains (1-based). The first one carries the letter; the rest light
  // up with it on hover, e.g. BEGIN (1) and COMMIT (22) are one idea: "all or nothing".
  lines: number[];
  title: string;
  text: string;
};

// A short family of tables shown as one vertical chain on narrow screens, where the full
// graph can't fit: e.g. "Exams: exams → exam_results". Names refer to `tables`.
export type SchemaChain = {
  title: string;
  tables: string[];
};

// A real piece of code with lettered notes (the Database query, the Google linking query...).
export type CodeSample = {
  question: string; // what the code answers, shown above it
  source: string; // where the real code lives, e.g. "attendance.repository.ts"
  code: string;
  notes: QueryNote[];
};

export type Database = {
  summary: string;
  tables: SchemaTable[];
  chains: SchemaChain[];
  diagramNotes: string[]; // short notes shown in the diagram's empty cells
  rules: DatabaseRule[];
  rulesCallout: string;
  decisions: Point[];
  query: CodeSample;
  safety: Point[];
};

// One way of getting a session (password, Google, sign-up link, reset link): three short steps
// and the one practice that matters most in it.
export type AuthFlow = {
  icon: "key" | "user" | "mail" | "rotate"; // a name, not a component: data stays plain data
  title: string;
  steps: string[];
  keyPractice: string;
};

// "If someone tries to…" → what stops it. `details` are the technical names, shown as chips.
export type Threat = {
  attack: string;
  defense: string;
  details: string[];
};

export type Authentication = {
  summary: string;
  flows: AuthFlow[];
  session: {
    title: string;
    subtitle: string;
    facts: string[]; // short mono facts: the cookie, the timeouts, when it ends
  };
  threats: Threat[];
  decisions: Point[];
  code: CodeSample;
};

// ----------------------------- Key decisions ------------------------------

// Where a decision lives in the code. `path` is from the repo root; the page turns it into a
// GitHub link, so the claim can be checked in one click.
export type CodeRef = {
  label: string; // short, e.g. "payments.repository.ts"
  path: string; // e.g. "backend/src/modules/payments/payments.repository.ts"
};

// One decision, read like a short decision record: the problem, the obvious way and why not,
// what was built instead, what it cost, and where to see it.
export type KeyDecision = {
  question: string;
  obvious: { option: string; why: string }; // the alternative most people would reach for
  chosen: { option: string; how: string[] };
  cost: string; // the trade-off, said honestly
  code: CodeRef[];
};

export type KeyDecisions = {
  summary: string;
  decisions: KeyDecision[];
  principle: string; // the thread through all of them, highlighted at the end
};

export type CaseStudy = {
  architecture?: Architecture;
  database?: Database;
  authentication?: Authentication;
  keyDecisions?: KeyDecisions;
  // challenges, lessons: added as each one is built
};
