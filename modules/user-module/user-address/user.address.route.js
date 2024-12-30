import express from 'express'
import userAddressController from './user.address.controller.js'

const router=express.Router()

router.post("/",userAddressController.createAddress)

router.get("/",userAddressController.getAllAddresses)

router.get("/userId/:userId",userAddressController.getAddressById)

router.patch("/:id",userAddressController.updateAddressById)

router.delete("/:id",userAddressController.deleteAddressById)


export default router