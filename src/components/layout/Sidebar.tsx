import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BarChart, 
  ClipboardCheck, 
  ClipboardList, 
  Cog, 
  Kanban, 
  CheckSquare, 
  PieChart, 
  Database, 
  Lightbulb, 
  LineChart, 
  Settings, 
  GanttChart,
  Files,
  Eye,
  EyeOff,
  Edit
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useRole } from '@/hooks/useRole';
import { useSidebarPreferences, SIDEBAR_ITEMS } from '@/hooks/useSidebarPreferences';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavItemProps {
  to: string;
  icon: React.ElementType;
  label: string;
  active?: boolean;
  onEdit?: () => void;
  isAdmin?: boolean;
  isHidden?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ 
  to, 
  icon: Icon, 
  label, 
  active, 
  onEdit, 
  isAdmin = false,
  isHidden = false
}) => (
  <div className="flex items-center w-full">
    <Link to={to} className="flex-1">
      <Button
        variant="ghost"
        className={cn(
          "w-full justify-start gap-3 px-3 text-left font-normal",
          active ? "bg-primary/10 text-primary" : "hover:bg-primary/5",
          isHidden && "opacity-50"
        )}
      >
        <Icon className="h-5 w-5" />
        <span>{label}</span>
      </Button>
    </Link>
    {isAdmin && onEdit && (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 ml-1"
              onClick={onEdit}
            >
              <Edit className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Sichtbarkeit ändern</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )}
  </div>
);

interface SidebarProps {
  className?: string;
  isMobile?: boolean;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  className, 
  isMobile = false,
  isCollapsed = false,
  onToggleCollapse
}) => {
  const { role, loading: roleLoading } = useRole();
  const { isItemHidden, toggleItem } = useSidebarPreferences();
  const isAdmin = role === 'admin';

  const getIconForItem = (itemId: string) => {
    switch (itemId) {
      case 'dashboard': return BarChart;
      case 'pdca': return ClipboardCheck;
      case '5s': return CheckSquare;
      case 'kaizen': return Lightbulb;
      case 'valuestream': return PieChart;
      case 'kanban': return Kanban;
      case 'andon': return GanttChart;
      case 'gemba': return ClipboardList;
      case 'standards': return Files;
      case 'a3': return ClipboardList;
      case 'tpm': return Database;
      case 'settings': return Settings;
      default: return BarChart;
    }
  };

  return (
    <div
      className={cn(
        "flex h-screen flex-col border-r bg-sidebar transition-all duration-300",
        isCollapsed ? "w-[60px]" : "w-64",
        className
      )}
    >
      <div className="flex h-16 items-center border-b px-4">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <LineChart className="h-6 w-6 text-lean-blue" />
            <span className="text-xl font-semibold">LeanFlow</span>
          </div>
        )}
        {isCollapsed && (
          <LineChart className="h-6 w-6 mx-auto text-lean-blue" />
        )}
      </div>

      <div className="flex-1 overflow-auto py-2">
        <div className="space-y-1 px-2">
          {!isCollapsed ? (
            <>
              <div className="mb-2 px-3 text-xs font-medium text-muted-foreground">
                Übersicht
              </div>
              {SIDEBAR_ITEMS.filter(item => item.id === 'dashboard' || item.id === 'pdca').map(item => {
                const isHidden = isItemHidden(item.id);
                if (isHidden && !isAdmin) return null;
                return (
                  <NavItem 
                    key={item.id}
                    to={item.path}
                    icon={getIconForItem(item.id)}
                    label={item.label}
                    active={item.path === '/'}
                    isAdmin={isAdmin}
                    isHidden={isHidden}
                    onEdit={() => {
                      if (isAdmin) {
                        toggleItem(item.id, !isHidden);
                      }
                    }}
                  />
                );
              })}
              
              <div className="my-2 px-3 text-xs font-medium text-muted-foreground">
                Methoden
              </div>
              {SIDEBAR_ITEMS.filter(item => 
                ['5s', 'kaizen', 'valuestream', 'kanban', 'andon', 'gemba', 'standards', 'a3', 'tpm'].includes(item.id)
              ).map(item => {
                const isHidden = isItemHidden(item.id);
                if (isHidden && !isAdmin) return null;
                return (
                  <NavItem 
                    key={item.id}
                    to={item.path}
                    icon={getIconForItem(item.id)}
                    label={item.label}
                    isAdmin={isAdmin}
                    isHidden={isHidden}
                    onEdit={() => {
                      if (isAdmin) {
                        toggleItem(item.id, !isHidden);
                      }
                    }}
                  />
                );
              })}
              
              <div className="my-2 px-3 text-xs font-medium text-muted-foreground">
                System
              </div>
              {SIDEBAR_ITEMS.filter(item => item.id === 'settings').map(item => {
                const isHidden = isItemHidden(item.id);
                if (isHidden && !isAdmin) return null;
                return (
                  <NavItem 
                    key={item.id}
                    to={item.path}
                    icon={getIconForItem(item.id)}
                    label={item.label}
                    isAdmin={isAdmin}
                    isHidden={isHidden}
                    onEdit={() => {
                      if (isAdmin) {
                        toggleItem(item.id, !isHidden);
                      }
                    }}
                  />
                );
              })}
              
              {isAdmin && (
                <div className="mt-4 px-3">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full flex items-center justify-between"
                      >
                        <span>Menü verwalten</span>
                        <Edit className="h-4 w-4 ml-2" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      {SIDEBAR_ITEMS.map(item => {
                        const isHidden = isItemHidden(item.id);
                        return (
                          <DropdownMenuItem 
                            key={item.id}
                            onClick={() => toggleItem(item.id, !isHidden)}
                            className="flex items-center justify-between"
                          >
                            <span>{item.label}</span>
                            {isHidden ? (
                              <EyeOff className="h-4 w-4 ml-2" />
                            ) : (
                              <Eye className="h-4 w-4 ml-2" />
                            )}
                          </DropdownMenuItem>
                        );
                      })}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              )}
            </>
          ) : (
            <>
              {SIDEBAR_ITEMS.filter(item => {
                const isHidden = isItemHidden(item.id);
                return !isHidden || isAdmin;
              }).map(item => (
                <div key={item.id} className="flex justify-center py-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link to={item.path}>
                          <Button
                            variant="ghost"
                            size="icon"
                            className={cn(
                              "h-10 w-10",
                              isItemHidden(item.id) && "opacity-50"
                            )}
                          >
                            {React.createElement(getIconForItem(item.id), { className: "h-5 w-5" })}
                          </Button>
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        <p>{item.label}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
      
      <div className="border-t p-2">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onToggleCollapse}
          className="w-full justify-center"
        >
          <Cog className="h-5 w-5" />
          {!isCollapsed && <span className="ml-2">Menü einklappen</span>}
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
