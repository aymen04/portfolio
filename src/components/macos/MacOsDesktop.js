// src/components/macos/MacOsDesktop.js
import { useLang } from '../../context/LangContext';
import LockScreen from '../LockScreen/LockScreen';
import Desktop from '../Desktop';
import '../Desktop.css';

export default function MacOsDesktop() {
  const { lang } = useLang();
  
  return (
    <>
      {!lang && <LockScreen />}
      <Desktop />
    </>
  );
}