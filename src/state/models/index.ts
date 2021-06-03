import { Models } from '@rematch/core'
import { news } from './newsModel'

export interface RootModel extends Models<RootModel> {
    news: typeof news
}

export const models: RootModel = { news }