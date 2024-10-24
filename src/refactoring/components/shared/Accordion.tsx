import { cloneElement, createContext, useCallback, useContext, useMemo, useState } from "react";

// AccordionContext ========================================================================================

type AccordionContextType = {
  isOpen: boolean;
  toggleAccordion: () => void;
};

type PassThroughProps = {
  open: boolean;
  toggle: () => void;
};

const AccordionContext = createContext<AccordionContextType | undefined>(undefined);

type AccordionProviderProps = {
  children: React.ReactElement | ((props: PassThroughProps) => React.ReactElement);
};

// AccordionProvider ========================================================================================

const AccordionProvider = ({ children }: AccordionProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = useCallback(() => {
    setIsOpen((p) => !p);
  }, []);

  const values = useMemo(() => ({ isOpen, toggleAccordion }), [isOpen]);

  return (
    <AccordionContext.Provider value={values}>
      {typeof children === "function" ? children({ open: isOpen, toggle: toggleAccordion }) : children}
    </AccordionContext.Provider>
  );
};

// AccordionTrigger ========================================================================================

type AccordionTriggerProps = {
  children: React.ReactElement | ((props: PassThroughProps) => React.ReactElement);
};

const AccordionTrigger = ({ children }: AccordionTriggerProps) => {
  const { toggleAccordion } = useAccordionContext();
  return cloneElement(children as React.ReactElement, { onClick: toggleAccordion });
};

// AccordionContent ========================================================================================

type AccordionContentProps = {
  children: React.ReactNode;
};

const AccordionContent = ({ children }: AccordionContentProps) => {
  const { isOpen } = useAccordionContext();
  return isOpen ? children : null;
};

// useAccordionContext ========================================================================================

const useAccordionContext = () => {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error("useAccordion must be used within an AccordionProvider");
  }
  return context;
};

// Accordion ========================================================================================

const Accordion = {
  Container: AccordionProvider,
  Trigger: AccordionTrigger,
  Content: AccordionContent,
};

export default Accordion;
