import React from 'react'
import Modal from '../../../components/Modal'

interface PatientInfo {
  avatar?: string
  fullName?: string
  gender?: string
  birthdate?: string
  phone?: string
  nationality?: string
  address?: string
  id?: string
  isOpen: Boolean
  onClickOutside: Function
}

const ShowModal: React.FC<PatientInfo> = ({
  avatar,
  fullName,
  gender,
  birthdate = new Date(),
  phone,
  nationality,
  address,
  id,
  isOpen,
  onClickOutside,
}) =>
  //   console.log(isOpen)
  isOpen && (
    <Modal onClickOutside={() => onClickOutside()}>
      <div className="">
        <div>
          <img
            className="mx-auto relative transform -translate-y-1/2 rounded-full"
            src={avatar}
            alt="patient-avatar"
          />
        </div>
        <h3 className="text-center transform -translate-y-1/2 font-extrabold">
          {fullName}
        </h3>
        <div className="px-16 py-5">
          <div className="flex">
            <p className="lg:mr-5 font-bold">Gênero:</p>
            <p className="ml-auto">{gender}</p>
          </div>
          <div className="flex">
            <p className="lg:mr-5 font-bold">Nascimento:</p>
            <p className="ml-auto">
              {birthdate
                ? `${new Date(birthdate).toLocaleDateString()}`
                : 'Não cadastrado'}
            </p>
          </div>
          <div className="flex">
            <p className="lg:mr-5 font-bold">Telefone</p>
            <p className="ml-auto">{phone}</p>
          </div>
          <div className="flex">
            <p className="lg:mr-5 font-bold">Nacionalidade</p>
            <p className="ml-auto">{nationality}</p>
          </div>
          <div className="flex">
            <p className="lg:mr-5 font-bold">Endereço:</p>
            <p className="ml-auto">{address}</p>
          </div>
          <div className="flex">
            <p className="lg:mr-5 font-bold">ID:</p>
            <p className="ml-auto">{id}</p>
          </div>
        </div>
      </div>
    </Modal>
  )

export default ShowModal
