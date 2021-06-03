import { createModel } from '@rematch/core'
import axios from 'axios';
import { RootModel } from '.'

type NewsItem = {
    title: string
}

type NewsState = Array<NewsItem>;

export const news = createModel<RootModel>()({
    state: [] as NewsState,
    reducers: {
        // handle state changes with pure functions
        setNews(state: NewsState, payload: Array<NewsItem>) {
            return [...state, ...payload]
        },
    },
    effects: (dispatch) => ({
        // handle state changes with impure functions.
        async fetchNewsAsync() {
            const res = await axios.get('https://5e4bfc87a641ed0014b02740.mockapi.io/api/clane/news');
            dispatch.news.setNews(res.data);
        },
    }),
});
