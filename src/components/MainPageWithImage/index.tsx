type IMainPageWithImageProps = {
  title: React.ReactNode;
  children: React.ReactNode;
  fitImageToDisplayHeight?: boolean;
};

function getImageHeight(fitImageToDisplayHeight?: boolean) {
  return " " + (fitImageToDisplayHeight ? "h-screen" : "");
}

export function MainPageWithImage({
  title,
  children,
  fitImageToDisplayHeight,
}: IMainPageWithImageProps) {
  return (
    <div>
      <div className="flex justify-between gap-4">
        <div className="mx-auto max-w-90 basis-full px-4 py-6 md:basis-65/100">
          <div className="mb-7.5 flex flex-col items-center gap-8">
            <img
              src="logo.png"
              alt="Logo da prefeitura de Patrocínio"
              className="h-18 md:h-24"
            />
            <h1 className="text-primary-dark text-2xl font-bold">
              Protocolo Web
            </h1>
            <h2 className="text-primary-dark font-regular text-2xl uppercase">
              {title}
            </h2>
          </div>

          {children}
        </div>

        <div
          className={
            "hidden w-full basis-45/100 md:block" +
            getImageHeight(fitImageToDisplayHeight)
          }
        >
          <img
            src="paisagem.png"
            alt="Paisagem com uma igreja"
            className="size-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
