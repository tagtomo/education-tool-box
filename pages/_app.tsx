import { useEffect, useState } from 'react';
import Head from "next/head";
import type { AppProps } from "next/app";
// theme
import ThemeConfig from "../src/theme";

import DashboardLayout from '../src/layouts/DashboardLayout';

function MyApp({ Component, pageProps, router }: AppProps): JSX.Element {
  const [layout, setLayout] = useState("home");
  useEffect(() => {
    const regex_dashboard = /dashboard/;
    const regex_flashcard = /flashcard/;
    if (router.pathname.match(regex_dashboard)) {
      setLayout("dashboard");
    } else if (router.pathname.match(regex_flashcard)) {
      setLayout("dashboard");
    } else {
      setLayout("home");
    }
  }, [router.pathname]);

  return (
    <>
      <ThemeConfig>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
        </Head>
        {layout === "home" && (<Component {...pageProps} />)}
        {layout === "dashboard" && (
          <DashboardLayout>
            <Component {...pageProps} />
          </DashboardLayout>
        )}
      </ThemeConfig>
    </>
  )
}

export default MyApp