import { atom } from "recoil";

// Defining the interface for the state of the authentication modal.
export interface AuthModalState {
  open: boolean; // A boolean flag indicating whether the modal is open or closed.
  view: ModalView; // A type representing the view of the modal: "login", "signup", or "resetPassword".
}

// Defining a type 'ModalView' as a union of specific string literals.
export type ModalView = "login" | "signup" | "resetPassword";

// Creating a default state for the authentication modal.
const defaultModalState: AuthModalState = {
  open: false,
  view: "login", // The default view is set to "login" when the modal is first initialized.
};

// Defining an atom named 'authModalState' using the 'atom' function from Recoil.
// The atom holds the state of the authentication modal.
export const authModalState = atom<AuthModalState>({
  key: "authModalState", // A unique key to identify this atom in Recoil.
  default: defaultModalState, // The default state of the atom when no value is set.
});
