import React from 'react';
import { render, screen } from '@testing-library/react';
import NavigationCard from '../components/NavigationCard';

test('renders NavigationCard with title', () => {
    render(<NavigationCard cardId="checkin" title="Check-in" icon="check-circle" route="/checkin" />);
    expect(screen.getByText(/check-in/i)).toBeInTheDocument();
});