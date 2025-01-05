import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, CreditCard, Banknote, X } from 'lucide-react';
import { ROUTES } from '../../../lib/constants';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: ROUTES.DASHBOARD.ROOT, icon: Home },
    { name: 'Loans', href: ROUTES.DASHBOARD.LOANS, icon: Banknote },
    {
      name: 'Transactions',
      href: ROUTES.DASHBOARD.TRANSACTIONS,
      icon: CreditCard,
    },
  ];

  const isSmallScreen = () => window.innerWidth < 768;

  const handleCloseSidebar = () => {
    if (isSmallScreen()) setIsOpen(false);
  };

  const isActive = (href: string) => location.pathname === `/${href}`;

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity xl:hidden ${
          isOpen ? 'opacity-100 z-40' : 'opacity-0 z-[-1]'
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 z-50 left-0 flex flex-col bg-white w-64 transform transition-transform md:translate-x-0 md:relative md:flex ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between h-16 px-4">
          <span className="text-xl font-semibold">Fintech John</span>
          <button
            type="button"
            className="md:hidden"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 py-4 space-y-1">
          {navigation.map((item) => {
            const active = isActive(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={`/${item.href}`}
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                  active
                    ? 'bg-blue-100 text-blue-900'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
                onClick={handleCloseSidebar}
              >
                <Icon
                  className={`mr-3 h-6 w-6 ${
                    active ? 'text-blue-500' : 'text-gray-400'
                  }`}
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
