import { LangProvider, useLang } from './context/LangContext';
import LockScreen from './components/LockScreen/LockScreen';
import Desktop from './components/Desktop';
import './components/Desktop.css';

function AppInner() {
  const { lang } = useLang();
  return (
    <>
      {!lang && <LockScreen />}
      {/* Desktop always mounted but hidden under lockscreen */}
      <Desktop />
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
