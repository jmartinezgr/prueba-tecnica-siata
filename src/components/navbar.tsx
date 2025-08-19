import { Link } from "@heroui/link";
import {
  Navbar as HeroUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/navbar";
import {
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Button,
} from "@heroui/react";
import { useNavigate } from "react-router-dom";
import { IconLogout } from "@tabler/icons-react";

import WarningActionModal from "./stations/WarningActionModal";

import { siteConfig } from "@/config/site";
import { Logo } from "@/components/icons";
import { useAuth } from "@/hooks/useAuth";
import { useWarningModal } from "@/hooks/stations/useWarningModal";

export const Navbar = () => {
  const { user, isAuth, logout } = useAuth();
  const navigate = useNavigate();
  const logoutModal = useWarningModal();

  return (
    <HeroUINavbar
      isBordered
      className="bg-background/95 backdrop-blur-md border-divider/50"
      classNames={{
        wrapper: "px-4 sm:px-6",
        brand: "flex-grow-0",
        content: "flex-1",
      }}
      maxWidth="2xl"
      position="sticky"
    >
      {/* Brand Section */}
      <NavbarBrand className="gap-3 max-w-fit">
        <Link
          className="flex justify-start items-center gap-2 transition-all duration-200 hover:opacity-80 hover:scale-[1.02]"
          color="foreground"
          href="/"
        >
          <Logo className="text-primary" />
          <p className="font-bold text-inherit bg-gradient-to-r from-primary to-secondary bg-clip-text">
            {siteConfig.name}
          </p>
        </Link>
      </NavbarBrand>

      {/* Desktop Navigation Items */}
      {isAuth && (
        <NavbarContent className="basis-1/5 sm:basis-full" justify="center">
          <div className="hidden sm:flex gap-2 justify-start ml-4">
            {siteConfig.privateNavItems.map((item) => (
              <NavbarItem key={item.href}>
                <Link
                  className="relative px-3 py-2 rounded-lg transition-all duration-200 hover:bg-default-100 hover:text-primary font-medium text-sm group"
                  color="foreground"
                  href={item.href}
                >
                  {item.label}
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-center" />
                </Link>
              </NavbarItem>
            ))}
          </div>
        </NavbarContent>
      )}

      {/* User Actions */}
      <NavbarContent as="div" className="gap-3" justify="end">
        {isAuth ? (
          <Dropdown
            classNames={{
              content:
                "border border-divider/50 bg-background/95 backdrop-blur-md shadow-lg",
            }}
            placement="bottom-end"
          >
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="hidden sm:block transition-all duration-200 hover:scale-110 hover:shadow-lg ring-2 ring-transparent hover:ring-primary/20 "
                classNames={{
                  base: "ring-offset-2 ring-offset-background",
                  img: "object-cover",
                }}
                color="primary"
                name={user?.firstName || user?.email?.charAt(0).toUpperCase()}
                size="sm"
                src={`https://api.dicebear.com/7.x/initials/svg?seed=${user?.email}`}
              />
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Profile Actions"
              classNames={{
                list: "gap-1 p-2",
                base: "w-64",
              }}
              variant="flat"
            >
              <DropdownItem
                key="profile"
                className="h-16 gap-2 rounded-lg bg-gradient-to-r from-primary/10 to-secondary/10 border border-divider/30"
                textValue="User Profile"
              >
                <div className="flex items-center gap-3">
                  <Avatar
                    className="ring-2 ring-primary/20"
                    name={
                      user?.firstName || user?.email?.charAt(0).toUpperCase()
                    }
                    size="sm"
                    src={`https://api.dicebear.com/7.x/initials/svg?seed=${user?.email}`}
                  />
                  <div className="flex flex-col">
                    <p className="text-sm font-semibold text-foreground">
                      {user?.firstName || "Usuario"}
                    </p>
                    <p className="text-xs text-default-500 truncate">
                      {user?.email}
                    </p>
                  </div>
                </div>
              </DropdownItem>
              <DropdownItem
                key="logout"
                className="rounded-lg hover:bg-danger/10 transition-colors"
                color="danger"
                startContent={<IconLogout />}
                onPress={logoutModal.openModal}
              >
                Cerrar Sesión
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        ) : (
          <>
            <NavbarItem className="hidden sm:flex">
              <Button
                className="hidden lg:flex"
                color="primary"
                size="sm"
                variant="ghost"
                onPress={() => navigate("/login")}
              >
                Iniciar Sesión
              </Button>
            </NavbarItem>
            <NavbarItem className="hidden sm:flex">
              <Button
                className="hidden lg:flex"
                color="primary"
                size="sm"
                variant="ghost"
                onPress={() => navigate("/register")}
              >
                Registrarse
              </Button>
            </NavbarItem>
          </>
        )}
      </NavbarContent>

      {/* Mobile Menu Toggle */}
      <NavbarContent className="sm:hidden basis-1 pl-2" justify="end">
        <NavbarMenuToggle className="text-foreground hover:text-primary transition-colors duration-200" />
      </NavbarContent>

      {/* Mobile Menu */}
      <NavbarMenu className="bg-background/95 backdrop-blur-md border-t border-divider/50 gap-1">
        <div className="mx-4 mt-4 flex flex-col gap-3">
          {/* User Info Section (Mobile) */}
          {isAuth && (
            <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-primary/5 to-secondary/5 border border-divider/30 mb-2">
              <Avatar
                className="ring-2 ring-primary/20"
                name={user?.firstName || user?.email?.charAt(0).toUpperCase()}
                size="md"
                src={`https://api.dicebear.com/7.x/initials/svg?seed=${user?.email}`}
              />
              <div className="flex flex-col">
                <p className="text-sm font-semibold text-foreground">
                  {user?.firstName || "Usuario"}
                </p>
                <p className="text-xs text-default-500">{user?.email}</p>
              </div>
            </div>
          )}

          {/* Navigation Links (Mobile) */}
          {isAuth &&
            siteConfig.privateNavItems.map((item, index) => (
              <NavbarMenuItem key={`${item.href}-${index}`}>
                <Link
                  className="block w-full p-3 rounded-lg hover:bg-default-100 transition-colors font-medium"
                  color="foreground"
                  href={item.href}
                  size="lg"
                >
                  {item.label}
                </Link>
              </NavbarMenuItem>
            ))}

          {/* Divider */}
          {isAuth && <hr className="my-2 border-divider/30" />}

          {/* Auth Actions (Mobile) */}
          {isAuth ? (
            <NavbarMenuItem>
              <button
                className="flex items-center gap-2 w-full p-3 rounded-lg text-danger hover:bg-danger/10 transition-colors font-medium text-left"
                onClick={logoutModal.openModal}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                </svg>
                Cerrar Sesión
              </button>
            </NavbarMenuItem>
          ) : (
            <>
              <NavbarMenuItem>
                <Link
                  className="block w-full p-3 rounded-lg hover:bg-default-100 transition-colors font-medium"
                  color="foreground"
                  href="/login"
                  size="lg"
                >
                  Iniciar Sesión
                </Link>
              </NavbarMenuItem>
              <NavbarMenuItem>
                <Link
                  className="block w-full p-3 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors font-medium text-center"
                  color="primary"
                  href="/register"
                  size="lg"
                >
                  Registrarse
                </Link>
              </NavbarMenuItem>
            </>
          )}
        </div>
      </NavbarMenu>
      <WarningActionModal
        body={`¿Estás seguro de cerrar tu sesión?"`}
        cancelText="Cancelar"
        confirmColor="danger"
        confirmText="Sí, cerrar sesión"
        icon={<IconLogout className="text-danger" size={32} />}
        isOpen={logoutModal.isOpen}
        title="Cerrar sesión"
        onClose={logoutModal.closeModal}
        onConfirm={logout}
      />
    </HeroUINavbar>
  );
};
