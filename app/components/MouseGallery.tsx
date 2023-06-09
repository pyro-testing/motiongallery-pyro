'use client';
import React, { useRef } from 'react';
import { transform } from 'typescript';

const MouseGallery = () => {
  let imageIndex = 0;
  let step = 0;
  let zIndex = 0;
  const refCollection: any[] = [];
  const maxImages: any[] = [];
  const handleMouse = (e: React.MouseEvent) => {
    const { clientX, clientY, movementX, movementY } = e;
    step += Math.abs(movementX) + Math.abs(movementY);
    if (step >= 150 * imageIndex) {
      mouseMovement(clientX, clientY);
    }
    console.log(clientX);
  };
  const mouseMovement = (x: Number, y: Number) => {
    const thisImage = refCollection[imageIndex].current;
    thisImage.style.display = 'block';
    thisImage.style.left = x + 'px';
    thisImage.style.top = y + 'px';
    thisImage.style.zIndex = zIndex;
    maxImages.push(thisImage);
    zIndex++;
    if (maxImages.length - 1 == 5) {
      maxImages[0].style.display = 'none';
      maxImages.shift();
    }
    maxImages.forEach((image, index) => {
      zIndex = index;
      image.style.zIndex = zIndex;
    });
    if (imageIndex == 14) {
      imageIndex = 0;
      step = -150;
    } else {
      imageIndex++;
    }
  };
  return (
    <main className="w-full h-full flex flex-col relative justify-center items-center ">
      <h1 className="font-black text-transparent text-4xl bg-clip-text bg-gradient-to-b mb-2 mt-1 from-white to-neutral-300 px-12">
        Mouse Gallery
      </h1>
      <h1 className="font-normal text-transparent text-lg bg-clip-text bg-gradient-to-b w-2/3 mb-4 text-center from-white to-neutral-300">
        Move your mouse inside the box below to see the effect.
      </h1>
      <div className=" opacity-80 mouse-gallery-main rounded-lg overflow-hidden w-9/12 h-5/6 bg-gradient-to-b from-green-300 via-blue-300 to-indigo-300 flex justify-center items-center p-[2px]">
        {/* Mouse Gallery */}
        <div
          onMouseMove={handleMouse}
          className="w-full h-full bg-black rounded-lg overflow-hidden relative"
        >
          {Array.from(Array(15).keys()).map((num) => {
            const imageRef = useRef<HTMLImageElement>(null);
            refCollection.push(imageRef);
            return (
              <img
                ref={imageRef}
                className="absolute w-4/12 hidden"
                style={{ transform: 'translateX(-75%) translateY(-115%)' }}
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
