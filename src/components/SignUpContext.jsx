import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import SignUpModal from './SignUpModal'

const SignUpContext = createContext()

export function useSignUp() {
  return useContext(SignUpContext)
}

function JoinDeepLinkHandler({ openOfficial, openSpecial }) {
  const location = useLocation()

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const join = params.get('join')
    const hash = location.hash.replace('#', '')

    let mode = null
    if (join === 'official' || hash === 'join' || hash === 'battle-apply') mode = 'official'
    else if (join === 'special') mode = 'special'

    if (!mode) return

    if (mode === 'official') openOfficial()
    else openSpecial()

    const url = new URL(window.location.href)
    url.searchParams.delete('join')
    if (hash === 'join' || hash === 'battle-apply') url.hash = ''
    window.history.replaceState(null, '', `${url.pathname}${url.search}${url.hash}`)
  }, [location.pathname, location.search, location.hash, openOfficial, openSpecial])

  return null
}

/**
 * Open options:
 * - openOfficial() / openSpecial()
 * - openBattle({ type, battleLabel, date, title })
 */
export function SignUpProvider({ children }) {
  const [modalState, setModalState] = useState({
    isOpen: false,
    type: 'official',
    preset: null,
  })

  const openOfficial = useCallback(
    () => setModalState({ isOpen: true, type: 'official', preset: null }),
    [],
  )
  const openSpecial = useCallback(
    () => setModalState({ isOpen: true, type: 'special', preset: null }),
    [],
  )
  const openBattle = useCallback((battle) => {
    if (!battle) {
      setModalState({ isOpen: true, type: 'official', preset: null })
      return
    }
    const typeMap = {
      'Daily Godsent': 'Official Godsent Box Battle',
      'Most Beautiful': 'Most Beautiful Box Battle',
      Country: 'Country Box Battle',
      Scavengers: 'Scavengers Box Games',
      'Champion of Champions': 'Champion of Champions',
      'Lowest Coins': 'Lowest Coins Box Battle',
    }
    const isOfficial =
      battle.type === 'Daily Godsent' ||
      battle.type === 'Champion of Champions' ||
      battle.entryType === 'official'
    const battleLabel =
      battle.battleLabel ||
      typeMap[battle.type] ||
      battle.title ||
      battle.type ||
      (isOfficial ? 'Official Godsent Box Battle' : '')
    const entryIsOfficial =
      isOfficial || battleLabel === 'Official Godsent Box Battle'
    setModalState({
      isOpen: true,
      type: entryIsOfficial ? 'official' : 'special',
      preset: {
        battleLabel,
        battleType: battle.type || '',
        date: battle.date || '',
        title: battle.title || battleLabel,
      },
    })
  }, [])
  const close = useCallback(
    () => setModalState({ isOpen: false, type: 'official', preset: null }),
    [],
  )

  return (
    <SignUpContext.Provider value={{ openOfficial, openSpecial, openBattle, close }}>
      {children}
      <JoinDeepLinkHandler openOfficial={openOfficial} openSpecial={openSpecial} />
      <SignUpModal
        type={modalState.type}
        preset={modalState.preset}
        isOpen={modalState.isOpen}
        onClose={close}
      />
    </SignUpContext.Provider>
  )
}
