import express from 'express'
import bannersRouter from '../modules/admin-module/banners/banners.router.js'
import categoryRouter from '../modules/admin-module/categories/categories.route.js'
import productsRouter from '../modules/admin-module/products/products.route.js'
import reelsRouter from '../modules/admin-module/reels/reels.route.js'
import blogsRouter from '../modules/admin-module/blogs/blogs.route.js'
import certificatesRouter from '../modules/admin-module/certificates/certificates.route.js'
const app=express()

app.use("/banners",bannersRouter)
app.use("/blogs",blogsRouter)
app.use("/category",categoryRouter)
app.use("/products",productsRouter)
app.use("/reels",reelsRouter)
app.use("/certificates",certificatesRouter)
export default app