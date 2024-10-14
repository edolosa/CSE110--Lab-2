import { render, screen, fireEvent } from "@testing-library/react";
import { StickyNotes } from "./stickyNotes";

test("renders create note form", () => {
 render(<StickyNotes />);
 const createNoteButton = screen.getByText("Create Note");
 expect(createNoteButton).toBeInTheDocument();
});

describe("Create StickyNote", () => {
    test("renders create note form", () => {
      render(<StickyNotes />);
   
      const createNoteButton = screen.getByText("Create Note");
      expect(createNoteButton).toBeInTheDocument();
    });
   
    test("creates a new note", () => {
      render(<StickyNotes />);
   
   // Please make sure your sticky note has a title and content input field with the following placeholders.
      const createNoteTitleInput = screen.getByPlaceholderText("Note Title");
      const createNoteContentTextarea = screen.getByPlaceholderText("Note Content");
      const createNoteButton = screen.getByText("Create Note");
   
      fireEvent.change(createNoteTitleInput, { target: { value: "New Note" } });
      fireEvent.change(createNoteContentTextarea, {target: { value: "Note content" },});
      fireEvent.click(createNoteButton);
   
      const newNoteTitle = screen.getByText("New Note");
      const newNoteContent = screen.getByText("Note content");
   
      expect(newNoteTitle).toBeInTheDocument();
      expect(newNoteContent).toBeInTheDocument();
    });
   });

 
   
   // Read Test
   test('displays all created notes', () => {
     render(<StickyNotes />);
     
     const createNoteTitleInput = screen.getByPlaceholderText("Note Title");
     const createNoteContentTextarea = screen.getByPlaceholderText("Note Content");
     const createNoteButton = screen.getByText("Create Note");
   
     fireEvent.change(createNoteTitleInput, { target: { value: "Note 1" } });
     fireEvent.change(createNoteContentTextarea, { target: { value: "Content 1" } });
     fireEvent.click(createNoteButton);
   
     fireEvent.change(createNoteTitleInput, { target: { value: "Note 2" } });
     fireEvent.change(createNoteContentTextarea, { target: { value: "Content 2" } });
     fireEvent.click(createNoteButton);
   
     expect(screen.getByText("Note 1")).toBeInTheDocument();
     expect(screen.getByText("Content 1")).toBeInTheDocument();
     expect(screen.getByText("Note 2")).toBeInTheDocument();
     expect(screen.getByText("Content 2")).toBeInTheDocument();
   });
   
   // Update Test
   test('updates note content after editing', () => {
     render(<StickyNotes />);
     
     const createNoteTitleInput = screen.getByPlaceholderText("Note Title");
     const createNoteContentTextarea = screen.getByPlaceholderText("Note Content");
     const createNoteButton = screen.getByText("Create Note");
   
     fireEvent.change(createNoteTitleInput, { target: { value: "New Note" } });
     fireEvent.change(createNoteContentTextarea, {target: { value: "Note content" },});
     fireEvent.click(createNoteButton);

     const noteContent = screen.getByText("Note content");
     fireEvent.input(noteContent, { target: { textContent: "Updated Content" } });
   
     expect(screen.getByText("Updated Content")).toBeInTheDocument();
     expect(screen.queryByText("Note content")).not.toBeInTheDocument();
   });
   
   // Delete Test
   test('deletes note when x button is clicked', () => {
     render(<StickyNotes />);
   
     const createNoteTitleInput = screen.getByPlaceholderText("Note Title");
     const createNoteContentTextarea = screen.getByPlaceholderText("Note Content");
     const createNoteButton = screen.getByText("Create Note");
  
     fireEvent.change(createNoteTitleInput, { target: { value: "New Note" } });
     fireEvent.change(createNoteContentTextarea, {target: { value: "Note content" },});
     fireEvent.click(createNoteButton);
  
     const newNoteTitle = screen.getByText("New Note");
     const newNoteContent = screen.getByText("Note content");
  
     expect(newNoteTitle).toBeInTheDocument();
     expect(newNoteContent).toBeInTheDocument();

     const deleteButton = screen.getAllByText('x')[0];
     fireEvent.click(deleteButton);

     expect(newNoteTitle).not.toBeInTheDocument();
     expect(newNoteContent).not.toBeInTheDocument();
   });
   