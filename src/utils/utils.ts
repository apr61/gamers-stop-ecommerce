
export function unCreateRouterPath(path:string) {
  let pathArray = path.split("-");
  if (pathArray.length > 0) {
    return pathArray.join(" ");
  }
  return path;
}

export function createRouterPath(path:string) {
  path = path.toLowerCase();
  let pathArray = path.split(" ");
  if (pathArray.length > 0) {
    return pathArray.join("-");
  }
  return path;
}

export function currencyFormatter(number: number, maxfd:number = 2) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: maxfd,
  }).format(number);
}

export function dateFormatter(date: Date) {
  return new Intl.DateTimeFormat("utc", { dateStyle: "medium" }).format(date);
}

export function deliveryDateSetter(number: number) {
  const date = new Date();
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() + number,
    date.getDay()
  );
}

export function firebaseTimestapFormatter(seconds: number) {
  return new Date(seconds * 1000);
}

export function createSlug(str : string) {
  const timestamp = generateRandomId(20);
  const slug = str
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim();
  return `${slug}-${timestamp}`;
}

function generateRandomId(length = 10) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}