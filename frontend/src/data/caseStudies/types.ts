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

export type CaseStudy = {
  architecture?: Architecture;
  // database, decisions, challenges, lessons: added as each one is built
};
