import { LangProvider } from './context/LangContext';
import { useMediaQuery } from './hooks/useMediaQuery';
import MacOsDesktop from './components/macos/MacOsDesktop';
import IosMobile from './components/ios/IosMobile';

function AppInner() {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <>
      {isMobile ? <IosMobile /> : <MacOsDesktop />}
    </>
  );
}

export default function App() {
  return (
    <LangProvider>
      <AppInner />
    </LangProvider>
  );
}