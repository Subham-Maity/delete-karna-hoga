'use client'

import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react";
import { getCurrentUser } from "@/app/api/auth/lib/session";
import { getNewsById } from "../../api/news/action";

type NewsDataType = {
    id : string;
    title : string;
    description : string;
}

export default function NewsDetails() {
    
    const [isAuthenticated,setIsAuthenticated] = useState(false);
    const [ newData, setNewsData ] = useState<NewsDataType | null>(null);
    const router = useRouter();

    const params = useParams();
    const id = params.id as string;
    
    useEffect(() => {
        async function checkAuthAndLoad(){
            const user = await getCurrentUser();
            if(!user) {
                router.push('/auth/login');
                return;
            }
            setIsAuthenticated(true);
        }
        async function getData(id:string) {
            const res = await getNewsById(id);
            if(res.success && res.data) setNewsData(res.data);
        }
        getData(id);
        checkAuthAndLoad();
    },[id,router]);

    if(!isAuthenticated){
        return (
            <div className="min-h-screen flex items-center justify-center text-sm font-medium text-muted-foreground animate-pulse">
                Checking authentication...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background text-foreground py-10 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-6">
                <div key={newData?.title} className="p-6 sm:p-8 rounded-2xl border border-border bg-card shadow-sm space-y-6">
                    <div>
                        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Title</span>
                        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mt-2 leading-snug">{newData?.title}</h1>
                    </div>
                    <div className="pt-6 border-t border-border">
                        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Description</span>
                        <p className="text-base text-muted-foreground mt-2 leading-relaxed">{newData?.description}</p>
                    </div>
                </div>
        </div>
    )
}