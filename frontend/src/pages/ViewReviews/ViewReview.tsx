/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useOutletContext } from 'react-router-dom'
import StarRatings from 'react-star-ratings'
import './viewReview.css'
type ICurrentProduct = {
  averageRatings: number
  name: string
}
const initialSubmitPayload: ISubmitReviewPayload = {
  productId: 0,
  rating: 0,
  review: '',
}
function ViewReview(): JSX.Element {
  const [selectedProduct, products] = useOutletContext<[number, IProductInfo[]]>()
  const [currentProduct, setCurrentProduct] = useState<ICurrentProduct>({
    averageRatings: 0,
    name: '',
  })
  const [reviews, setReviews] = useState<IReview[]>([])
  const [showTextArea, setShowTextArea] = useState<boolean>(false)
  const [submitReviewPayload, setSubmitReviewPayload] = useState<ISubmitReviewPayload>(initialSubmitPayload)

  const handleOnBlurInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value
    setSubmitReviewPayload({ ...submitReviewPayload, productId: selectedProduct, review: value })
  }
  const handleStarRating = (rating: number) => {
    setSubmitReviewPayload({ ...submitReviewPayload, rating: rating })
  }
  const getReviews = () => {
    axios({
      method: 'POST',
      url: 'http://localhost:5000/getReview',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        productId: selectedProduct,
      },
    })
      .then((repos) => {
        const response = repos.data as IGetReviewResponse
        if (response.status) {
          setSubmitReviewPayload(initialSubmitPayload)
          setReviews(response.result)
          setCurrentProduct({
            ...currentProduct,
            averageRatings: response.result[0].averageRatings ?? 0,
            name: response.result[0].name ?? '',
          })
        } else {
          setReviews([])
          // eslint-disable-next-line array-callback-return
          products.map((item) => {
            if (item.id === selectedProduct)
              setCurrentProduct({ ...currentProduct, averageRatings: item.averageRatings ?? 0, name: item.name ?? '' })
          })
        }
      })
      .catch((error) => {
        console.log('error', error.message)
      })
  }
  const submitReview = () => {
    axios({
      method: 'POST',
      url: 'http://localhost:5000/addReview',
      headers: {
        'Content-Type': 'application/json',
      },
      data: submitReviewPayload,
    })
      .then((repos) => {
        const response = repos.data as IGetReviewResponse
        if (response.status) {
          setShowTextArea(!showTextArea)
          getReviews()
        }
      })
      .catch((error) => {
        console.log('error', error.message)
      })
  }
  useEffect(() => {
    if (selectedProduct !== 0) getReviews()
  }, [selectedProduct])

  return (
    <div style={{ width: '100%' }}>
      <h1>{currentProduct.name}&nbsp;&nbsp;</h1>
      <div className="review-title-container">
        {reviews.length !== 0 ? (
          <>
            <h2>{currentProduct.averageRatings !== 0 ? currentProduct.averageRatings : ''}</h2>
            <div id="average-star-rating">
              <StarRatings
                rating={currentProduct.averageRatings}
                starRatedColor="#FDCC0D"
                numberOfStars={5}
                name="average-star-rating"
                starDimension={'32px'}
                starHoverColor="#f2c925"
                starSpacing="0px"
              />
              {showTextArea === false ? (
                <button
                  className="form-submit-button margin-left-8px color-secondary-navy"
                  onClick={() => {
                    setShowTextArea(!showTextArea)
                  }}
                >
                  Add Review
                </button>
              ) : null}
            </div>
          </>
        ) : null}
      </div>
      {reviews.length === 0 ? (
        <div className="flex align-items-center">
          <h3>No Reviews Available!</h3>
          {showTextArea === false ? (
            <button
              className="form-submit-button margin-left-8px color-secondary-navy"
              onClick={() => {
                setShowTextArea(!showTextArea)
              }}
            >
              Add Review
            </button>
          ) : null}
        </div>
      ) : (
        <div className="flex-column">
          <hr className="width-available" />
          <h5>Reviews</h5>
          {reviews.map((item, index) => {
            return (
              <div key={`review_${index}`} className="flex align-items-baseline">
                <StarRatings
                  rating={item.rating}
                  starRatedColor="#FDCC0D"
                  numberOfStars={5}
                  name={`review-${index}-star-rating`}
                  starDimension={'24px'}
                  starHoverColor="#f2c925"
                  starSpacing="0px"
                />
                <div className="margin-left-8px bold">{item.rating},</div>
                <div className="margin-left-8px color-secondary-navy word-break-all">{item.review}</div>
              </div>
            )
          })}
        </div>
      )}
      {showTextArea ? (
        <div className="flex-column">
          <h5>What is your rating?</h5>
          <StarRatings
            rating={submitReviewPayload.rating}
            starRatedColor="#FDCC0D"
            numberOfStars={5}
            name="submit-star-rating"
            starDimension={'32px'}
            starHoverColor="#f2c925"
            starSpacing="0px"
            changeRating={handleStarRating}
          />
          <textarea onBlur={handleOnBlurInput} maxLength={300} className="review-input" />
          <div className="flex">
            <button className="form-submit-button color-secondary-navy" onClick={() => submitReview()}>
              Submit Review
            </button>
            <button
              className="form-submit-button cancel margin-left-8px color-secondary-navy"
              onClick={() => {
                setShowTextArea(!showTextArea)
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default ViewReview
