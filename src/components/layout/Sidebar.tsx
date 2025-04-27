
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
  Files
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface NavItemProps {
  to: string;
  icon: React.ElementType;
  label: string;
  active?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon: Icon, label, active }) => (
  <Link to={to}>
    <Button
      variant="ghost"
      className={cn(
        "w-full justify-start gap-3 px-3 text-left font-normal",
        active ? "bg-primary/10 text-primary" : "hover:bg-primary/5"
      )}
    >
      <Icon className="h-5 w-5" />
      <span>{label}</span>
    </Button>
  </Link>
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
              <NavItem to="/" icon={BarChart} label="Dashboard" active />
              <NavItem to="/pdca" icon={ClipboardCheck} label="PDCA-Zyklus" />
              
              <div className="my-2 px-3 text-xs font-medium text-muted-foreground">
                Methoden
              </div>
              <NavItem to="/5s" icon={CheckSquare} label="5S Checklisten" />
              <NavItem to="/kaizen" icon={Lightbulb} label="Kaizen-Board" />
              <NavItem to="/valuestream" icon={PieChart} label="Wertstromanalyse" />
              <NavItem to="/kanban" icon={Kanban} label="Kanban-Boards" />
              <NavItem to="/andon" icon={GanttChart} label="Andon-Board" />
              <NavItem to="/gemba" icon={ClipboardList} label="Gemba Walks" />
              <NavItem to="/standards" icon={Files} label="Standard Work" />
              <NavItem to="/a3" icon={ClipboardList} label="A3-Reports" />
              <NavItem to="/tpm" icon={Database} label="TPM-Board" />
              
              <div className="my-2 px-3 text-xs font-medium text-muted-foreground">
                System
              </div>
              <NavItem to="/settings" icon={Settings} label="Einstellungen" />
            </>
          ) : (
            <>
              <div className="flex justify-center py-2">
                <NavItem to="/" icon={BarChart} label="" />
              </div>
              <div className="flex justify-center py-2">
                <NavItem to="/pdca" icon={ClipboardCheck} label="" />
              </div>
              <div className="flex justify-center py-2">
                <NavItem to="/5s" icon={CheckSquare} label="" />
              </div>
              <div className="flex justify-center py-2">
                <NavItem to="/kaizen" icon={Lightbulb} label="" />
              </div>
              <div className="flex justify-center py-2">
                <NavItem to="/valuestream" icon={PieChart} label="" />
              </div>
              <div className="flex justify-center py-2">
                <NavItem to="/kanban" icon={Kanban} label="" />
              </div>
              <div className="flex justify-center py-2">
                <NavItem to="/andon" icon={GanttChart} label="" />
              </div>
              <div className="flex justify-center py-2">
                <NavItem to="/gemba" icon={ClipboardList} label="" />
              </div>
              <div className="flex justify-center py-2">
                <NavItem to="/standards" icon={Files} label="" />
              </div>
              <div className="flex justify-center py-2">
                <NavItem to="/a3" icon={ClipboardList} label="" />
              </div>
              <div className="flex justify-center py-2">
                <NavItem to="/tpm" icon={Database} label="" />
              </div>
              <div className="flex justify-center py-2">
                <NavItem to="/settings" icon={Settings} label="" />
              </div>
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
