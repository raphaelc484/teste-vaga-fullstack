export function parseDate(dateString: string): Date | null {
  if (!dateString || dateString.length !== 8) {
    return null
  }

  const year = parseInt(dateString.substring(0, 4), 10)
  const month = parseInt(dateString.substring(4, 6), 10) - 1
  const day = parseInt(dateString.substring(6, 8), 10)

  return new Date(year, month, day)
}

export function formatDateToString(date: Date): string {
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear().toString()

  return `${day}/${month}/${year}`
}
