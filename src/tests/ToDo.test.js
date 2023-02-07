import { render, screen, fireEvent  } from '@testing-library/react';
import React from "react";
import renderer from 'react-test-renderer';
import ToDo from '../component/ToDo';

describe('ToDo component', () => {
  it('Show the ToDo header', () => {
    render(<ToDo/>);
    expect(screen.getByText("TODO")).toBeInTheDocument();
  });
  
  it('Show the Done header', () => {
    render(<ToDo/>);
    expect(screen.getByText("DONE")).toBeInTheDocument();
  });
  
  it('Show the ToDo list', () => {
    render(<ToDo />);
    const input = screen.getByPlaceholderText('Task');
    fireEvent.change(input, { target: { value: 'First task' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 13 });
    expect(screen.getByText('First task')).toBeInTheDocument();
  });

  it('Add task in ToDo list', () => {
    render(<ToDo />);
    const input = screen.getByPlaceholderText('Task');
    fireEvent.change(input, { target: { value: 'First task' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 13 });
    const task = screen.getByText('First task');
    expect(task).toBeInTheDocument();
  });

  it("Show a completed task in the list of done", () => {
    render(<ToDo />);
    const input = screen.getByPlaceholderText("Task");
    fireEvent.change(input, { target: { value: "First task" } });
    fireEvent.keyDown(input, { key: "Enter", code: 13 });
    const checkbox = screen.getByText("First task");
    fireEvent.click(checkbox);
    expect(screen.getByText("First task")).toBeInTheDocument();
  });
  
  it("Displays several completed tasks in the list of done", () => {
    render(<ToDo />);
    const input = screen.getByPlaceholderText("Task");
    fireEvent.change(input, { target: { value: "First task" } });
    fireEvent.keyDown(input, { key: "Enter", code: 13 });
    fireEvent.change(input, { target: { value: "Second task" } });
    fireEvent.keyDown(input, { key: "Enter", code: 13 });
    const checkbox1 = screen.getByText("First task");
    fireEvent.click(checkbox1);
    expect(screen.getByText("First task")).toBeInTheDocument();
    const checkbox2 = screen.getByText("Second task");
    fireEvent.click(checkbox2);
    expect(screen.getByText("Second task")).toBeInTheDocument();
  });

  it('Snapshots', () => {
    const tree = renderer
      .create(<ToDo/>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});