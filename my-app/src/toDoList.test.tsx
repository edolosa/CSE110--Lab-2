import { render, screen, fireEvent } from '@testing-library/react';
import { ToDoList } from './toDoList';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

// Read Test: Check if all items in the list are displayed on the screen
test('displays all items in the to-do list', () => {
    render(<ToDoList />);
    expect(screen.getByText("'s To Do List")).toBeInTheDocument();
  
    const item1 = screen.getByText("Apples"); 
    const item2 = screen.getByText("Bananas");
  
    expect(item1).toBeInTheDocument();
    expect(item2).toBeInTheDocument();
  });

  test('updates the number of checked items and matches the count displayed', () => {
    render(<ToDoList />);
    const item1Checkbox = screen.getByLabelText("Apples"); 
    const item2Checkbox = screen.getByLabelText("Bananas");

    expect(screen.getByText("Items bought: 0")).toBeInTheDocument();
    fireEvent.click(item1Checkbox);
    expect(screen.getByText("Items bought: 1")).toBeInTheDocument();
    fireEvent.click(item2Checkbox);
    expect(screen.getByText("Items bought: 2")).toBeInTheDocument();
    fireEvent.click(item1Checkbox);
    expect(screen.getByText("Items bought: 1")).toBeInTheDocument();
  });