"use client";

import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableHeader } from "@tiptap/extension-table-header";
import { TableCell } from "@tiptap/extension-table-cell";

export function createEditorProps(isExternalUpdate, onChange) {
  return {
    handleDrop: (event, view, moved) => {
      if (!view || moved) return false;

      const hasFiles = event.dataTransfer.files.length > 0;
      if (!hasFiles) return false;

      const images = Array.from(event.dataTransfer.files).filter((file) =>
        file.type.startsWith("image/")
      );

      if (images.length === 0) return false;

      event.preventDefault();

      // Insert each image
      images.forEach((image) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const url = e.target?.result;
          if (url && typeof url === "string") {
            const { schema } = view.state;
            const coordinates = view.posAtCoords({ left: event.clientX, top: event.clientY });
            if (coordinates) {
              const node = schema.nodes.image.create({ src: url, alt: image.name });
              const transaction = view.state.tr.insert(coordinates.pos, node);
              view.dispatch(transaction);
            }
          }
        };
        reader.readAsDataURL(image);
      });

      return true;
    },
    handlePaste: (event, view) => {
      if (!view || !event.clipboardData) return false;

      const images = Array.from(event.clipboardData.items)
        .map((item) => item.getAsFile())
        .filter((file) => file !== null && file.type.startsWith("image/"));

      if (images.length === 0) return false;

      event.preventDefault();

      images.forEach((image) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const url = e.target?.result;
          if (url && typeof url === "string") {
            const { schema } = view.state;
            const node = schema.nodes.image.create({ src: url, alt: image.name });
            const transaction = view.state.tr.replaceSelectionWith(node);
            view.dispatch(transaction);
          }
        };
        reader.readAsDataURL(image);
      });

      return true;
    },
  };
}

export function createExtensions(placeholder) {
  return [
    StarterKit.configure({
      heading: {
        levels: [1, 2, 3],
      },
    }),
    Image.configure({
      HTMLAttributes: {
        class: "max-w-full h-auto rounded-lg",
      },
    }),
    Link.configure({
      openOnClick: false,
      HTMLAttributes: {
        class: "text-primary hover:text-primary-dark underline",
      },
    }),
    Placeholder.configure({
      placeholder,
    }),
    TextAlign.configure({
      types: ["heading", "paragraph"],
    }),
    Underline,
    Table.configure({
      resizable: true,
      HTMLAttributes: {
        class: "my-4",
      },
    }),
    TableRow.configure({
      HTMLAttributes: {
        class: "border border-gray-300 last:border-r",
      },
    }),
    TableHeader.configure({
      HTMLAttributes: {
        class: "border border-gray-300 font-semibold text-gray-900 bg-gray-50",
      },
    }),
    TableCell.configure({
      HTMLAttributes: {
        class: "border border-gray-300 px-3 py-2 text-sm",
      },
    }),
  ];
}
