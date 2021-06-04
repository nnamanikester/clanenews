import { createModel } from '@rematch/core'
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { RootModel } from '.'

export type NewsItem = {
    id: string;
    author: string;
    title: string;
    createdAt: string;
    url: string;
    body: string;
}

type NewsState = Array<NewsItem>;

export const news = createModel<RootModel>()({
    state: [] as NewsState,
    reducers: {
        // handle state changes synchronously
        setNews(state: NewsState, payload: Array<NewsItem>) {
            return payload;
        },
    },
    effects: (dispatch) => ({
        // handle state changes asynchronously.
        fetchNewsAsync(payload: { page: number, limit: number }) {
            return new Promise(async (resolve, reject) => {
                try {
                    const res = await axios.get(`https://5e4bfc87a641ed0014b02740.mockapi.io/api/clane/news?page=${payload.page}&limit=${payload.limit}`);
                    await AsyncStorage.setItem('@Clane/news', JSON.stringify(res.data));
                    dispatch.news.setNews(res.data);
                    resolve("Ok");
                } catch (e) {
                    reject(e);
                }
            });
        },
    }),
});
