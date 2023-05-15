import React, { useState } from 'react';
import img from '../loading.svg'

export default function LoadingBar() {
  return (
    <div className="pre-loader">
        <img src={img} />
        <div className='loading'>
            <div className='spinner'>
                <div className='mask'>
                    <div className='maskedCircle'></div>
                </div>
            </div>
        </div>
 
    </div>
  );
}



{/* <div class="pre-loader">
        <!-- <h1>Loading Website...</h1> -->
        <!-- zmniejszyc ikone -->
        <img class="pre-loader-icon" src="loading.svg">
        
        
        <div class="loading">
          <!-- We make this div spin -->
          <div class="spinner">
            <!-- Mask of the quarter of circle -->
            <div class="mask">
              <!-- Inner masked circle -->
              <div class="maskedCircle"></div>
            </div>
          </div>
        </div>


   </div> */}