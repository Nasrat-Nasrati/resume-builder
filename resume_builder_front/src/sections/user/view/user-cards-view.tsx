import type { IUserAPI, IUserCard } from 'src/types/user';

import { useState, useEffect } from 'react';

import Button from '@mui/material/Button';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { getAllUsers } from 'src/auth/context/jwt/user-action';

import { UserCardList } from '../user-card-list';

// ----------------------------------------------------------------------

export function UserCardsView() {
  const [users, setUsers] = useState<IUserCard[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data: IUserAPI[] = await getAllUsers();
        const formatted: IUserCard[] = data.map((user) => ({
          id: user.id,
          name: `${user.firstname || ''} ${user.lastname || ''}`,
          role: user.position || '—',
          coverUrl: '',
          // avatarUrl: user.profileImage
          //   ? user.profileImage.replaceAll('\\', '/')
          //   : '/assets/images/avatars/default_avatar.jpg',
          totalFollowers: 0,
          totalPosts: 0,
          totalFollowing: 0,
        }));

        setUsers(formatted);
      } catch (error) {
        console.error('Failed to fetch:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="User cards"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'User', href: paths.dashboard.user.root },
          { name: 'Cards' },
        ]}
        action={
          <Button
            component={RouterLink}
            href={paths.dashboard.user.new}
            variant="contained"
            startIcon={<Iconify icon="mingcute:add-line" />}
          >
            New user
          </Button>
        }
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      {/* <UserCardList users={_userCards} /> */}
      <UserCardList users={users} />
    </DashboardContent>
  );
}
