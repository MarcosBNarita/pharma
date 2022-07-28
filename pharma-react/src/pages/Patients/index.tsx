/* eslint-disable no-param-reassign */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import swal from 'sweetalert'
import Table from '../../components/Table'
import { ReactComponent as SearchIcon } from '../../assets/icons/search-icon.svg'
import api from '../../services/api'
import ShowModal from './ShowModal'
import EditModal from './EditModal'

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

interface RouteParams {
  page: string
  limit: string
}

interface PatientsPage extends RouteComponentProps<RouteParams> {}

const Patients: React.FC<PatientsPage> = (props) => {
  const [patients, setPatients] = useState<Patient[]>([])
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>([])
  const [patient, setPatient] = useState<Patient>()
  const [modalShow, setModalShow] = useState<boolean>(false)
  const [editId, setEditId] = useState<string>('')
  const [modalEdit, setModalEdit] = useState<boolean>(false)
  const [pageLimit, setPageLimit] = useState<number>(10)
  const [total, setTotal] = useState<number>(500)

  async function getPatients() {
    const response = await api.get<{ total: number; results: Patient[] }>(
      `/patients?page=${props.match.params.page}`
    )

    setTotal(response.data.total)
    setPatients(response.data.results)
    setFilteredPatients(response.data.results)
  }

  function toggleModalShow(patientInfo: Patient) {
    setPatient(patientInfo)
    setModalShow(true)
  }

  function toggleModalEdit(patientInfo: Patient) {
    setEditId(patientInfo._id)
    setModalEdit(true)
  }

  async function deleteItem(item: Patient) {
    const willDelete = await swal({
      title: 'Are you sure?',
      text: 'Are you sure that you want to delete this patient?',
      icon: 'warning',
      dangerMode: true,
    })

    if (willDelete) {
      try {
        api.delete(`/patients/${item._id}`)
        await getPatients()
        swal('Deleted!', 'Your imaginary file has been deleted!', 'success')
      } catch (error) {
        swal('Oops!', 'There was an error deleting the patient!', 'error')
      }
    }
  }

  const columns = [
    {
      name: 'Nome',
      selector: 'name',
      action: (row: any) => <p>{`${row.name.first} ${row.name.last}`}</p>,
    },
    {
      name: 'Genero',
      selector: 'gender',
      action: (row: any) =>
        row.gender === 'male' ? <p>Masculino</p> : <p>Feminino</p>,
    },
    {
      name: 'Nascimento',
      selector: 'birth',
      action: (row: any) => (
        <p>{`${new Date(row.dob.date).toLocaleDateString()}`}</p>
      ),
    },
    {
      name: 'Ações',
      selector: 'action',
      action: (row: any) => (
        <div>
          <button
            onClick={() => toggleModalShow(row)}
            type="button"
            className="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Mostrar
          </button>
          <button
            onClick={() => toggleModalEdit(row)}
            type="button"
            className="mr-2 bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
          >
            Editar
          </button>
          <button
            onClick={() => deleteItem(row)}
            type="button"
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Deletar
          </button>
        </div>
      ),
    },
  ]

  function nextPage() {
    const page = Number(props.match.params.page)
    if (page * 50 <= total) {
      props.history.push(`/${page + 1}/10`)
      setPageLimit(1 * 10)
    }
  }

  function filter(value: string) {
    let patientsArr = [...patients]
    patientsArr = patientsArr.filter(
      (item) =>
        item.name.first.toLowerCase().includes(value.toLowerCase()) ||
        item.name.last.toLowerCase().includes(value.toLowerCase())
    )
    setFilteredPatients(patientsArr)
  }

  useEffect(() => {
    const { limit } = props.match.params
    getPatients()
    setPageLimit(Number(limit))
  }, [props])

  return (
    <div className="align-center lg:w-6/12 mx-auto">
      <ShowModal
        avatar={patient?.picture?.large}
        fullName={`${patient?.name.first} ${patient?.name.last}`}
        gender={patient?.gender === 'male' ? 'Masculino' : 'Feminino'}
        birthdate={patient?.dob.date}
        phone={patient?.phone}
        nationality={patient?.nat}
        address={`${patient?.location.street.name}, ${patient?.location?.street?.number}`}
        id={patient?._id}
        isOpen={modalShow}
        onClickOutside={() => setModalShow(false)}
      />
      <EditModal
        onSuccess={() => getPatients()}
        isOpen={modalEdit}
        id={editId}
        onClickOutside={() => setModalEdit(false)}
      />
      <h1 className="lg:mt-3 text-center font-bold text-2xl">Pacientes</h1>
      <h3 className="lg:mb-3 text-center font-bold text-xl">
        Lista de todos os pacientes cadastrados no sistema
      </h3>
      <div className="mb-4 w-auto lg:mb-10">
        <div className="relative flex w-full flex-wrap items-stretch mb-3">
          <input
            type="text"
            onChange={(e) => filter(e.target.value)}
            placeholder="Placeholder"
            className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border-2 border-gray-400 w-full pr-10"
          />
          <span className="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 right-0 pr-3 py-3">
            <SearchIcon />
          </span>
        </div>
      </div>

      <Table
        data={filteredPatients}
        columns={columns}
        pageLimit={pageLimit}
        nextPage={() => nextPage()}
        loadMore={() => {
          setPageLimit(pageLimit + 10)
          props.history.push(
            `/${props.match.params.page}/${
              Number(props.match.params.limit) + 10
            }`
          )
        }}
      />
    </div>
  )
}

export default Patients
