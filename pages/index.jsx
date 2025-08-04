'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const [text, setText] = useState('');
  const [stage, setStage] = useState(0);
  const router = useRouter();

  const loadingLines = [
    'Initializing terminal...\n',
    'Loading project modules...\n',
    'Authenticating user...\n',
    'Access granted.\n',
    'Welcome to swaify.com\n\n',
    'Press Enter to continue...'
  ];

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(prev => prev + loadingLines[i]);
      i++;
      if (i === loadingLines.length) {
        clearInterval(interval);
        setStage(1);
      }
    }, 700);
  }, []);

  useEffect(() => {
    if (stage === 1) {
      const listener = (e: KeyboardEvent) => {
        if (e.key === 'Enter') router.push('/portfolio');
      };
      window.addEventListener('keydown', listener);
      return () => window.removeEventListener('keydown', listener);
    }
  }, [stage]);

  return (
    <main className="bg-black text-green-500 h-screen flex items-center justify-center">
      <pre className="text-sm md:text-base whitespace-pre-wrap">{text}</pre>
    </main>
  );
}
