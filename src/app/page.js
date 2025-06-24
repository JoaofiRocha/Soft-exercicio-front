'use client'

import { useRouter } from 'next/navigation';
import '@ant-design/v5-patch-for-react-19';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();


  useEffect(() => {
    router.push('/login');
  }, [router]);

  return (
    <div>
      <main>
        <button type="button" onClick={() => router.push('/login')}>
          Click me
        </button>


      </main>
    </div>
  );
}
