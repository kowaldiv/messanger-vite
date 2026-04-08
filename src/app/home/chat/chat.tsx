import { images } from "@/src/assets";

export function Chat() {
  return (
    <div
      className="flex flex-1 h-full"
      style={{ backgroundImage: `url(${images.background})` }}
    ></div>
  );
}
