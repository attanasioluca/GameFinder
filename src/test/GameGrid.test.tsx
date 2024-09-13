import { render, screen, waitFor } from '@testing-library/react';
import GameGrid from '../components/GameGrid';
import useGamesTest from './useGamesTest';
import { GameQuery } from '../components/MainPage'; 

jest.mock('../hooks/useGames');

const mockOnChange = jest.fn();

const defaultGameQuery: GameQuery = {
    genre: null,
    platform: null,
    sortOrder: 'desc',
    searchText: '',
    pageNumber: 1
  };

test('renders loading skeletons while data is loading', () => {
  useGamesTest([], true);

  render(<GameGrid gameQuery={defaultGameQuery} onChange={mockOnChange} />);

  expect(screen.getAllByText(/loading/i)).toHaveLength(6); 
});

test('renders error message when there is an error', () => {
  useGamesTest([], false, 'Failed to fetch');

render(<GameGrid gameQuery={defaultGameQuery} onChange={mockOnChange} />);

  expect(screen.getByText('Failed to fetch')).toBeInTheDocument();
});

test('renders game cards when data is available', async () => {
  useGamesTest(); 
  render(<GameGrid gameQuery={defaultGameQuery} onChange={mockOnChange} />);

  await waitFor(() => {
    expect(screen.getByText('Game 1')).toBeInTheDocument();
  });
  
  expect(mockOnChange).toHaveBeenCalledWith(1);
});
