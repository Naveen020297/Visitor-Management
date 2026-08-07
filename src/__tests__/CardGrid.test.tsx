import React from 'react';
import { render } from '@testing-library/react';
import CardGrid from '../components/CardGrid';

test('renders CardGrid with cards', () => {
    const cards = [{ id: 'test', title: 'Test Card', icon: 'test-icon', description: 'Test Description' }];
    render(<CardGrid cards={cards} />);
    expect(screen.getByText(/Test Card/i)).toBeInTheDocument();
});