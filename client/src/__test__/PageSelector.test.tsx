// PageSelector.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import PageSelector from '../components/PageSelector';

describe('PageSelector', () => {
    it('should render with the correct initial page', () => {
        render(<PageSelector onSelectedPage={() => {}} selectedPage={1} resultLen={10} />);
        expect(screen.getByText('Page 1')).toBeInTheDocument();
    });

    it('should call onSelectedPage with decremented page number when "-" button is clicked', () => {
        const onSelectedPageMock = jest.fn();
        render(<PageSelector onSelectedPage={onSelectedPageMock} selectedPage={2} resultLen={10} />);
        fireEvent.click(screen.getByText('-'));
        expect(onSelectedPageMock).toHaveBeenCalledWith(1);
    });

    it('should call onSelectedPage with incremented page number when "+" button is clicked', () => {
        const onSelectedPageMock = jest.fn();
        render(<PageSelector onSelectedPage={onSelectedPageMock} selectedPage={2} resultLen={10} />);
        fireEvent.click(screen.getByText('+'));
        expect(onSelectedPageMock).toHaveBeenCalledWith(3);
    });

    it('should handle edge cases where selectedPage is NaN', () => {
        const onSelectedPageMock = jest.fn();
        render(<PageSelector onSelectedPage={onSelectedPageMock} selectedPage={NaN} resultLen={10} />);
        expect(screen.getByText('Page 1')).toBeInTheDocument();
    });
});
