import dynamic from 'next/dynamic';

const UserList = dynamic(() => import('../components/UserList'), { ssr: false });

export default function Home() {
  return (
    <div>
      <UserList />
    </div>
  );
}
