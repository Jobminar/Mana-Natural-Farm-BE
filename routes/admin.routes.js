import express from 'express'
import bannersRouter from '../modules/admin-module/banners/banners.router.js'
import categoryRouter from '../modules/admin-module/categories/categories.route.js'
import productsRouter from '../modules/admin-module/products/products.route.js'

const app=express()

app.use("/banners",bannersRouter)
app.use("/category",categoryRouter)
app.use("/products",productsRouter)

export default app