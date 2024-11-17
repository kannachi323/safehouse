// /src/app/user/dashboard/page.tsx
import AuthGuard from '@/components/AuthChecker';
import UserManagerContainer from '@/containers/user-page/UserManagerContainer';

export default function Dashboard() {
  return (
    <AuthGuard>
      <UserManagerContainer node="dashboard">
        <h1 className="text-3xl">Dashboard</h1>
      </UserManagerContainer>
    </AuthGuard>
  );
}
