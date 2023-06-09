'use client';
import React, { useRef } from 'react';
import CardSpotlight from './CardSpotlight';

const MouseGallery = () => {
  let imageIndex = 0;
  let step = 0;
  let zIndex = 0;
  let refCollection: any[] = [];
  let maxImages: any[] = [];

  const handleMouse = (e: React.MouseEvent) => {
    const { clientX, clientY, movementX, movementY } = e;
    step += Math.abs(movementX) + Math.abs(movementY);
    if (step >= 150 * imageIndex) {
      mouseMovement(clientX, clientY);
    }
    console.log(clientX);
  };

  const mouseMovement = (x: any, y: any) => {
    const container = document.getElementById('mouse-gallery-container');
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const containerLeft = containerRect.left;
    const containerTop = containerRect.top;

    const thisImage = refCollection[imageIndex].current;
    const imageWidth = thisImage.offsetWidth;
    const imageHeight = thisImage.offsetHeight;

    // Calculate the position to center the image on the mouse within the container
    const left = x - containerLeft - imageWidth / 2;
    const top = y - containerTop - imageHeight / 2;

    thisImage.style.display = 'block';
    thisImage.style.left = left + 'px';
    thisImage.style.top = top + 'px';
    thisImage.style.zIndex = zIndex;

    maxImages.push(thisImage);
    zIndex++;

    if (maxImages.length > 5) {
      maxImages[0].style.display = 'none';
      maxImages.shift();
    }

    maxImages.forEach((image, index) => {
      zIndex = index;
      image.style.zIndex = zIndex;
    });

    if (imageIndex === 14) {
      imageIndex = 0;
      step = -150;
    } else {
      imageIndex++;
    }
  };

  const resetImages = () => {
    imageIndex = 0;
    step = 0;
    zIndex = 0;
    refCollection.forEach((items) => {
      items.current.style.display = 'none';
    });
    maxImages = [];
  };

  const handleMouseLeave = () => {
    step = step + 150;
    console.log('Leave');
  };

  return (
    <main className="w-full h-full flex flex-col relative justify-center items-center ">
      <h1 className="flex gap-4 mb-2 mt-2 px-12 justify-center items-center">
        <span className="text-3xl">🌌</span>
        <span className="font-black text-4xl text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-300">
          Mouse Gallery
        </span>
      </h1>
      <h1 className="font-normal text-transparent text-lg bg-clip-text bg-gradient-to-b w-2/3 mb-4 text-center from-white to-neutral-300">
        Move your mouse inside the box below to see the effect.
      </h1>
      <CardSpotlight resetImages={resetImages}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
          />
        </svg>
        Reset Gallery
      </CardSpotlight>
      <div className="opacity-80 mouse-gallery-main rounded-lg overflow-hidden w-9/12 h-[75%] bg-gradient-to-b from-green-300 via-blue-300 to-indigo-300 flex justify-center items-center p-[2px]">
        {/* Mouse Gallery */}
        <div
          id="mouse-gallery-container"
          onMouseMove={handleMouse}
          onMouseLeave={handleMouseLeave}
          className="w-full h-full bg-black rounded-lg overflow-hidden relative"
        >
          {Array.from(Array(15).keys()).map((num) => {
            const imageRef = useRef<HTMLImageElement>(null);
            refCollection.push(imageRef);
            return (
              <img
                ref={imageRef}
                className="absolute w-3/12 hidden rounded-lg"
                style={{ transform: 'translateX(-50%) translateY(-50%)' }}
                key={num + 1}
                src={`/gallery/${num + 1}.jpg`}
              ></img>
            );
          })}
        </div>
      </div>
      {/* Gradient */}
      <div className="-z-10 w-[400px] h-[500px] absolute bg-blue-500 opacity-25 left-2 blur-[100px] rounded-full"></div>
      <div className="-z-10 w-[300px] h-[400px] absolute bg-emerald-400 opacity-25 right-2 bottom-1 blur-[100px] rounded-full"></div>
    </main>
  );
};

export default MouseGallery;
