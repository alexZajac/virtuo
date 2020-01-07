'use strict';

//list of cars
//useful for ALL 5 steps
//could be an array of objects that you fetched from api or database
const cars = [{
  'id': 'a9c1b91b-5e3d-4cec-a3cb-ef7eebb4892e',
  'name': 'fiat-500-x',
  'pricePerDay': 36,
  'pricePerKm': 0.10
}, {
  'id': '697a943f-89f5-4a81-914d-ecefaa7784ed',
  'name': 'mercedes-class-a',
  'pricePerDay': 44,
  'pricePerKm': 0.30
}, {
  'id': '4afcc3a2-bbf4-44e8-b739-0179a6cd8b7d',
  'name': 'bmw-x1',
  'pricePerDay': 52,
  'pricePerKm': 0.45
}];

//list of current rentals
//useful for ALL steps
//the time is hour
//The `price` is updated from step 1 and 2
//The `commission` is updated from step 3
//The `options` is useful for step 4
const rentals = [{
  'id': '893a04a3-e447-41fe-beec-9a6bfff6fdb4',
  'driver': {
    'firstName': 'Roman',
    'lastName': 'Frayssinet'
  },
  'carId': 'a9c1b91b-5e3d-4cec-a3cb-ef7eebb4892e',
  'pickupDate': '2020-01-02',
  'returnDate': '2020-01-02',
  'distance': 100,
  'options': {
    'deductibleReduction': false
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'virtuo': 0
  }
}, {
  'id': 'bc16add4-9b1d-416c-b6e8-2d5103cade80',
  'driver': {
    'firstName': 'Redouane',
    'lastName': 'Bougheraba'
  },
  'carId': '697a943f-89f5-4a81-914d-ecefaa7784ed',
  'pickupDate': '2020-01-05',
  'returnDate': '2020-01-09',
  'distance': 300,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'virtuo': 0
  }
}, {
  'id': '8c1789c0-8e6a-48e3-8ee5-a6d4da682f2a',
  'driver': {
    'firstName': 'Fadily',
    'lastName': 'Camara'
  },
  'carId': '4afcc3a2-bbf4-44e8-b739-0179a6cd8b7d',
  'pickupDate': '2019-12-01',
  'returnDate': '2019-12-15',
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'virtuo': 0
  }
}];

//list of actors for payment
//useful from step 5
const actors = [{
  'rentalId': '893a04a3-e447-41fe-beec-9a6bfff6fdb4',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'partner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'virtuo',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': 'bc16add4-9b1d-416c-b6e8-2d5103cade80',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'partner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'virtuo',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': '8c1789c0-8e6a-48e3-8ee5-a6d4da682f2a',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'partner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'virtuo',
    'type': 'credit',
    'amount': 0
  }]
}];

// STEP: 1

// gets time component from rental object
const getTimeComponent = (carId, pickupDate, returnDate) => {
  let pricePerDay = 0;
  cars.forEach(c => {
    if(c.id === carId){
      pricePerDay = c.pricePerDay
      return
    }
  })
  // getting the number of days rent
  const diffDays = numberofDays(pickupDate, returnDate);
  return pricePerDay * diffDays;
}

const numberofDays = (pickupDate, returnDate) => {
  const date1 = new Date(pickupDate);
  const date2 = new Date(returnDate);
  return parseInt((date2 - date1) / (1000 * 60 * 60 * 24), 10) + 1; 
}

// return distance from rental object if definded
const getDistanceComponent = rental => rental.distance !== undefined ? rental.distance : 0;

const computeRentalPrice = () => (
  rentals.map(r => {
    const { carId, pickupDate, returnDate } = r;
    const timeComponent = getTimeComponent(carId, pickupDate, returnDate);
    const distanceComponent = getDistanceComponent(r)
    return { ...r, price: timeComponent + distanceComponent }
  })
)
console.log("RENTAL PRICE STEP 1: ", computeRentalPrice())


// STEP 2
const updateRentalprice = () => {
  const computedPrices = computeRentalPrice();
  return computedPrices.map(r => {
    let { price, pickupDate, returnDate } = r;
    const diffDays = numberofDays(pickupDate, returnDate);
    if(diffDays > 1 && diffDays <= 4)
        price *= 0.9
    else if(diffDays > 4 && diffDays <= 10)
        price *= 0.7
    else  
        price *= 0.5
    return { ...r, price }
  })
}
console.log("RENTAL PRICE STEP 2: ", updateRentalprice())


// STEP 3
const updatePriceWithCommission = () => {
  const updatedPrices = updateRentalprice()
  return updatedPrices.map(r => {
    let { price, pickupDate, returnDate } = r;
    const diffDays = numberofDays(pickupDate, returnDate);
    let commissionTotal = 0.3 * price;
    const insurance = commissionTotal/2;
    const treasury = diffDays;
    const virtuo = commissionTotal/2 - diffDays
    const commission = {
      "insurance": insurance,
      "treasury": treasury,
      "virtuo": virtuo
    }
    return { ...r, commission }
  })
}
console.log("RENTAL PRICE STEP 3: ", updatePriceWithCommission())


// STEP 4:
const updatePriceWithDeductible = () => {
  const updatedPrices = updatePriceWithCommission();
  return updatedPrices.map(r => {
    let { price, options, returnDate, pickupDate, commission } = r;
    const { deductibleReduction } = options;
    // add 4 euro per day for each rental day if deductible
    if(deductibleReduction){
        const diffDays = numberofDays(pickupDate, returnDate);
        const to_add = (diffDays * 4)
        price += to_add
        commission.virtuo += to_add;
    }
    return { ...r, price, commission }
  })
}
console.log("RENTAL PRICE STEP 4: ", updatePriceWithDeductible())

// STEP 5:
const computeActorsFlows = () => {
  const updatedPrices = updatePriceWithDeductible();
  return actors.map(a => {
    const { payment } = a;
    const newPayments = payment.map(p => {
        const rental = updatedPrices.filter(r => r.id == a.rentalId);
        const { price, commission } = rental[0];
        const { who } = p;
        let amount;
        if(who === "driver")
            amount = price;
        else if(who === "partner")
            amount = 0.7*price;
        else if(who === "insurance")
            amount = commission.insurance
        else if(who === "treasury")
            amount = commission.treasury
        else
            amount = commission.virtuo
        return { ...p, amount }
    })
    return { ...a, payment: newPayments }
  })
}
console.log("RENTAL PRICE STEP 5: ", computeActorsFlows())



