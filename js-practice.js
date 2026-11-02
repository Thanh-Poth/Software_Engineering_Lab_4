// 2.1 - Variables and data types
const hospitalName = 'Central Hospital'
let numberOfDoctors = 12
let isOpen = true

console.log(`Welcome to ${hospitalName}! We have ${numberOfDoctors} doctors currently available.`)
console.log(`Hospital open: ${isOpen}`)

numberOfDoctors += 1
console.log(`Updated number of doctors: ${numberOfDoctors}`)

isOpen = false
if (!isOpen) {
  console.log('The hospital is closed.')
}

// 2.2 - Arrays and loops
const doctors = [
  'Dr. Lee',
  'Dr. Khan',
  'Dr. Martin',
  'Dr. Chen',
  'Dr. Garcia'
]

for (const [index, name] of doctors.entries()) {
  console.log(`Doctor #${index + 1}: ${name}`)
}

doctors.push('Dr. Julie')
console.log(`Number of doctors: ${doctors.length}`)

function findDoctor (name) {
  return doctors.includes(name) ? 'Doctor found' : 'Doctor not found'
}

console.log(findDoctor('Dr. Lee'))
console.log(findDoctor('Dr. Unknown'))

// 2.3 - Objects and nested data
const patient = {
  name: 'Alice Martin',
  age: 34,
  conditions: ['diabetes', 'hypertension'],
  doctor: {
    name: 'Dr. Lee',
    specialty: 'Cardiology'
  }
}

console.log(`Doctor: ${patient.doctor.name}`)
console.log(`Number of conditions: ${patient.conditions.length}`)
console.log(`${patient.name} is treated by ${patient.doctor.name} (${patient.doctor.specialty}).`)

patient.conditions.push('anxiety')
console.log('Updated patient:', patient)

// 2.4 - Functions and array filtering
const patients = [
  { id: 1, name: 'Alice', age: 34 },
  { id: 2, name: 'John', age: 45 },
  { id: 3, name: 'Marie', age: 29 }
]

function filterByAge (minAge) {
  return patients.filter(patient => patient.age > minAge)
}

function addPatient (name, age) {
  const newPatient = {
    id: patients.length + 1,
    name,
    age
  }

  patients.push(newPatient)
  return newPatient
}

console.log('Patients older than 30:', filterByAge(30))
console.log('New patient:', addPatient('Emma', 40))
console.log('Updated patients:', patients)

// 2.6 - Error handling and validation
function createAppointment (doctor, patient, date) {
  if (!doctor || !patient || !date) {
    throw new Error('Missing required fields')
  }

  return { doctor, patient, date }
}

try {
  console.log(createAppointment('Dr. Lee', 'Alice', '2026-12-10'))
  console.log(createAppointment('Dr. Lee'))
} catch (err) {
  console.error('Error:', err.message)
}

// 2.7 - Asynchronous code
function getHospitalData () {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ name: hospitalName, uptime: 1234 })
    }, 1000)
  })
}

async function showData () {
  console.log('Fetching hospital data...')
  const data = await getHospitalData()
  console.log('Data loaded:', data)
}

await showData()
