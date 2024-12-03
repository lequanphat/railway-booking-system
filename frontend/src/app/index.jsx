import { StompSessionProvider } from 'react-stomp-hooks';
import AppProvider from '~/app/provider';
import { AppRouter } from '~/app/router';

const App = () => {
  return (
    <StompSessionProvider url={'http://localhost:3001/ws'}>
      <AppProvider>
        <AppRouter />
      </AppProvider>
    </StompSessionProvider>
  );
};

export default App;
