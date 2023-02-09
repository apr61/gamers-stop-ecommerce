export function unCreateRouterPath(path) {
  let pathArray = path.split('-')
  if (pathArray.length > 0) {
    return pathArray.join(' ')
  }
  return path
}

export function createRouterPath(path) {
  path = path.toLowerCase()
  let pathArray = path.split(' ')
  if (pathArray.length > 0) {
    return pathArray.join('-')
  }
  return path
}

export function currencyFormatter(number) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(number)
}

export function dateFormatter(date) {
  return new Intl.DateTimeFormat('utc', { dateStyle: 'full'}).format(date)
}

export function deliveryDateSetter(number){
  const date = new Date()
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + number,date.getDay())
}