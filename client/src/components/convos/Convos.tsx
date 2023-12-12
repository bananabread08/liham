import { CreateConvoModal } from './CreateConvoModal'

export const Convos = () => {
  return (
    <section>
      <div className="h-screen bg-emerald-300">
        <h1>Convos</h1>
        <CreateConvoModal />
      </div>
    </section>
  )
}
