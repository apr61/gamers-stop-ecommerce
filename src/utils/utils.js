export function unCreateRouterPath(path) {
  let pathArray = path.split('-')
  if (pathArray.length > 0) {
    return pathArray.join(' ')
  }
  return path
}

export function createRouterPath(path) {
  let pathArray = path.split(' ')
  if (pathArray.length > 0) {
    return pathArray.join('-')
  }
  return path
}

export function currencyFormatter(number){
  return new Intl.NumberFormat(undefined).format(number)
}