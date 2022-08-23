import property from '../models/property.js'
import PropertyModel from '../models/property.js'
import UserModel from '../models/user.js'


//create / post in "/allproperties/:id"
const create = async (req, res, next) => {

  const { propertyId } = req.params

  try {
    const property = await PropertyModel.findById(propertyId)
    if (!property) {
      return res
        .status(404)
        .json({ message: `property with ${propertyId} not found.` })
    }

    const someReviewIsRated = property.reviews.some(
      (review) =>
        review.createdBy.toString() === req.currentUser.id && review.rating
    )
    if (
      // is the user trying to give a rating?
      req.body.rating &&
      // has the user already rated the property?
      someReviewIsRated
    ) {
      return res.status(403).json({ message: "You already rated this property" })
    }

    const user = await UserModel.findById(req.currentUser.id)

    // property is now a normal JavaScript object, so we can treat it as such.
    // meaning we can just push onto the existing reviews array.


    const newReview = { ...req.body, createdBy: req.currentUser.id }
    property.reviews.push(newReview)
    user.reviews.push(newReview)

    // at this point (line 26) we haven't saved our document back to the
    // database! We have only added a review on the array that is
    // attached to the propertys JS object.
    // Next line saves it to the database.
    await property.save()
    await user.save()

    // console.log(req.currentUser.id)
    // console.log(req.body)
    return res.status(200).json({
      message: "review successfully created!",
      createdreview: newReview,
    })
  } catch (error) {
    next(error)
  }
}
const update = async (req, res, next) => {

  const { propertyId, reviewId } = req.params

  console.log(propertyId, reviewId)
  const updatedReview = req.body
  console.log(req.body)
  const { id: userId } = req.currentUser
  console.log(userId)

  try {
    const property = await PropertyModel.findById(propertyId)
    const reviewToUpdate = property.reviews.find(
      (review) => review.id === reviewId
    )
    if (
      reviewToUpdate.createdBy.toString() !== userId &&
      req.currentUser.role !== "admin"
    ) {
      return res.status(403).json({
        message: "Forbdiden. Not admin or user who created this review",
      })
    }

    property.reviews = property.reviews.map((review) => {
      if (review.id === reviewId) {
        return { ...review, ...updatedReview }
      } else {
        return review
      }
    })

    await property.save()

    return res.status(200).json({
      message: "review has been updated",
      updatedReview: property.reviews.find((review) => review.id === reviewId),
    })
  } catch (error) {
    next(error)
  }
}

const remove = async (req, res, next) => {
  const { propertyId, reviewId } = req.params
  const { id: userId } = req.currentUser

  try {
    const property = await PropertyModel.findById(propertyId)

    const reviewToDelete = property.reviews.find(
      (review) => review.id === reviewId
    )
    if (
      reviewToDelete.createdBy.toString() !== userId &&
      req.currentUser.role !== "admin"
    ) {
      return res.status(403).json({
        message: "Forbdiden. Not admin or user who created this review",
      })
    }

    property.reviews = property.reviews.filter(

      (review) => review.id !== reviewId
    )
    
    const user = await UserModel.findById(req.currentUser.id)

    const updatedPropertyReview = await property.save()
    return res.status(200).json({
      message: "Comment successfully deleted",
      updatedReviews: updatedPropertyReview.reviews,
    })
  } catch (error) {
    next(error)
  }
}


export default { create, update, remove }