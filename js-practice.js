// Lab 5 - JavaScript practice (run with `node js-practice.js`)

// 2.1 Variables and data types
const hospitalName = 'Central Hospital'
const numberOfDoctors = 12
let isOpen = true

function welcome () {
  if (isOpen) {
    console.log(`Welcome to ${hospitalName}! We have ${numberOfDoctors} doctors currently available.`)
  } else {
    console.log(`${hospitalName} is currently closed. Please come back later.`)
  }
}
welcome()
isOpen = false
welcome()

// 2.2 Arrays and loops
const doctors = ['Dr. Lee', 'Dr. Khan', 'Dr. Martin', 'Dr. Sarah', 'Dr. Amir']
for (const [i, doctor] of doctors.entries()) {
  console.log(`Doctor #${i + 1}: ${doctor}`)
}
doctors.push('Dr. Julie')
console.log(`Doctors count: ${doctors.length}`)

function findDoctor (name) {
  return doctors.includes(name) ? 'Doctor found' : 'Doctor not found'
}
console.log(findDoctor('Dr. Lee'))
console.log(findDoctor('Dr. House'))

// 2.3 Objects and nested data
const patient = {
  name: 'Alice Martin',
  age: 34,
  conditions: ['diabetes', 'hypertension'],
  doctor: { name: 'Dr. Lee', speciality: 'Cardiology' }
}
console.log(patient.doctor.name)
console.log(patient.conditions.length)
console.log(`${patient.name} is treated by ${patient.doctor.name} (${patient.doctor.speciality}).`)
patient.conditions.push('anxiety')
console.log(patient)

// 2.4 Functions and array filtering
const patients = [
  { id: 1, name: 'Alice', age: 34 },
  { id: 2, name: 'John', age: 45 },
  { id: 3, name: 'Marie', age: 29 }
]
const filterByAge = (minAge) => patients.filter(p => p.age > minAge)
const addPatient = (name, age) => {
  patients.push({ id: patients.length + 1, name, age })
}
console.log('Older than 30:', filterByAge(30))
addPatient('Zoe', 51)
console.log('Updated patients:', patients)

// 2.6 Error handling and validation
function createAppointment (doctor, patient, date) {
  if (!doctor || !patient || !date) {
    throw new Error('Missing required fields')
  }
  return { doctor, patient, date }
}
try {
  console.log(createAppointment('Dr. Lee', 'Alice', '2025-03-15'))
  console.log(createAppointment('Dr. Lee'))
} catch (err) {
  console.error('Error:', err.message)
}

// 2.7 Asynchronous code
function getHospitalData () {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ name: 'Central Hospital', uptime: 1234 }), 1000)
  })
}
async function showData () {
  console.log('Fetching hospital data...')
  const data = await getHospitalData()
  console.log('Data loaded:', data)
}
showData()
