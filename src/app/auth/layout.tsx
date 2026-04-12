// TODO: удалить next-themes
import { images } from "@/src/assets";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`flex justify-center items-center h-dvh `}>
      <div className="flex justify-center w-[95%] md:max-w-100">
        <div className="flex flex-col items-center w-full">
          <div className="flex flex-col items-center justify-between w-[95%] mb-5 sm:mb-8">
            <img
              src={images.logo}
              alt="logo"
              className="w-12 sm:w-20 mb-3 sm:mb-5"
            />
            <h1 className="text-2xl sm:text-3xl font-semibold">
              ChikiBrikiGramm
            </h1>
            <h2 className="sm:text-md text-base">by kowaldiv</h2>
          </div>
          <div className="w-[95%]">{children}</div>
        </div>
      </div>
    </div>
  );
}
