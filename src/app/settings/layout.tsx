'use client';

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { usePathname, useRouter } from 'next/navigation';
import ProfileSettingsPage from './profile/page';
import AccountSettingsPage from './account/page';
import AppearanceSettingsPage from './appearance/page';
import NotificationsSettingsPage from './notifications/page';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

const settingsTabs = [
  {
    title: 'Профиль',
    value: 'profile',
    href: '/settings/profile',
    component: <ProfileSettingsPage />,
  },
  {
    title: 'Аккаунт',
    value: 'account',
    href: '/settings/account',
    component: <AccountSettingsPage />,
  },
  {
    title: 'Внешний вид',
    value: 'appearance',
    href: '/settings/appearance',
    component: <AppearanceSettingsPage />,
  },
  {
    title: 'Уведомления',
    value: 'notifications',
    href: '/settings/notifications',
    component: <NotificationsSettingsPage />,
  },
];

export default function SettingsLayout() {
  const pathname = usePathname();
  const router = useRouter();
  const activeTab =
    settingsTabs.find((tab) => pathname.includes(tab.value))?.value ||
    'profile';

  const onTabChange = (value: string) => {
    const href = settingsTabs.find((tab) => tab.value === value)?.href;
    if (href) {
      router.push(href);
    }
  };

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="space-y-6">
        <div className="space-y-0.5">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Настройки
          </h1>
          <p className="text-muted-foreground">
            Управляйте настройками своего аккаунта и сайта.
          </p>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={onTabChange}
          className="flex flex-col gap-8 md:flex-row"
        >
          <div className="w-full md:w-1/5">
            <ScrollArea className="w-full">
              <TabsList className="flex h-full w-full flex-row items-start justify-start p-1 md:flex-col md:bg-transparent">
                {settingsTabs.map((tab) => (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className="w-full justify-start data-[state=active]:bg-muted data-[state=active]:shadow-none md:bg-transparent md:data-[state=active]:bg-muted"
                  >
                    {tab.title}
                  </TabsTrigger>
                ))}
              </TabsList>
              <ScrollBar orientation="horizontal" className="md:hidden" />
            </ScrollArea>
          </div>

          <div className="flex-1 lg:max-w-4xl">
            {settingsTabs.map((tab) => (
              <TabsContent key={tab.value} value={tab.value}>
                {tab.component}
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </div>
    </div>
  );
}
