import { createContext, useContext, useState, useCallback } from 'react'
import SignUpModal from './SignUpModal'

const SignUpContext = createContext()

export function useSignUp() {
  return useContext(SignUpContext)
}

export function SignUpProvider({ children }) {
  const [modalState, setModalState] = useState({ isOpen: false, type: 'official' })

  const openOfficial = useCallback(() => setModalState({ isOpen: true, type: 'official' }), [])
  const openSpecial = useCallback(() => setModalState({ isOpen: true, type: 'special' }), [])
  const close = useCallback(() => setModalState({ isOpen: false, type: 'official' }), [])

  return (
    <SignUpContext.Provider value={{ openOfficial, openSpecial, close }}>
      {children}
      <SignUpModal
        type={modalState.type}
        isOpen={modalState.isOpen}
        onClose={close}
      />
    </SignUpContext.Provider>
  )
}
