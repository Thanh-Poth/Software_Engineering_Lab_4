const hospitalName = 'Central Hospital'
const numberOfDoctors = 12
let isOpen = true

console.log(hospitalName)
console.log(numberOfDoctors)
console.log(isOpen)
console.log(`Welcome to ${hospitalName}! We have ${numberOfDoctors} doctors currently available.`)

isOpen = false

if (isOpen) {
  console.log('The hospital is open')
} else {
  console.log('The hospital is closed')
}

const doctors = ['Dr. Smith', 'Dr. Johnson', 'Dr. Lee', 'Dr. Patel']

for (let i = 0; i < doctors.length; i++) {
  console.log(`Doctor ${i + 1}: ${doctors[i]}`)
}

doctors.push('Dr. Brown')

console.log(`Number of doctors: ${doctors.length}`)

function findDoctor (name) {
  if (doctors.includes(name)) {
    return `${name} found`
  } else {
    return `${name} not found`
  }
}
console.log(findDoctor('Dr. Lee'))
console.log(findDoctor('Dr. Dupont'))

const patient = {
  name: 'Alice Martin',
  age: 34,
  conditions: ['diabetes', 'hypertension'],
  doctor: {
    name: 'Dr. Lee',
    specialty: 'Cardiology'
  }
}

console.log(patient.name)
console.log(patient.conditions.length)
console.log(`patient.name is treated by ${patient.doctor.name} (${patient.doctor.specialty})`)

patient.conditions.push('anxiety')

console.log(patient)

const patients = [
  { id: 1, name: 'Alice', age: 34 },
  { id: 2, name: 'John', age: 45 },
  { id: 3, name: 'Marie', age: 29 }
]

function filterByAge (minAge) {
  const result = []
  for (let i = 0; i < patients.length; i++) {
    if (patients[i].age >= minAge) {
      result.push(patients[i])
    }
  }
  return result
}

console.log(filterByAge(30))

function addPatient (name, age) {
  patients.push({ id: patients.length + 1, name, age })
}

addPatient('David', 50)
console.log(patients)

function createAppointment (doctor, patient, date) {
  if (!doctor || !patient || !date) {
    throw new Error('Missing required fields')
  }

  return { doctor, patient, date }
}

try {
  console.log(createAppointment('Dr. Lee', 'Alice', '2026-11-02'))
  console.log(createAppointment('Dr. Lee'))
} catch (err) {
  console.error('Error:', err.message)
}
function getHospitalData () {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ name: 'Central Hospital', uptime: 1234 })
    }, 1000)
  })
}

async function showData () {
  console.log('Fetching hospital data...')

  const data = await getHospitalData()

  console.log('Data loaded:', data)
}

showData()
