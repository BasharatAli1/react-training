import React from 'react';
import { defaultColor } from '../../../utils/constants';

export const OrdersIcon = ({ color = defaultColor }) => {
  return (
    <svg
      width='18'
      height='18'
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M4.99984 4.99007H5.00817M4.99984 14.9901H5.00817M3.33317 1.65674H16.6665C17.587 1.65674 18.3332 2.40293 18.3332 3.32341V6.65674C18.3332 7.57721 17.587 8.32341 16.6665 8.32341H3.33317C2.4127 8.32341 1.6665 7.57721 1.6665 6.65674V3.32341C1.6665 2.40293 2.4127 1.65674 3.33317 1.65674ZM3.33317 11.6567H16.6665C17.587 11.6567 18.3332 12.4029 18.3332 13.3234V16.6567C18.3332 17.5772 17.587 18.3234 16.6665 18.3234H3.33317C2.4127 18.3234 1.6665 17.5772 1.6665 16.6567V13.3234C1.6665 12.4029 2.4127 11.6567 3.33317 11.6567Z'
        stroke={color}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
