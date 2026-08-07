import React from 'react';
import { render } from '@testing-library/react';
import NavigationCard from '../components/NavigationCard';

test('renders NavigationCard', () => {
    render(<NavigationCard title='Test Card' icon='test-icon' description='Test Description' onClick={() => {}} />);
    expect(screen.getByText(/Test Card/i)).toBeInTheDocument();
});