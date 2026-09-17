// frontend/src/components/ui/Avatar.tsx
import "./ui.css";

type AvatarProps = {
  name: string;
  imageUrl?: string;
  size?: "sm" | "md" | "lg";
};

export default function Avatar({
  name,
  imageUrl,
  size = "md",
}: AvatarProps) {
  const initials = name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    <div className={`ui-avatar ui-avatar-${size}`} aria-label={name}>
      {imageUrl ? (
        <img src={imageUrl} alt={name} />
      ) : (
        <span>{initials || "?"}</span>
      )}
    </div>
  );
}