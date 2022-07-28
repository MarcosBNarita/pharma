/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react'
import Modal from '../../../components/Modal'
import api from '../../../services/api'

interface PatientInfo {
  id?: string
  isOpen: Boolean
  onClickOutside: Function
  onSuccess: Function
}

interface Patient {
  gender: string
  name: {
    title: string
    first: string
    last: string
  }
  location: {
    street: {
      number: number
      name: string
    }
    city: string
    state: string
    postcode: string
    coordinates: {
      latitude: string
      longitude: string
    }
    timezone: {
      offset: string
      description: string
    }
  }
  email: string
  login: {
    uuid: string
    username: string
    password: string
    salt: string
    md5: string
    sha1: string
    sha256: string
  }
  dob: {
    date: string
    age: number
  }
  registered: {
    date: string
    age: number
  }
  phone: string
  cell: string
  _id: string
  picture: {
    large: string
    medium: string
    thumbnail: string
  }
  nat: string
}

const EditModal: React.FC<PatientInfo> = ({
  isOpen,
  onClickOutside,
  id,
  onSuccess,
}) => {
  const [patient, setPatient] = useState<Patient>({} as Patient)

  async function getPatient() {
    const response = await api.get<Patient>(`/patients/${id}`)

    setPatient(response.data)
  }

  async function updatePatient() {
    const response = await api.put(`/patients/${id}`, patient, {})

    if (response.data) {
      onClickOutside()
      onSuccess()
    }
  }

  useEffect(() => {
    if (isOpen) {
      getPatient()
    }
  }, [id, isOpen])

  return (
    isOpen && (
      <Modal onClickOutside={() => onClickOutside()}>
        <div className="">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 mt-5 mx-7">
            <div className="grid grid-cols-1">
              <label
                className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold"
                htmlFor="text"
              >
                Nome
              </label>
              <input
                className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                type="text"
                value={patient?.name?.first}
                onChange={(event) => {
                  const pat = { ...patient }
                  pat.name.first = event.target.value
                  setPatient(pat)
                }}
                id="text"
                name="name"
                placeholder="Nome"
              />
            </div>
            <div className="grid grid-cols-1">
              <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">
                Sobrenome
              </label>
              <input
                className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                type="text"
                value={patient?.name?.last}
                onChange={(event) => {
                  const pat = { ...patient }
                  pat.name.last = event.target.value
                  setPatient(pat)
                }}
                placeholder="Sobrenome"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 mt-5 mx-7">
            <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">
              Email
            </label>
            <input
              className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              value={patient?.email}
              onChange={(event) => {
                const pat = { ...patient }
                pat.email = event.target.value
                setPatient(pat)
              }}
              type="email"
              placeholder="Email"
            />
          </div>
          <div className="grid grid-cols-1 mt-5 mx-7">
            <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">
              Gênero
            </label>
            <select
              value={patient?.gender}
              onChange={(event) => {
                const pat = { ...patient }
                pat.gender = event.target.value
                setPatient(pat)
              }}
              className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            >
              <option value="male">Masculino</option>
              <option value="female">Feminino</option>
            </select>
          </div>
          <div className="grid grid-cols-1 mt-5 mx-7">
            <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">
              Nascimento
            </label>
            <input
              className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              type="date"
              value={patient?.dob?.date}
              onChange={(event) => {
                const pat = { ...patient }
                pat.dob.date = event.target.value
                setPatient(pat)
              }}
              placeholder="dd/mm/aaaa"
            />
          </div>
          <div className="grid grid-cols-1 mt-5 mx-7">
            <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">
              Telefone
            </label>
            <input
              className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              value={patient?.phone}
              onChange={(event) => {
                const pat = { ...patient }
                pat.phone = event.target.value
                setPatient(pat)
              }}
              type="text"
              placeholder="(xx) xxxxx-xxxx"
            />
          </div>
          <div className="grid grid-cols-1 mt-5 mx-7">
            <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">
              Nacionalidade
            </label>
            <input
              className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              value={patient?.nat}
              onChange={(event) => {
                const pat = { ...patient }
                pat.nat = event.target.value
                setPatient(pat)
              }}
              type="text"
              placeholder="Ex: BR"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 mt-5 mx-7">
            <div className="grid grid-cols-1">
              <label
                className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold"
                htmlFor="text"
              >
                Rua
              </label>
              <input
                className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                type="text"
                value={patient?.location?.street?.name}
                onChange={(event) => {
                  const pat = { ...patient }
                  pat.location.street.name = event.target.value
                  setPatient(pat)
                }}
                id="text"
                name="name"
                placeholder="Rua"
              />
            </div>
            <div className="grid grid-cols-1">
              <label className="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold">
                Número do endereço
              </label>
              <input
                className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                value={patient?.location?.street.number}
                onChange={(event) => {
                  const pat = { ...patient }
                  pat.location.street.number = Number(event.target.value)
                  setPatient(pat)
                }}
                type="number"
                placeholder="Número"
              />
            </div>
            <div className="flex mx-auto items-center justify-center  md:gap-8 gap-4 pt-5 pb-5">
              <button
                type="button"
                className="w-auto bg-gray-500 hover:bg-gray-700 rounded-lg shadow-xl font-medium text-white px-4 py-2"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => updatePatient()}
                className="w-auto bg-blue-500 hover:bg-blue-700 rounded-lg shadow-xl font-medium text-white px-4 py-2"
              >
                Atualizar
              </button>
            </div>
          </div>
        </div>
      </Modal>
    )
  )
}

export default EditModal
