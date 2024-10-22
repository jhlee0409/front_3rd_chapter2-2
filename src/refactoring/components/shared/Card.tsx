import React from "react";

type CardContainerProps = {
  children: React.ReactNode;
};

// CardContainer
const CardContainer = ({ children }: CardContainerProps) => {
  return <div className="mt-6 bg-white p-4 rounded shadow">{children}</div>;
};

type CardTitleProps = {
  children: React.ReactNode;
};

// CardTitle
const CardTitle = ({ children }: CardTitleProps) => {
  return <h2 className="text-2xl font-semibold mb-2">{children}</h2>;
};

// compound component
const Card = {
  Container: CardContainer,
  Title: CardTitle,
};

export default Card;
