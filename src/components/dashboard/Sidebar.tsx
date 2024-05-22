import { Link } from "react-router-dom";
import { Bell, Package2, LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "../ui/button";
interface NavLinkProps {
  to: string;
  icon: LucideIcon;
  label: string;
  badgeCount?: number;
  active: boolean;
}

interface SidebarProps {
  navLinks: NavLinkProps[];
}

const Sidebar: React.FC<SidebarProps> = ({ navLinks }) => {
  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <Package2 className="h-6 w-6" />
            <span className="">Acme Inc</span>
          </Link>
          <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {navLinks.map((link, index) => (
              <NavLink
                key={index}
                to={link.to}
                icon={link.icon}
                label={link.label}
                badgeCount={link.badgeCount}
                active={link.active}
              />
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

interface NavLinkProps {
  to: string;
  icon: LucideIcon;
  label: string;
  badgeCount?: number;
  active: boolean;
}

export const NavLink = ({
  to,
  icon: Icon,
  label,
  badgeCount,
  active,
}: NavLinkProps) => (
  <Link
    to={to}
    className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
      active ? "bg-muted text-primary" : "text-muted-foreground"
    }`}
  >
    <Icon className="h-4 w-4" />
    {label}
    {badgeCount && (
      <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
        {badgeCount}
      </Badge>
    )}
  </Link>
);

export default Sidebar;
