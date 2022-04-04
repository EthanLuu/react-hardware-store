import { Layout } from 'antd';
import Link from 'next/link';

export const Footer = () => {
    return (
        <Layout.Footer className="flex justify-center items-center">
            <div>
                Hard Store ©2022 Created By {" "}
                <a href="https://www.ethanloo.cn">EthanLoo</a>
            </div>
        </Layout.Footer>
    );
};
