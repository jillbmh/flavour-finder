export default function AccountModal({ isVisible, closeModal }) {
  return (
    <main className={`account-modal-container ${isVisible ? 'open' : ''}`}>
      <h1>LOGIN</h1>
    </main>
  )
}
