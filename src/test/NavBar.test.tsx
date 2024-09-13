// NavBar.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import NavBar from '../components/NavBar';

describe('NavBar Component', () => {

  test('renders NavBar with all elements', () => {
    render(
      <Router>
        <NavBar searchType={false} onToggle={() => {}} />
      </Router>
    );
    
    const logoElement = screen.getByRole('img');
    expect(logoElement).toBeInTheDocument();

    const colorModeSwitch = screen.getByRole('switch');
    expect(colorModeSwitch).toBeInTheDocument();

    const avatar = screen.getByRole('img', { name: /avatar/i });
    expect(avatar).toBeInTheDocument();
  });

  test('calls onSearch when search is triggered', () => {
    const handleSearch = jest.fn();
    
    render(
      <Router>
        <NavBar onSearch={handleSearch} searchType={false} onToggle={() => {}} />
      </Router>
    );
    
    const searchInput = screen.getByPlaceholderText(/search/i);
    
    fireEvent.change(searchInput, { target: { value: 'test query' } });
    fireEvent.submit(searchInput);

    expect(handleSearch).toHaveBeenCalledWith('test query', false);
  });

  test('calls onPress when logo is clicked', () => {
    const handlePress = jest.fn();
    
    render(
      <Router>
        <NavBar onPress={handlePress} searchType={false} onToggle={() => {}} />
      </Router>
    );
    
    const logoElement = screen.getByRole('img', { name: /logo/i });

    fireEvent.click(logoElement);
    expect(handlePress).toHaveBeenCalledTimes(1);
  });

  test('calls onToggle when SearchTypeSelector is toggled', () => {
    const handleToggle = jest.fn();
    
    render(
      <Router>
        <NavBar searchType={false} onToggle={handleToggle} />
      </Router>
    );
    
    const toggleSwitch = screen.getByRole('checkbox');

    fireEvent.click(toggleSwitch);
    
    expect(handleToggle).toHaveBeenCalledTimes(1);
  });

  test('hides search input when showSearch is false', () => {
    render(
      <Router>
        <NavBar searchType={false} showSearch={false} onToggle={() => {}} />
      </Router>
    );

    const searchInput = screen.queryByPlaceholderText(/search/i);
    
    expect(searchInput).not.toBeInTheDocument();
  });
});
