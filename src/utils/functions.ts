export function txtSlicer(txt: string, max: number = 120) {
  if (txt.length > max) return `${txt.slice(0, max)}...`;
  return txt;
}

export function numberWithCommas(x: string): string {
  return x?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
