'use client';
import BookList from "@/components/bookListComponent";
import '@ant-design/v5-patch-for-react-19';
import { Button } from "antd";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';


export default function BookPage() {
    const router = useRouter();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);

        const user = localStorage.getItem("user");
        if (!user) {
            router.push('/login');
        }
    }, [router]);

    if (!isClient || localStorage.getItem("user") === null) {
        return null;
    }

    return (
        <div>
            <div className="header">
                <Button danger className="button-logout" onClick={() => {
                    localStorage.removeItem("user");
                    router.push('/login');
                }}> Logout </Button>
            </div>
            <div className="books-page">
                <BookList />
            </div>
        </div>
    );
}