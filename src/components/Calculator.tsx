
export const surcharge = (cart_value: number) => {
  if(cart_value >= 10) return 0
  return (+(10 - cart_value).toFixed(2))
}

export const distance = (meters: number) => {
  if(meters <= 1000) return 2
  const baseFee = 2;
  return (Math.ceil((meters - 1000) / 500 + baseFee))
}

export const numberOfItems = (count: number) => {
  if(count < 5) return 0
  return (count <= 12 ? +((count - 4) * 0.50).toFixed(2) : 5.70)
}

export const maxSurcharge = (surcharge: number) => {
  if(surcharge >= 15) return 15
  return (+(surcharge).toFixed(2))
}

export const freeDelivery = (value: number) => {
  if(value >= 100 ) return 0
}


export const rushHourFee = (totalFee: number) => {
  const rushHourFee = totalFee * 1.2
  return (+(maxSurcharge(rushHourFee)).toFixed(2))
}


export const rushHourTime = (orderTime: Date) => {
  const day = orderTime.getUTCDay()
  const time = (orderTime.getUTCHours() + 1)
  return (
    day === 5 && time >= 15 && time < 19
  )
}

export const deliveryFeeCalculator = (cartValue: number, meters: number, itemCount: number, orderTime: Date ) => {
  if(cartValue >= 100) return 0
  let total = surcharge(cartValue) + distance(meters) + numberOfItems(itemCount)
  return (
    rushHourTime(orderTime) ? rushHourFee(total) : maxSurcharge(total)
  )
}
