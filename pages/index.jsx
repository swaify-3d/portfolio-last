import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const [logs, setLogs] = useState([]);
  const [stage, setStage] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const terminalLogs = [
      'Initializing swaify portfolio...',
      'Loading modules...',
      'Decrypting payload...',
      'Access granted.',
      'Type ENTER to continue.',
    ];
    let i = 0;
    const interval = setInterval(() => {
      if (i < terminalLogs.length) {
        setLogs((logs) => [...logs, terminalLogs[i]]);
        i++;
      } else {
        clearInterval(interval);
        setStage(1);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (stage === 1) {
      const listener = (e) => {
        if (e.key === 'Enter') router.push('/portfolio');
      };
      window.addEventListener('keydown', listener);
      return () => window.removeEventListener('keydown', listener);
    }
  }, [stage, router]);

  return (
    <div style={{ background: 'black', color: 'lime', padding: '20px', height: '100vh', fontFamily: 'monospace' }}>
      {logs.map((log, idx) => (
        <div key={idx}>{log}</div>
      ))}
      {stage === 1 && <div style={{ marginTop: '20px' }}>Press ENTER to enter portfolio</div>}
    </div>
  );
}
