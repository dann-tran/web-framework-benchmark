export interface Item {
  id: number
  label: string
  description: string
}

export interface ItemWithCharFreq extends Item {
  charFreq: {[k: string]: number}
}