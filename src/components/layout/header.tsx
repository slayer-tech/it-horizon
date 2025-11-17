"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Layers, Menu, Search, User as UserIcon, PenSquare } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useEffect, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

const navLinks = [
  { href: "/", label: "Статьи" },
  { href: "/questions", label: "Вопросы" },
]

function MobileNav() {
    const pathname = usePathname();
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    if (!isClient) {
        return null;
    }

    return (
        <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="px-6 pt-6">
              <Link href="/" className="mb-6 flex items-center space-x-2">
                <Layers className="h-6 w-6 text-primary" />
                <span className="font-bold">
                  IT Horizon
                </span>
              </Link>
              <div className="flex flex-col space-y-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "text-lg font-medium transition-colors hover:text-primary",
                      pathname.startsWith(link.href) && (link.href !== '/' || pathname === '/')
                        ? "text-primary"
                        : "text-muted-foreground"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
    )
}

export function Header() {
  const pathname = usePathname()

  const NavLinks = ({ className }: { className?: string }) => (
    <nav className={cn("items-center space-x-4 lg:space-x-6", className)}>
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            pathname.startsWith(link.href) && (link.href !== '/' || pathname === '/')
              ? "text-primary"
              : "text-muted-foreground"
          )}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-7xl items-center px-4 sm:px-6 lg:px-8">
        <div className="mr-4 flex items-center md:mr-6">
            <MobileNav />
            <Link href="/" className="flex items-center space-x-2">
                <Layers className="h-6 w-6 text-primary" />
                <span className="hidden font-bold sm:inline-block">
                IT Horizon
                </span>
            </Link>
            <NavLinks className="hidden md:flex md:ml-6" />
        </div>

        <div className="flex flex-1 items-center justify-end space-x-2">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <form>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Поиск..."
                  className="pl-8 sm:w-40 md:w-64"
                />
              </div>
            </form>
          </div>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2">
                   <PenSquare />
                   <span className="hidden sm:inline">Создать</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                    <Link href="/create/post">Статью</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href="/questions/ask">Вопрос</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                      <AvatarImage src="https://images.unsplash.com/photo-1693039537350-3bba6975add7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxwZXJzb24lMjBmYWNlfGVufDB8fHx8MTc2MzMxMDAyMHww&ixlib=rb-4.1.0&q=80&w=1080" alt="Алексей Вольнов" />
                      <AvatarFallback>АВ</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">Алексей Вольнов</p>
                        <p className="text-xs leading-none text-muted-foreground">
                            alex@example.com
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                        <Link href="/profile/me">Профиль</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href="/settings/profile">Настройки</Link>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Выйти</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  )
}
