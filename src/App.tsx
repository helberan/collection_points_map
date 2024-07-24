import './App.css';
import { ThemeProvider } from '@emotion/react';
import theme from './theme';
import { MainComponent } from './components/Main/MainComponent';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <MainComponent />
    </ThemeProvider>
  );
}

export default App;
