const express = require('express')
const router = express.Router();

const { createuser,
  createadmin,
  loginuser,
  fetchAll,
  getuser,
  deleteuser,
  updateUser,
  blockUser,
  unblockUser,
  handleRefreshToken,
  logout,
  updatePassword,
  forgotPssordToken,
  ResetPassword,
  loginAdmin, getWishlist,
  saveAddress,
  userCart,
  getUserCart,
  emptyCart,
  applyCoupon,
  createOrder,
  getOrders,
  getSellerOrders,
  updateOrderStatus
} = require('../Controllers/userCtrl')

const { sellerAuthMiddleware, authMiddleware, isAdmin } = require('../Middlewares/Middleware')

router.post('/register', createuser)
router.post('/registeradmin', createadmin)
router.post('/forgotPassword', forgotPssordToken)
router.patch('/updatePassword', authMiddleware, updatePassword)
router.patch('/resetPassword/:token', ResetPassword)
router.put('/updateOrder/:id', authMiddleware, isAdmin, updateOrderStatus)
router.post('/login', loginuser)
router.post('/adminlogin', loginAdmin)
router.post('/cart', authMiddleware, userCart)
router.post('/cart/applyCoupon', authMiddleware, applyCoupon)
router.post('/cart/createOrder', authMiddleware, createOrder)
router.get('/usercart', authMiddleware, getUserCart)
router.get('/wishlist', authMiddleware, getWishlist)
router.delete('/emptyCart', authMiddleware, emptyCart)

router.get('/fetchAllUsers', authMiddleware, isAdmin, fetchAll)
router.get('/getUserOrders', authMiddleware, getOrders) // Orders made by the user
router.get('/getSellerOrders', sellerAuthMiddleware, getSellerOrders) // Orders made to the seller
router.get('/refresh', handleRefreshToken)
router.get('/logOut', logout)
router.get('/:id', authMiddleware, getuser)
router.patch('/updateuser', authMiddleware, updateUser)
router.put('/saveAdress', authMiddleware, saveAddress)

router.delete('/deleteUser', authMiddleware, deleteuser)
router.patch('/blockUser/:id', authMiddleware, isAdmin, blockUser)
router.patch('/unblockUser/:id', authMiddleware, isAdmin, unblockUser)

module.exports = router;
