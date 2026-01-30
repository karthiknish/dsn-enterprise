"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import { useEffect, useRef, useState } from "react";
import MenuBar from "./tiptap/MenuBar";
import LinkDialog from "./tiptap/LinkDialog";
import ImageDialog from "./tiptap/ImageDialog";
import { EditorStyles } from "./tiptap/EditorStyles";
import { createExtensions, createEditorProps } from "./tiptap/useEditorConfig";

export default function TiptapEditor({ content, onChange, placeholder = "Start writing..." }) {
  const isExternalUpdate = useRef(false);
  const editorRef = useRef(null);
  const dragCounter = useRef(0);
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [showImageDialog, setShowImageDialog] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: createExtensions(placeholder),
    content,
    onUpdate: ({ editor }) => {
      if (!isExternalUpdate.current) {
        onChange(editor.getHTML());
      }
    },
    editorProps: {
      attributes: {
        class: "prose prose-lg max-w-none focus:outline-none min-h-[300px] p-4",
      },
      ...createEditorProps(isExternalUpdate, onChange),
    },
  });

  // Update editor content when content prop changes externally (e.g., from AI generator)
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      isExternalUpdate.current = true;
      editor.commands.setContent(content, false);
      isExternalUpdate.current = false;
    }
  }, [content, editor]);

  const handleLinkClick = () => {
    setLinkUrl(editor.getAttributes("link").href || "");
    setShowLinkDialog(true);
  };

  const handleImageClick = () => {
    setShowImageDialog(true);
  };

  const handleConfirmLink = (url, text) => {
    if (url) {
      if (text) {
        editor
          .chain()
          .focus()
          .extendMarkRange("link")
          .insertContent(text)
          .setLink({ href: url })
          .run();
      } else {
        editor
          .chain()
          .focus()
          .setLink({ href: url })
          .run();
      }
    }
  };

  const handleConfirmImage = (url, alt) => {
    if (url) {
      editor.chain().focus().setImage({ src: url, alt: alt || "" }).run();
    }
  };

  return (
    <div>
      <EditorStyles />
      <div
        className={`border border-gray-300 rounded-lg bg-white overflow-visible relative transition-colors ${
          isDragging ? "border-green-500 ring-2 ring-green-200" : ""
        }`}
        onDragEnter={(e) => {
          e.preventDefault();
          dragCounter.current++;
          if (dragCounter.current === 1) {
            setIsDragging(true);
          }
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          dragCounter.current--;
          if (dragCounter.current === 0) {
            setIsDragging(false);
          }
        }}
        onDragOver={(e) => {
          e.preventDefault();
        }}
        onDrop={(e) => {
          e.preventDefault();
          dragCounter.current = 0;
          setIsDragging(false);
          // The actual drop handling is done by the editor's handleDrop
        }}
      >
        <MenuBar
          editor={editor}
          onLinkClick={handleLinkClick}
          onImageClick={handleImageClick}
        />
        <div className="overflow-hidden rounded-b-lg">
          <EditorContent editor={editor} ref={editorRef} />
        </div>

        {/* Drop zone overlay */}
        {isDragging && (
          <div className="absolute inset-0 bg-green-50/90 backdrop-blur-sm rounded-lg flex flex-col items-center justify-center pointer-events-none z-10 border-2 border-dashed border-green-400">
            <svg className="w-16 h-16 text-green-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-green-700 font-semibold text-lg">Drop images here</p>
            <p className="text-green-600 text-sm mt-1">Supports JPG, PNG, GIF, WebP</p>
          </div>
        )}
      </div>

      {/* Link Dialog */}
      <LinkDialog
        isOpen={showLinkDialog}
        onClose={() => setShowLinkDialog(false)}
        onConfirm={handleConfirmLink}
        initialUrl={linkUrl}
      />

      {/* Image Dialog */}
      <ImageDialog
        isOpen={showImageDialog}
        onClose={() => setShowImageDialog(false)}
        onConfirm={handleConfirmImage}
      />
    </div>
  );
}
