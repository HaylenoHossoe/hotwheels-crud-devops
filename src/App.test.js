import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import useCars from './Components/Hooks/useCars';

// MOCKE O MÓDULO REACT-ROUTER-DOM INTEIRO
jest.mock('react-router-dom', () => ({
  // MemoryRouter é usado para envolver o App em testes
  MemoryRouter: ({ children }) => <div>{children}</div>,
  // Routes e Route são usados para definir as rotas
  Routes: ({ children }) => <div>{children}</div>,
  Route: ({ element }) => element, // Renderiza diretamente o elemento do componente da rota
  // Link é usado para navegação no Navbar e em outros lugares
  Link: ({ to, children }) => <a href={to}>{children}</a>,
  // Se App ou seus componentes usarem useParams ou useNavigate, mocke-os também
  useParams: jest.fn(() => ({})),
  useNavigate: jest.fn(),
}));

// Mantenha este mock para o hook useCars, ele está funcionando
jest.mock('./Components/Hooks/useCars', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('App', () => {
  beforeEach(() => {
    // Limpa todos os mocks antes de cada teste
    jest.clearAllMocks();
    // Fornece um valor padrão para o mock do useCars para evitar erros iniciais
    require('./Components/Hooks/useCars').default.mockReturnValue({
      cars: [],
      loading: false,
      error: null,
      addCar: jest.fn(),
      editCar: jest.fn(),
      deleteCar: jest.fn(),
    });
  });

  test('renders main components and navigation links', async () => {
    render(<App />);

    // Verifica se os componentes básicos da aplicação estão presentes
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/About/i)).toBeInTheDocument();
    expect(screen.getByText(/Add Car/i)).toBeInTheDocument();

    // Verifica se os links de navegação estão corretos (o mock de Link cria <a>)
    expect(screen.getByRole('link', { name: /Home/i })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: /Add Car/i })).toHaveAttribute('href', '/add-car');

    // Se você tiver uma lista de carros inicial ou algum carregamento assíncrono
    // que App gerencia, você pode adicionar asserções para isso aqui.
    // Ex: await waitFor(() => expect(screen.getByText('Loading...')).not.toBeInTheDocument());
  });

  // Adicione outros testes conforme a complexidade do seu App
});