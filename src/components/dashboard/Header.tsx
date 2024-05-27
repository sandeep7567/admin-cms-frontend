import { CircleUser, LucideIcon, Menu } from "lucide-react";
import React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { PopoverTrigger } from "@/components/ui/popover";

import { User } from "@/types";
import { NavLink } from "./Sidebar";

// const groups = [
//   {
//     label: "Personal Account",
//     teams: [
//       {
//         label: "Alicia Koch",
//         value: "personal",
//       },
//     ],
//   },
//   {
//     label: "Teams",
//     teams: [
//       {
//         label: "Acme Inc.",
//         value: "acme-inc",
//       },
//       {
//         label: "Monsters Inc.",
//         value: "monsters",
//       },
//     ],
//   },
// ];

export interface TeamSwitcherProps extends PopoverTriggerProps {}

// type Team = (typeof groups)[number]["teams"][number];

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface NavLinkProps {
  to: string;
  icon: LucideIcon;
  label: string;
  badgeCount?: number;
  active: boolean;
}
interface HeaderProps {
  user: User;
  handleLogout: () => void;
  showNewTeamDialog: boolean;
  setShowNewTeamDialog: (show: boolean) => void;
  navLinks: NavLinkProps[];
  disabled: boolean;
}

const Header: React.FC<HeaderProps> = ({
  user,
  handleLogout,
  // showNewTeamDialog,
  // setShowNewTeamDialog,
  navLinks,
  disabled,
}) => {
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <nav className="grid gap-2 text-lg font-medium">
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
        </SheetContent>
      </Sheet>
      <div className="w-full flex-1"></div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon" className="rounded-full">
            <CircleUser className="h-5 w-5" />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            {user.firstName + " " + user.lastName}
          </DropdownMenuItem>
          <DropdownMenuItem>{user?.email}</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={handleLogout}
            className="cursor-pointer"
            disabled={disabled}
          >
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};

export default Header;
