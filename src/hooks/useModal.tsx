import {
  createContext, Dispatch, FC, ReactNode, SetStateAction, useContext, useState
} from "react";

interface modalContent {
  setModal: Dispatch<SetStateAction<JSX.Element>> | undefined;
}

let modalContext = createContext<modalContent>({
  setModal: undefined,
});

interface props {
  children: ReactNode | ReactNode[];
}
export let ModalProvider: FC<props> = ({ children }) => {
  let [modal, setModal] = useState(<div />);

  return (
    <modalContext.Provider value={{ setModal: setModal }}>
      {modal}
      {children}
    </modalContext.Provider>
  );
};

let useModal = (modal: JSX.Element) => {
  let { setModal } = useContext(modalContext);

  if (setModal === undefined) {
    console.error("useModal reference outside of a modal context");
    return () => {};
  }

  return () => setModal!(modal);
};

export default useModal;
