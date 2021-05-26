import { render, screen } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
    it('renders a loading students section while API is being fetching', () => {
        render(<App />);
        const loadingElement = screen.getByText('Loading students...');
        expect(loadingElement).toBeInTheDocument();
    });
});
