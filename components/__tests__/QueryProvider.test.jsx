import { render, screen } from '@testing-library/react';
import QueryProvider from '@/components/QueryProvider';

describe('QueryProvider', () => {
  it('renders its children', () => {
    render(
      <QueryProvider>
        <div>child content</div>
      </QueryProvider>
    );
    expect(screen.getByText('child content')).toBeInTheDocument();
  });
});
