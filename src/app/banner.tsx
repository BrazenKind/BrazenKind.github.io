'use client'

import React, { useState, useRef, useEffect } from "react";
import './css/banner.css';

function generateDelay(base, variance) {
    return base + (Math.round((Math.random()*2 - 1)*100)/100)*variance;
}

export default function Banner(data) {

  const baseTextDelay = 200;
  const baseTextVariance = 150;

  const titleLength = data.text.length;
  const [titleText, setTitleText] = React.useState("");

  const prevTime = React.useRef();
  const curRequestRef = React.useRef(0);
  const curIndex = React.useRef(0);
  const curTextDelay = React.useRef(generateDelay(baseTextDelay, baseTextVariance));

  const animate = time => {
    if (prevTime.current != undefined) {
      const deltaTime = time - prevTime.current;
      if (deltaTime >= curTextDelay.current){
        setTitleText(data.text.slice(0, curIndex.current));

        curTextDelay.current = generateDelay(baseTextDelay, baseTextVariance);
        curIndex.current = curIndex.current + 1;
        prevTime.current = time;
      }
    } else {
      prevTime.current = time;
    }
    if (curIndex.current <= titleLength){
      curRequestRef.current = requestAnimationFrame(animate);
    }
  }

  React.useEffect(() => {
    curRequestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(curRequestRef.current);
  }, []);

  return (
    <div id="banner">
        <h1>{titleText}</h1>
    </div>
  )
}