import React, { ReactNode } from "react";
import Link from "next/link";
import Head from "next/head";
import "tailwindcss/tailwind.css";

type Props = {
  children: ReactNode;
  title?: string;
};

const Layout = ({ children, title = "This is the default title" }: Props) => (
  <div className="dark:bg-slate-900 flex flex-col min-h-screen">
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <header className="flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full bg-white text-sm py-4 dark:bg-gray-800">
      <nav className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between">
        <a className="flex-none text-xl font-semibold dark:text-white" href="#">
          RaspGUI
        </a>
        <div className="flex flex-row items-center gap-5 mt-5 sm:justify-end sm:mt-0 sm:pl-5">
          <Link href="/">
            <a className="flex-none text-xl font-semibold dark">Home</a>
          </Link>
          <Link href="/dashboard">
            <a>Dashboard</a>
          </Link>
          <Link href="/about">
            <a>About</a>
          </Link>
          <Link href="/initial-props">
            <a>With Initial Props</a>
          </Link>
        </div>
      </nav>
    </header>
    <main className="flex flex-col px-10 py-4">{children}</main>
    <footer className="mt-auto px-4 py-3">
      <hr className="py-1" />
      <span>I&apos;m here to stay (Footer)</span>
    </footer>
  </div>
);

export default Layout;
