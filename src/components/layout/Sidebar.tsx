import { 
  LayoutDashboard, 
  Store, 
  Package, 
  BarChart3, 
  CreditCard, 
  Shield,
  Send,
  FileCheck,
  Settings,
  MessageSquare,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { canAccessPage, getUser } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isOpen: boolean;
  onClose: () => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

const allMenuItems = [
  { id: 'dashboard', label: 'Bosh sahifa', icon: LayoutDashboard, path: '/dashboard', permission: 'dashboard' },
  { id: 'moderation', label: 'Moderatiya', icon: FileCheck, path: '/moderation', permission: 'moderation' },
  { id: 'stores', label: 'Do\'konlar', icon: Store, path: '/stores', permission: 'stores' },
  { id: 'products', label: 'Mahsulotlar', icon: Package, path: '/products', permission: 'products' },
  { id: 'analytics', label: 'Analitika', icon: BarChart3, path: '/analytics', permission: 'analytics' },
  { id: 'subscriptions', label: 'Obunalar', icon: CreditCard, path: '/subscriptions', permission: 'subscriptions' },
  { id: 'support', label: 'Chat / Support', icon: MessageSquare, path: '/support', permission: 'support' },
  { id: 'roles', label: 'Rollar va Ruxsatlar', icon: Shield, path: '/roles', permission: 'roles' },
  { id: 'broadcast', label: 'Broadcast Xabarlar', icon: Send, path: '/broadcast', permission: 'broadcast' },
  { id: 'settings', label: 'Sozlamalar', icon: Settings, path: '/settings', permission: 'settings' },
];

export function Sidebar({ activeTab, onTabChange, isOpen, onClose, isCollapsed, onToggleCollapse }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const user = getUser();

  // Filter menu items based on user role and permissions
  const menuItems = allMenuItems.filter(item => {
    // Super admin sees everything
    if (user.role === 'super_admin') {
      return true;
    }
    
    // Check if user has permission for this menu item
    return canAccessPage(item.permission);
  });

  const handleNavigation = (tab: string, path: string) => {
    onTabChange(tab);
    navigate(path);
    onClose();
  };

  const isActive = (path: string) => {
    if (path === '/stores') {
      return location.pathname === path || location.pathname.startsWith('/stores/');
    }
    return location.pathname === path;
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside className={cn(
        "fixed lg:static inset-y-0 left-0 z-50 min-h-screen bg-card border-r border-border flex flex-col transform transition-all duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full",
        "lg:translate-x-0",
        isCollapsed ? "lg:w-20" : "lg:w-64",
        "w-64"
      )}>
      <div className="p-6 border-b border-border relative">
        <div className={cn(
          "flex items-center transition-all duration-300",
          isCollapsed ? "lg:justify-center" : "gap-3"
        )}>
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Store className="w-6 h-6 text-primary" />
          </div>
          <div className={cn(
            "transition-all duration-300 overflow-hidden",
            isCollapsed ? "lg:w-0 lg:opacity-0" : "w-auto opacity-100"
          )}>
            <h1 className="text-xl font-bold text-foreground whitespace-nowrap">okam.uz</h1>
            <p className="text-xs text-muted-foreground whitespace-nowrap">Super Admin</p>
          </div>
        </div>
        {/* Toggle Button - Desktop only */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleCollapse}
          className="hidden lg:flex absolute -right-3 top-6 w-6 h-6 rounded-full bg-card border border-border shadow-md hover:bg-muted z-10"
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </Button>
      </div>

      <nav className="flex-1 p-4 space-y-1 scrollbar-thin overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          return (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.id, item.path)}
              title={isCollapsed ? item.label : undefined}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 text-sm font-medium relative group",
                active
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                isCollapsed && "lg:justify-center lg:px-2"
              )}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <span className={cn(
                "transition-all duration-300 overflow-hidden whitespace-nowrap",
                isCollapsed ? "lg:w-0 lg:opacity-0" : "w-auto opacity-100"
              )}>
                {item.label}
              </span>
              {/* Tooltip for collapsed state */}
              {isCollapsed && (
                <div className="hidden lg:block absolute left-full ml-2 px-3 py-2 bg-popover text-popover-foreground text-sm rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 border border-border">
                  {item.label}
                </div>
              )}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <div className={cn(
          "p-4 rounded-lg bg-muted transition-all duration-300",
          isCollapsed && "lg:p-2 lg:flex lg:justify-center"
        )}>
          {isCollapsed ? (
            <div className="hidden lg:flex w-8 h-8 rounded-full bg-primary text-primary-foreground items-center justify-center font-bold text-sm">
              {user.name.charAt(0)}
            </div>
          ) : (
            <>
              <p className="text-xs text-muted-foreground mb-1">Tizimga kirgan</p>
              <p className="text-sm font-medium text-foreground">{user.name}</p>
              <p className="text-xs text-muted-foreground">{user.email}</p>
              <Badge className="mt-2 text-xs bg-primary/10 text-primary border-primary/20">
                {user.roleLabel}
              </Badge>
            </>
          )}
        </div>
      </div>
    </aside>
    </>
  );
}
