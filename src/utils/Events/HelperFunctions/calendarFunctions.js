// Gets the time displayed on UI in 12 hour format
export const timeFormatHandler = (time) => {
  const t = parseInt(time);

  if(t > 12 && !time.includes('.5')){
    return (t -12 + ':00 pm');
  }
  else if(t > 12 && time.includes('.5')){
    return (t -12 + ':30 pm');
  }
  else if(t < 12 && !time.includes('.5')){
    return (t + ':00 am');
  }
  else if(t < 12 && time.includes('.5')){
    return (t + ':30 am');
  }
  else if(t == 12 && !time.includes('.5')){
    return (t + ':00 pm');
  }
  else if(t == 12 && time.includes('.5')){
    return (t + ':30 pm');
  }
}


