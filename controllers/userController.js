import UserModel from "../models/user.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import CONSTS from "../consts.js"

import PropertyModel from '../models/property.js'


//register

const register = async (req, res, next) => {
  const { body: newUser } = req


  const emailExists = await UserModel.findOne({ email: newUser.email })
  if (emailExists) {
    return res.status(400).json({ message: "User with this email already exists" })
  }

  const userNameExists = await UserModel.findOne({ userName: newUser.userName })
  if (userNameExists) {
    return res.status(400).json({ message: "User with this username already exists" })
  }

  if (newUser.password !== newUser.confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match." })
  }

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(newUser.password, salt)

  // console.log(salt)
  // console.log(hashedPassword)

  const createdUser = await UserModel.create({
    ...newUser,
    password: hashedPassword,
  })

  return res.status(200).json({ createdUser })
}

// login endpoint

const login = async (req, res, next) => {
  // console.log("this is the login endpoint")
  //from the request body we deconstruct userName, password

  const { userName, password } = req.body

  // console.log(req.body)
  // console.log(userName, password)

  try {
    const user = await UserModel.findOne({ userName })
    //{userName: req.body.userName}

    //we now have access to the hashed password saved in the database for that user! user.password.
    //we then need to compare the password to the password in the database 
    //using an if else statement and bcrypt we can compare encrypted password to password entered by user
    //First we neeed to check whter the user exists

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials." })
    }
    const passwordsMatch = await bcrypt.compare(password, user.password)
    if (!passwordsMatch) {
      return res.status(400).json({ message: "Invalid credentials" })
    }
    // in order for the user to have a security token we must encode the user information with a security token. JWT json web token.

    const payload = {
      userName: user.userName,
      email: user.email,
    }
    // we have the option of adding a expiration

    const opts = {
      expiresIn: "2 days",
    }
    const token = jwt.sign(payload, CONSTS.JWT_SECRET, opts)

    return res.status(200).json({ token })
  } catch (error) {
    next(error)
  }

}

//! userdata
const userData = async (req, res, next) => {

  const { _id } = req.currentUser

  //get all the properties created
  const myProperties = await PropertyModel.find({ createdBy: _id })
  //console.log( {myProperties} )

  // get username and reviews
  const user = await UserModel.findById(req.currentUser.id).select("userName reviews").lean()

  //console.log({user})

  return res.status(200).json({ ...user, myProperties, }) // ok why spread? so we can access drectly in frontend?

}


//router.route("/user/:reviewId").get(auth, userController.sendOne )
const sendOne = async (req, res, next) => {
  const { reviewId } = req.params

  let reviewToSend
  try {

    const user = await UserModel.findById(req.currentUser.id).select("reviews").lean()

    console.log("reviews:", user.reviews)

    const reviewToSend = user.reviews.find(
      (review) => review._id.toString() === reviewId
    )
    console.log({ reviewToSend })

    return res.status(200).json({ oldReview: reviewToSend })

  } catch (error) {
    console.log("within controller", error)
    next(error)
  }
}


// export for routes that require userController: 
// router.route("/register").post(userController.register)
// router.route("/login").post(userController.login)
// router.route("/user-profile").get(auth, userController.userData)

export default { register, login, userData, sendOne }