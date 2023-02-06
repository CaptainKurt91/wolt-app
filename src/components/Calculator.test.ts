/* eslint-disable jest/no-identical-title */
import {
  surcharge,
  distance,
  numberOfItems,
  maxSurcharge,
  freeDelivery,
  rushHourFee,
  rushHourTime,
  deliveryFeeCalculator
} from './Calculator';

// SURCHARGE TEST
describe('testing surcharge function', () => {
  test('Cart value under 10 should return difference between 10 - cart value', () => {
    expect(surcharge(8.90)).toBe(1.10);
  });
});

describe('testing surcharge function', () => {
  test('Cart value over 10 should return 0', () => {
    expect(surcharge(11)).toBe(0);
  });
});

// DISTANCE TEST

describe('testing distance function', () => {
  test('distance less than or equal to 1000m return 2', () => {
    expect(distance(1000)).toBe(2);
  });
});

describe('testing distance function', () => {
  test('return delivery fee: 1001 and 1499', () => {
    expect(distance(1499)).toBe(3);
  });
});

describe('testing distance function', () => {
  test('return delivery fee: 1500m', () => {
    expect(distance(1500)).toBe(3);
  });
});

describe('testing distance function', () => {
  test('return delivery fee: 1501m to 1999m', () => {
    expect(distance(1600)).toBe(4);
  });
});

// Cart Items Count

describe('testing cartItemsCount function', () => {
  test('cart count under 5', () => {
    expect(numberOfItems(4)).toBe(0);
  });
});

describe('testing cartItemsCount function', () => {
  test('cart count : 5', () => {
    expect(numberOfItems(5)).toBe(.5);
  });
});

describe('testing cartItemsCount function', () => {
  test('cart count: 10', () => {
    expect(numberOfItems(10)).toBe(3);
  });
});

describe('testing cartItemsCount function', () => {
  test('cart count: 13', () => {
    expect(numberOfItems(13)).toBe(5.70);
  });
});


// MAX SURCHARGE

describe('testing maxSurcharge function', () => {
  test('Max surcharge: over 15', () => {
    expect(maxSurcharge(16)).toBe(15);
  });
});

describe('testing maxSurcharge function', () => {
  test('Max surcharge: under 15', () => {
    expect(maxSurcharge(13.60)).toBe(13.60);
  });
});

// FREE DELIVERY

describe('testing freeDelivery function', () => {
  test('No delivery fee if cart value is 100 or more', () => {
    expect(freeDelivery(100)).toBe(0)
  });
});

// RUSH HOUR FEE

describe('testing rushHourFee function', () => {
  test('deilvery fee at rush hour over €15', () => {
    expect(rushHourFee(17)).toBe(15)
  });
});

describe('testing rushHourFee function', () => {
  test('deilvery fee at rush hour under €15', () => {
    expect(rushHourFee(10.50)).toBe(12.60)
  });
});

// RUSH HOUR TIME

describe('testing rushHourTime function', () => {
  test('delivery time is a friday UTC', () => {
    const date: Date = new Date(2023, 0o2, 0o3, 17)
    expect(rushHourTime(date)).toBe(true)
  });
});

describe('testing rushHourTime function', () => {
  test('delivery time between 15 and 19', () => {
    const date: Date = new Date(2023, 0o2, 0o3, 17)
    expect(rushHourTime(date)).toBe(true)
  });
});

describe('testing rushHourTime function', () => {
  test('delivery time is not a friday UTC', () => {
    const date: Date = new Date(2023, 0o2, 0o4, 17)
    expect(rushHourTime(date)).toBe(false)
  });
});

describe('testing rushHourTime function', () => {
  test('delivery time outside 15 and 19', () => {
    const date: Date = new Date(2023, 0o2, 0o3, 12)
    expect(rushHourTime(date)).toBe(false)
  });
});

// DELIVERY FEE CALCULATOR

describe('testing deliveryFeeCalculator', () => {
  test('Testing: rush hour, distance under 1000m, items count at 10, cart value under 10', () => {
    const orderTime: Date = new Date(2023, 0o2, 0o3, 16)
    const meters = 500
    const itemCount = 10
    const cartValue = 8.90
    expect(deliveryFeeCalculator(cartValue, meters, itemCount, orderTime)).toBe(7.32)
  });
});

describe('testing deliveryFeeCalculator', () => {
  test('Testing: no rush, distance 1501m, items count at 10, cart value above 10', () => {
    const orderTime: Date = new Date(2023, 0o2, 0o4, 16)
    const meters = 1501
    const itemCount = 10
    const cartValue = 30
    expect(deliveryFeeCalculator(cartValue, meters, itemCount, orderTime)).toBe(7)
  });
});

describe('testing deliveryFeeCalculator', () => {
  test('Testing: max surcharge', () => {
    const orderTime: Date = new Date(2023, 0o2, 0o3, 16)
    const meters = 1501
    const itemCount = 13
    const cartValue = 1.10
    expect(deliveryFeeCalculator(cartValue, meters, itemCount, orderTime)).toBe(15)
  });
});
