import { useLayoutEffect, useState, type RefObject } from "react";
import type { SchemaTable } from "@/data/caseStudies/types";
import { relationPath } from "./relationPath";

export type SchemaLine = {
  key: string;
  parent: string; // table names, so the graph can light up one table's lines on hover
  child: string;
  line: string; // SVG path of the line
  marks: string; // SVG path of the "one" bar and the "many" fork (see relationPath)
};

// Vertical distance from a table's top edge to the middle of its name: lines that leave or
// enter from the side do it at the name's height, so they read as "this table".
const NAME_Y = 24;
// Elbow lines leave a parent this far in from its corner, so two elbows from the same table
// (students → exam_results, students → student_notes) never overlap.
const ELBOW_INSET = 28;

// Works out the lines between tables from where the tables ACTUALLY are on screen.
//
// Why measure instead of hard-coding coordinates: table heights depend on their columns, the
// font, and the screen width. Measuring with getBoundingClientRect keeps every line attached
// to its tables at any size. A ResizeObserver re-measures whenever the grid or a table resizes.
//
// Three shapes, picked from the positions:
//   same row     → a straight horizontal line, at name height
//   same column  → a straight vertical line, bottom to top
//   otherwise    → an elbow: down from the parent, then sideways into the child
export function useSchemaLines(
  containerRef: RefObject<HTMLElement | null>,
  tables: SchemaTable[],
): SchemaLine[] {
  const [lines, setLines] = useState<SchemaLine[]>([]);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const measure = () => {
      const origin = container.getBoundingClientRect();
      const boxes = new Map<string, DOMRect>();
      container.querySelectorAll<HTMLElement>("[data-table]").forEach((el) => {
        const r = el.getBoundingClientRect();
        // Positions relative to the container, which is also the SVG's coordinate space
        boxes.set(el.dataset.table!, new DOMRect(r.x - origin.x, r.y - origin.y, r.width, r.height));
      });

      const next: SchemaLine[] = [];
      for (const table of tables) {
        const child = boxes.get(table.name);
        if (!child) continue;

        for (const parentName of table.parents) {
          const parent = boxes.get(parentName);
          if (!parent) continue;
          next.push({
            key: `${parentName}-${table.name}`,
            parent: parentName,
            child: table.name,
            ...routeLine(parent, child),
          });
        }
      }

      // Only update when something moved, so re-renders can't loop
      setLines((prev) => (JSON.stringify(prev) === JSON.stringify(next) ? prev : next));
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(container);
    container.querySelectorAll("[data-table]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [containerRef, tables]);

  return lines;
}

function routeLine(parent: DOMRect, child: DOMRect) {
  const sameRow = Math.abs(parent.top - child.top) < 4;
  const sameColumn = Math.abs(parent.x + parent.width / 2 - (child.x + child.width / 2)) < 4;
  const childOnRight = child.left > parent.left;
  const side = { x: childOnRight ? 1 : -1, y: 0 };
  const down = { x: 0, y: 1 };

  if (sameRow) {
    const y = parent.top + NAME_Y;
    const start = { x: childOnRight ? parent.right : parent.left, y };
    const end = { x: childOnRight ? child.left : child.right, y };
    return relationPath(start, side, [end], side);
  }

  if (sameColumn) {
    const x = parent.x + parent.width / 2;
    return relationPath({ x, y: parent.bottom }, down, [{ x, y: child.top }], down);
  }

  // Elbow: leave from the parent's bottom, on the side facing the child
  const x = childOnRight ? parent.right - ELBOW_INSET : parent.left + ELBOW_INSET;
  const y = child.top + NAME_Y;
  const corner = { x, y };
  const end = { x: childOnRight ? child.left : child.right, y };
  return relationPath({ x, y: parent.bottom }, down, [corner, end], side);
}
