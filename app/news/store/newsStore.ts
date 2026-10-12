import { create } from 'zustand';
import { getNews } from '../action';

type News = {
    id : string;
    title : string;
    description : string;
    publishedAt : Date;
}

type NewsStore = {
    searchNews : News[];
    fetchSearchNews : (searchInput:string) => Promise<void>;
}

export const useNewsStore = create<NewsStore>((set) => ({
    searchNews : [],

    fetchSearchNews: async (inp) => {
        const res = await getNews(inp);
        set({
            searchNews: res.data || [],
        });
    },
}));