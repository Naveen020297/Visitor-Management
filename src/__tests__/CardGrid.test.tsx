import React from 'react';
import { render } from '@testing-library/react';
import CardGrid from '../components/CardGrid';

test('renders CardGrid with cards', () => {
    const cards = [
        { cardId: 'checkin', title: 'Check-in', icon: 'check-circle', route: '/checkin' }
    ];
    const { container } = render(<CardGrid cards={cards} />);
    expect(container.getElementsByClassName('navigation-card').length).toBe(1);
});