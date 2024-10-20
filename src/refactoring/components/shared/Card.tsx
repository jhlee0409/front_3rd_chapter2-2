import React from "react";

type CardContainerProps = {
  children: React.ReactNode;
};

const CardContainer = ({ children }: CardContainerProps) => {
  return <div className="mt-6 bg-white p-4 rounded shadow">{children}</div>;
};

type CardTitleProps = {
  children: React.ReactNode;
};

const CardTitle = ({ children }: CardTitleProps) => {
  return <h2 className="text-2xl font-semibold mb-2">{children}</h2>;
};

const Card = {
  Container: CardContainer,
  Title: CardTitle,
};

export default Card;
