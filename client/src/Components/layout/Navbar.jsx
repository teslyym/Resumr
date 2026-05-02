import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, LogOut, LayoutDashboard, Plus, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Logo from "@/components/shared/Logo";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { user, logout, _devToggleAuth } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  // Links shown to logged-in users
  const authedLinks = [
    { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/create", label: "New CV", icon: Plus },
  ];

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "U";

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Logo */}
        <Logo />

        <nav className="hidden md:flex items-center gap-1">
          {user &&
            authedLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-secondary text-secondary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  }`
                }
              >
                <link.icon className="w-4 h-4" />
                {link.label}
              </NavLink>
            ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={_devToggleAuth}
            className="text-xs"
          >
            [dev] toggle auth
          </Button>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 rounded-full hover:opacity-80 transition-opacity">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="bg-primary/10 text-primary text-sm font-medium">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{user.name}</span>
                    <span className="text-xs text-muted-foreground font-normal">
                      {user.email}
                    </span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/dashboard")}>
                  <LayoutDashboard className="w-4 h-4 mr-2" />
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-destructive"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link to="/login">Sign in</Link>
              </Button>
              <Button asChild>
                <Link to="/register">Get started</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile: hamburger menu */}
        <div className="md:hidden flex items-center gap-2">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] sm:w-[320px]">
              <SheetHeader className="mb-6">
                <SheetTitle>
                  <Logo size="sm" />
                </SheetTitle>
              </SheetHeader>

              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col gap-2"
                >
                  {user ? (
                    <>
                      <div className="flex items-center gap-3 p-3 mb-2 rounded-lg bg-secondary/50">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-primary/10 text-primary font-medium">
                            {initials}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col min-w-0">
                          <span className="text-sm font-medium truncate">
                            {user.name}
                          </span>
                          <span className="text-xs text-muted-foreground truncate">
                            {user.email}
                          </span>
                        </div>
                      </div>

                      {authedLinks.map((link) => (
                        <NavLink
                          key={link.to}
                          to={link.to}
                          onClick={() => setMobileOpen(false)}
                          className={({ isActive }) =>
                            `flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                              isActive
                                ? "bg-secondary text-secondary-foreground"
                                : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                            }`
                          }
                        >
                          <link.icon className="w-4 h-4" />
                          {link.label}
                        </NavLink>
                      ))}

                      <div className="border-t my-2" />

                      <button
                        onClick={() => {
                          setMobileOpen(false);
                          handleLogout();
                        }}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Log out
                      </button>
                    </>
                  ) : (
                    <>
                      <Button
                        asChild
                        className="w-full"
                        onClick={() => setMobileOpen(false)}
                      >
                        <Link to="/register">Get started</Link>
                      </Button>
                      <Button
                        variant="outline"
                        asChild
                        className="w-full"
                        onClick={() => setMobileOpen(false)}
                      >
                        <Link to="/login">Sign in</Link>
                      </Button>
                    </>
                  )}

                  {/* Dev-only toggle */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      _devToggleAuth();
                      setMobileOpen(false);
                    }}
                    className="text-xs mt-4"
                  >
                    [dev] toggle auth
                  </Button>
                </motion.div>
              </AnimatePresence>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}
