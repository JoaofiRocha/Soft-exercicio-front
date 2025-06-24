'use client'

import { useRouter } from 'next/navigation';
import '@ant-design/v5-patch-for-react-19';

export default function Home() {
  const router = useRouter();

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
