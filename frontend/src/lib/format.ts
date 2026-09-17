// frontend/src/lib/format.ts
export function formatMinutes(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  return remainingMinutes
    ? `${hours}h ${remainingMinutes}m`
    : `${hours}h`;
}

export function formatDate(
  date: string | Date,
  options?: Intl.DateTimeFormatOptions,
): string {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    ...options,
  }).format(new Date(date));
}

export function getInitials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export function clamp(
  value: number,
  min = 0,
  max = 100,
): number {
  return Math.min(max, Math.max(min, value));
}