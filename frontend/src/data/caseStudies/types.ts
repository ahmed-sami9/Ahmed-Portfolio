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

export type Database = {
  summary: string;
  tables: SchemaTable[];
  chains: SchemaChain[];
  diagramNotes: string[]; // short notes shown in the diagram's empty cells
  rules: DatabaseRule[];
  rulesCallout: string;
  decisions: Point[];
  query: {
    question: string;
    source: string; // where the real code lives, e.g. "attendance.repository.ts"
    code: string;
    notes: QueryNote[];
  };
  safety: Point[];
};

export type CaseStudy = {
  architecture?: Architecture;
  database?: Database;
  // authentication, decisions, challenges, lessons: added as each one is built
};
