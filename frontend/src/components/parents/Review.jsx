import { Rate } from 'antd';
import React from 'react'

const Review = ({review}) => {
  return (
    <div className='flex gap-10 p-10 border-b-2'>
      <img className='h-[50px] w-[50px] object-contain rounded-full' alt='' src='https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1677509740.jpg' />
      <div className='flex flex-col gap-3'>
        <p>{review.username}</p>
        <Rate value={review.stars} disabled />
        <p>{new Date(review.createdAt).toLocaleString()}</p>
        <p>{review.content}</p>
        <div className='flex items-center gap-2'>
          {review.images.map((image, index) => (
            <img 
            key={index}
            className='h-[100px] w-auto object-contain'
          alt='' src={image}/>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Review;
