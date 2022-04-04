import "../styles/global.css";
import zhCN from "antd/lib/locale/zh_CN";
import { ConfigProvider } from "antd";
import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";

type NextPageWithLayout = NextPage & {
    getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
    const getLayout = Component.getLayout ?? ((page) => page);

    return getLayout(
        <ConfigProvider locale={zhCN}>
            <Component {...pageProps} />
        </ConfigProvider>
    );
}
