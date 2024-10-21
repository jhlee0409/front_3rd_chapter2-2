import { cloneElement, createContext, useCallback, useContext, useMemo, useState } from "react";

type AccordionContextType = {
  isOpen: boolean;
  toggleAccordion: () => void;
};

// AccordionContext
const AccordionContext = createContext<AccordionContextType | undefined>(undefined);

type AccordionProviderProps = {
  children: ({ open, toggle }: { open: boolean; toggle: () => void }) => React.ReactNode;
};

// useAccordionContext
const useAccordionContext = () => {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error("useAccordion must be used within an AccordionProvider");
  }
  return context;
};

type AccordionTriggerProps = {
  children: React.ReactElement;
};

// AccordionProvider
const AccordionProvider = ({ children }: AccordionProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = useCallback(() => {
    setIsOpen((p) => !p);
  }, []);

  const values = useMemo(() => ({ isOpen, toggleAccordion }), [isOpen]);

  return (
    <AccordionContext.Provider value={values}>
      {children({ open: isOpen, toggle: toggleAccordion })}
    </AccordionContext.Provider>
  );
};

// AccordionTrigger
const AccordionTrigger = ({ children }: AccordionTriggerProps) => {
  const { toggleAccordion } = useAccordionContext();

  return cloneElement(children as React.ReactElement, { onClick: toggleAccordion });
};

type AccordionContentProps = {
  children: React.ReactNode;
};

// AccordionContent
const AccordionContent = ({ children }: AccordionContentProps) => {
  const { isOpen } = useAccordionContext();
  return isOpen ? children : null;
};

const Accordion = {
  Container: AccordionProvider,
  Trigger: AccordionTrigger,
  Content: AccordionContent,
};

export default Accordion;
