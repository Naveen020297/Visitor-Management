import React from 'react';
import { render } from '@testing-library/react';
import NavigationCard from '../components/NavigationCard';

test('renders navigation card', () => {
    const { getByText } = render(<NavigationCard title='Check-in' description='Manage visitor check-in' icon='check-circle' />);
    expect(getByText(/Check-in/i)).toBeInTheDocument();
});