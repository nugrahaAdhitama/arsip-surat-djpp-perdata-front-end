import React from "react";

const Main: React.FC<any> = ({ active, description, children }) => {
  return (
    <section className="p-16 w-full h-screen overflow-scroll scrollbar-hide">
      <div className="flex flex-col gap-2 mb-3">
        <h1 className="font-semibold text-primary text-3xl md:text-[50px] md:w-[90%] md:leading-[100%] leading-[150%]">
          {active}
        </h1>

        <p className="text-tersier text-sm lg:text-base md:w-[65%]">
          {description}
        </p>
      </div>

      <div>{children}</div>
    </section>
  );
};

export default Main;
