export default function NotFoundPage() {
  return (
    <div className="h-dvh flex items-center justify-center">
      <h1 className="sm:text-8xl text-5xl flex flex-col sm:gap-6 gap-2 items-center">
        <span className="text-primary">404</span>
        <span className="sm:text-4xl text-xl">
          Страница не найдена (⌐<span className="text-primary">■</span>_
          <span className="text-primary">■</span>)
        </span>
      </h1>
    </div>
  );
}
