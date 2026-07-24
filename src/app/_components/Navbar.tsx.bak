"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import cn from "@/lib/clsx";

import HamburgerIcon from "./icons/HamburgerIcon";

interface NavOption {
  title: string;
  href: string;
}

const navOptions: NavOption[] = [
  { title: "METIC", href: "/" },
  { title: "Our Division", href: "/#divisi" },
  { title: "Track Record", href: "/#track" },
  { title: "Our Member", href: "/#leaders" },
  { title: "Benefit", href: "/#benefit" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 80);
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="xl:relative fixed top-0 z-[999] mx-auto w-full flex flex-col">
      <div className="w-full flex xl:max-w-[1192px]  mx-auto z-[999] py-4 xl:py-0 px-5 bg-white xl:bg-transparent justify-between items-center">
        <Link href={"/"} className="xl:mt-[36px] ">
          <span className="block w-[130px] h-[39px] bg-contain bg-[url(/assets/image/logo.png)] text-transparent bg-no-repeat pointer-events-none select-none">
            Moklet Organization: SMK Telkom Malang
          </span>
        </Link>
        <div
          className={cn(
            `fixed hidden left-1/2 top-[24.5px] xl:flex xl:items-center justify-between w-full transition-all duration-300 ${
              scrolled ? "max-w-[826px]" : "max-w-[602px]"
            } -translate-x-1/2 rounded-full border border-neutral-300 bg-white px-[50px] py-3 drop-shadow-[0_3px_11px_rgba(0,0,0,0.25)]`
          )}
        >
          {scrolled && (
            <Link href="/">
              <Image
                src={"/assets/image/logo.png"}
                alt="Moklet Organization: SMK Telkom Malang"
                width={120}
                height={50}
                className={cn(
                  `pointer-events-none h-[40px] object-contain transition-all duration-300 ${
                    scrolled ? "w-[120px]" : "w-0"
                  }`
                )}
              />
            </Link>
          )}
          {navOptions.map((navOption) => (
            <Link
              key={navOption.title}
              href={navOption.href}
              // Splitted "/a/b" will form an array: ["", "a", "b"], that's why we use the second index as comparation
              className={cn(
                `rounded-full py-2 text-center transition-all duration-300 text-primary`
              )}
            >
              {navOption.title}
            </Link>
          ))}
        </div>
        <div className="hidden min-xl:flex gap-[9px] min-xl:ml-[129px] mt-[6px]">
          <Link href={"/registration"} className="min-xl:mt-[36px]">
            <div className="hidden xl:block px-4 py-2 rounded-full bg-primary text-white hover:bg-primary/90 transition-colors">
              <h1 className="text-sm font-medium">Join Now!</h1>
            </div>
          </Link>
          <Link
            href={"https://www.tiktok.com/@meticmerangkulsemuaorang"}
            className="min-xl:mt-[36px] "
          >
            <div className="hidden xl:block w-[33px] h-[33px] rounded-full bg-primary text-transparent pointer-events-none select-none">
              <Image
                src={"/assets/image/tiktok-vector.png"}
                alt="TikTok Logo"
                width={16}
                height={18}
                className="mx-auto py-1.5"
              />
            </div>
          </Link>
          <Link
            href={"https://www.instagram.com/meticmoklet/"}
            className="xl:mt-[36px] "
          >
            <div className="hidden xl:block w-[33px] h-[33px] rounded-full bg-primary text-transparent pointer-events-none select-none">
              <Image
                src={"/assets/image/ig-vector.png"}
                alt="TikTok Logo"
                width={17}
                height={17}
                className="mx-auto py-2"
              />
            </div>
          </Link>
        </div>
        <button
          className="block xl:hidden"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <HamburgerIcon />
        </button>
      </div>
      <div
        className={cn(
          `block xl:hidden h-[300px] w-full z-[800] bg-white transition-all duration-500 ${
            isExpanded ? "mt-0" : " -mt-120"
          }`
        )}
      >
        <div className="flex flex-col gap-8 text-start justify-start items-start my-[21px] ms-[20px] lg:ms-[52px]">
          {navOptions.map((navOption) => (
            <Link
              key={navOption.title}
              href={navOption.href}
              // Splitted "/a/b" will form an array: ["", "a", "b"], that's why we use the second index as comparation
              className={cn(
                `rounded-full text-center text-[16px] transition-all duration-300 hover:text-primary-400 ${
                  pathname.split("/")[1] === navOption.href.split("/")[1]
                    ? "text-red-400"
                    : ""
                }`
              )}
              onClick={() => setIsExpanded(false)}
            >
              {navOption.title}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
