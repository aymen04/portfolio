import { useWindowManager } from '../hooks/useWindowManager';
import Window from './Window/Window';
import MenuBar from './MenuBar/MenuBar';
import Dock from './Dock/Dock';
import Background from './Effects/Background';
import Finder from './apps/Finder/Finder';
import Terminal from './apps/Terminal/Terminal';
import VSCode from './apps/VSCode/VSCode';
import Safari from './apps/Safari/Safari';
import './Desktop.css';

export default function Desktop() {
  const {
    windows, activeApp,
    openApp, closeApp, minimizeApp,
    moveWindow, bringToFront,
  } = useWindowManager();

  return (
    <div className="desktop">
      <Background />
      <MenuBar activeApp={activeApp} />

      <div className="desktop__area">
        <Window id="finder"   win={windows.finder}   onClose={closeApp} onMinimize={minimizeApp} onFocus={bringToFront} onMove={moveWindow}>
          <Finder />
        </Window>
        <Window id="terminal" win={windows.terminal} onClose={closeApp} onMinimize={minimizeApp} onFocus={bringToFront} onMove={moveWindow}>
          <Terminal />
        </Window>
        <Window id="vscode"   win={windows.vscode}   onClose={closeApp} onMinimize={minimizeApp} onFocus={bringToFront} onMove={moveWindow}>
          <VSCode />
        </Window>
        <Window id="safari"   win={windows.safari}   onClose={closeApp} onMinimize={minimizeApp} onFocus={bringToFront} onMove={moveWindow}>
          <Safari />
        </Window>
      </div>

      <Dock windows={windows} openApp={openApp} />
    </div>
  );
}
