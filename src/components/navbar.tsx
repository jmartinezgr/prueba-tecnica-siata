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

import { siteConfig } from "@/config/site";
import { Logo } from "@/components/icons";
import { useAuth } from "@/hooks/useAuth";

//TODO: Modificar la logica para los estados globales reales y links reales
export const Navbar = () => {
  const { user, isAuth, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <HeroUINavbar maxWidth="2xl" position="sticky">
      <NavbarBrand className="gap-3 max-w-fit">
        <Link
          className="flex justify-start items-center gap-1"
          color="foreground"
          href="/"
        >
          <Logo />
          <p className="font-bold text-inherit">{siteConfig.name}</p>
        </Link>
      </NavbarBrand>
      {isAuth && (
        <NavbarContent className="basis-1/5 sm:basis-full" justify="center">
          <div className="hidden lg:flex gap-4 justify-start ml-2">
            {siteConfig.privateNavItems.map((item) => (
              <NavbarItem key={item.href}>
                <Link color="foreground" href={item.href}>
                  {item.label}
                </Link>
              </NavbarItem>
            ))}
          </div>
        </NavbarContent>
      )}

      <NavbarContent as="div" justify="end">
        {isAuth ? (
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform hidden sm:block"
                color="secondary"
                name="Jason Hughes"
                size="sm"
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Sesion iniciada con</p>
                <p className="font-semibold">{user?.email}</p>
              </DropdownItem>
              <DropdownItem key="logout" color="danger" onPress={logout}>
                Cerrar Sesión
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        ) : (
          <>
            <NavbarItem className="hidden lg:flex">
              <Button
                className="hidden lg:flex"
                color="primary"
                variant="flat"
                onPress={() => navigate("/login")}
              >
                Iniciar Sesión
              </Button>
            </NavbarItem>
            <NavbarItem>
              <Button
                className="hidden lg:flex"
                color="primary"
                variant="bordered"
                onPress={() => navigate("/register")}
              >
                Registrarse
              </Button>
            </NavbarItem>
          </>
        )}
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {isAuth &&
            siteConfig.privateNavItems.map((item, index) => (
              <NavbarMenuItem key={`${item.href}-${index}`}>
                <Link color="foreground" href={item.href} size="lg">
                  {item.label}
                </Link>
              </NavbarMenuItem>
            ))}

          {isAuth && (
            <>
              <hr className="my-2 border-gray-300" />
              <div className="flex flex-col gap-1">
                <p className="text-sm font-semibold">Signed in as</p>
                <p className="text-sm text-default-500">{user?.email}</p>
              </div>
            </>
          )}
          {isAuth ? (
            <NavbarMenuItem onClick={logout}>Cerrar Sesión</NavbarMenuItem>
          ) : (
            <>
              <NavbarMenuItem>
                <Link color="foreground" href="/login" size="lg">
                  Iniciar Sesión
                </Link>
              </NavbarMenuItem>
              <NavbarMenuItem>
                <Link color="foreground" href="/register" size="lg">
                  Registrarse
                </Link>
              </NavbarMenuItem>
            </>
          )}
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
