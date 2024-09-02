import React from "react";

const HeaderTop = () => {
  return (
    <section className="mx-auto flex flex-col items-start gap-2 px-4 py-8 md:py-12 md:pb-8 lg:py-12 lg:pb-10">
      <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1]">
        Build your component library
      </h1>
      <p className="max-w-2xl text-lg font-light text-foreground">
        Beautifully designed components that you can copy and paste into your
        apps.
      </p>
    </section>
  );
};

export default HeaderTop;
