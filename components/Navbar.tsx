"use client";

import {
  Show,
  SignInButton,
  UserButton,
  useClerk,
  useUser,
} from "@clerk/nextjs";
import { Menu, Star, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type NavbarProps = {
  showHomeButton?: boolean;
};

export default function Navbar({ showHomeButton }: NavbarProps) {
  const { isSignedIn } = useUser();
  const { openSignIn } = useClerk();
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goToServices = () => {
    setMobileOpen(false);
    if (pathname !== "/") {
      router.push("/services");
      return;
    }

    const el = document.getElementById("services");
    if (!el) return;

    const y = el.getBoundingClientRect().top + window.scrollY - 72;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  const bookNow = () => {
    setMobileOpen(false);
    if (!isSignedIn) {
      openSignIn();
      return;
    }
    router.push("/services");
  };

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-saffron-100 bg-cream-50/95 shadow-sm backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="group flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-saffron-400 to-saffron-600 shadow-md transition-shadow duration-300 group-hover:shadow-saffron-300/50">
              <Star className="h-4 w-4 fill-white text-white" />
            </div>
            <span className="font-cinzel text-lg font-semibold tracking-wide text-sandalwood-800">
              Bhavna Tiwari
            </span>
          </Link>

          <div className="hidden items-center gap-3 md:flex">
            <button
              onClick={showHomeButton ? () => router.push("/") : goToServices}
              className="px-3 py-1 font-poppins text-sm font-medium text-sandalwood-700 transition-colors duration-200 hover:text-saffron-600"
            >
              {showHomeButton ? "Home" : "Services"}
            </button>

            <Show when="signed-in">
              <Link
                href="/my-bookings"
                className="px-3 py-1 font-poppins text-sm font-medium text-sandalwood-700 transition-colors duration-200 hover:text-saffron-600"
              >
                My Bookings
              </Link>
              <UserButton />
            </Show>

            <Show when="signed-out">
              <SignInButton mode="modal">
                <button className="rounded-lg border border-saffron-300 px-4 py-1.5 font-poppins text-sm font-medium text-sandalwood-700 transition-all duration-200 hover:border-saffron-500 hover:text-saffron-600">
                  Sign In
                </button>
              </SignInButton>
            </Show>

            <button
              onClick={bookNow}
              className="rounded-lg bg-gradient-to-r from-saffron-500 to-saffron-600 px-5 py-2 font-poppins text-sm font-medium text-white shadow-md transition-all duration-200 hover:scale-[1.02] hover:from-saffron-600 hover:to-saffron-700 hover:shadow-lg hover:shadow-saffron-200/60"
            >
              Book Now
            </button>
          </div>

          <button
            className="p-2 text-sandalwood-700 md:hidden"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="flex flex-col gap-3 border-t border-saffron-100 bg-cream-50/95 px-4 py-4 backdrop-blur-md md:hidden">
          <button
            onClick={
              showHomeButton
                ? () => {
                    router.push("/");
                    setMobileOpen(false);
                  }
                : goToServices
            }
            className="py-2 text-left font-poppins text-sm text-sandalwood-700"
          >
            {showHomeButton ? "Home" : "Services"}
          </button>

          <Show when="signed-in">
            <Link
              href="/my-bookings"
              onClick={() => setMobileOpen(false)}
              className="py-2 text-left font-poppins text-sm text-sandalwood-700"
            >
              My Bookings
            </Link>
            <UserButton />
          </Show>

          <Show when="signed-out">
            <SignInButton mode="modal">
              <button className="w-full rounded-lg border border-saffron-300 px-4 py-2 font-poppins text-sm text-sandalwood-700">
                Sign In
              </button>
            </SignInButton>
          </Show>

          <button
            onClick={bookNow}
            className="w-full rounded-lg bg-gradient-to-r from-saffron-500 to-saffron-600 px-5 py-2.5 font-poppins text-sm font-medium text-white"
          >
            Book Consultation
          </button>
        </div>
      )}
    </nav>
  );
}
