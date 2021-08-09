import { Express, Router } from 'express'
import fg from 'fast-glob'

export const setupRoutes = (app: Express): void => {
    const router = Router()
    app.use('/api', router)
    fg.sync('**/src/routes/**routes.ts').map(async file => {
        let importedRoute = (await import (`../../${file}`)).default(router)
        return importedRoute;
    })
}
