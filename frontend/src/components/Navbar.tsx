import { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  // GitHubLogoIcon,
  HamburgerMenuIcon,
} from "@radix-ui/react-icons";
import { buttonVariants } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { Link } from "react-router-dom";

interface RouteProps {
  href: string;
  label: string;
}

const routeList: RouteProps[] = [
  {
    href: "#about",
    label: "About",
  },
  {
    href: "#features",
    label: "Features",
  },
  {
    href: "#testimonials",
    label: "Testimonials",
  },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const token = localStorage.getItem("token");

  return (
    <header className="sticky border-b-[1px] top-0 z-40 w-full bg-white dark:border-b-slate-700 dark:bg-background">
      <NavigationMenu className="mx-auto">
        <NavigationMenuList className="container h-14 px-4 w-screen flex justify-between ">
          <NavigationMenuItem className="font-bold flex mr-auto">
            <Link to="/" className="ml-2 font-extrabold text-xl flex">
              HealthBuddy
            </Link>
          </NavigationMenuItem>

          {/* mobile */}
          <span className="flex md:hidden">
            <ModeToggle />

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger className="px-2">
                <HamburgerMenuIcon
                  className="flex md:hidden h-5 w-5"
                  onClick={() => setIsOpen(true)}>
                  {/* <span className="sr-only">Menu Icon</span> */}
                </HamburgerMenuIcon>
              </SheetTrigger>

              <SheetContent side={"left"}>
                <SheetHeader>
                  <SheetTitle className="font-bold text-xl">
                    HealthBuddy
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col justify-center items-center gap-2 mt-4">
                  {routeList.map(({ href, label }: RouteProps) => (
                    <a
                      key={label}
                      href={href}
                      onClick={() => setIsOpen(false)}
                      className={buttonVariants({ variant: "ghost" })}>
                      {label}
                    </a>
                  ))}
                  {/* <a
                    href="https://github.com/Cobol-Tech/Main"
                    target="_blank"
                    className={`w-[110px] border ${buttonVariants({
                      variant: "secondary",
                    })}`}>
                    <GitHubLogoIcon className="mr-2 w-5 h-5" />
                    Github
                  </a> */}

                  {token ? (
                    <>
                      <Link
                        to="/dashboard"
                        className={`border ${buttonVariants({
                          variant: "default",
                        })}`}>
                        Dashboard
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/signup"
                        className={`border ${buttonVariants({
                          variant: "default",
                        })}`}>
                        Sign Up
                      </Link>
                      <Link
                        to="/login"
                        className={`border ${buttonVariants({
                          variant: "secondary",
                        })}`}>
                        Login
                      </Link>
                    </>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </span>

          {/* desktop */}
          <nav className="hidden md:flex gap-2">
            {routeList.map((route: RouteProps, i) => (
              <a
                href={route.href}
                key={i}
                className={`text-[17px] ${buttonVariants({
                  variant: "link",
                })}`}>
                {route.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex gap-2">
            <ModeToggle />
            {/* <a
              href="https://github.com/Cobol-Tech/Main"
              target="_blank"
              className={`border ${buttonVariants({ variant: "secondary" })}`}>
              <GitHubLogoIcon className="mr-2 w-5 h-5" />
              Github
            </a> */}
            {token ? (
              <>
                <Link
                  to="/dashboard"
                  className={`border ${buttonVariants({
                    variant: "default",
                  })}`}>
                  Dashboard
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/signup"
                  className={`border ${buttonVariants({
                    variant: "default",
                  })}`}>
                  Sign Up
                </Link>
                <Link
                  to="/login"
                  className={`border ${buttonVariants({
                    variant: "secondary",
                  })}`}>
                  Login
                </Link>
              </>
            )}
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};
