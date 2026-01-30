"use client";

export function EditorStyles() {
  return (
    <style jsx global>{`
      /* Table styles for TipTap */
      .ProseMirror table {
        border-collapse: collapse;
        width: 100%;
        margin: 1em 0;
        table-layout: fixed;
      }
      .ProseMirror table td,
      .ProseMirror table th {
        min-width: 1em;
        border: 1px solid #d1d5db;
        padding: 0.25rem 0.75rem;
      }
      .ProseMirror table th {
        background-color: #f9fafb;
        font-weight: 600;
        color: #111827;
      }
      .ProseMirror table p {
        margin: 0;
      }
      /* Table selected cell */
      .ProseMirror .selectedCell:after {
        z-index: 1;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        pointer-events: none;
        background-color: #b3d8ff;
        opacity: 0.3;
      }
      /* Fade animation */
      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: scale(0.95);
        }
        to {
          opacity: 1;
          transform: scale(1);
        }
      }
      .animate-fadeIn {
        animation: fadeIn 0.15s ease-out;
      }
    `}</style>
  );
}
