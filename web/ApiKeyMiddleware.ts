import {
  FetchParams,
  Middleware,
  RequestContext,
} from './generated-api/runtime'

export const ApiKeyMiddleware: Middleware = {
  pre: async (context: RequestContext): Promise<FetchParams> => {
    const { init } = context
    init.headers = {
      ...init.headers,
      apikey: '1234567890000', // replace with your actual API key
    }
    return { ...context, init }
  },
}
