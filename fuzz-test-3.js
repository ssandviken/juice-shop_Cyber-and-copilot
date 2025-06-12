import axios from 'axios'
import { faker } from '@faker-js/faker'

const BASE_URL = 'http://localhost:3000'

const injectionPayloads = [
  "' OR '1'='1",
  "<script>alert(1)</script>",
  "'; DROP TABLE users; --",
  '" onmouseover="alert(1)"',
  "../../etc/passwd",
  "`; exec xp_cmdshell('whoami'); --",
  "${7*7}",
  "<img src=x onerror=alert(1)>",
  "' UNION SELECT NULL--",
  "' OR 1=1--"
]

function randomInjectionOrFaker(fn) {
  return Math.random() < 0.3
    ? injectionPayloads[Math.floor(Math.random() * injectionPayloads.length)]
    : fn()
}

const results = {
  total: 0,
  success: 0,
  fail: 0,
  errors: {}
}

async function fuzzLogin() {
  try {
    await axios.post(`${BASE_URL}/rest/user/login`, {
      email: randomInjectionOrFaker(() => faker.internet.email()),
      password: randomInjectionOrFaker(() => faker.internet.password())
    })
    results.success++
  } catch (e) {
    results.fail++
    const key = e.response?.status || e.message
    results.errors[key] = (results.errors[key] || 0) + 1
  }
  results.total++
}

async function fuzzChangePassword() {
  try {
    await axios.get(`${BASE_URL}/rest/user/change-password`, {
      params: {
        current: randomInjectionOrFaker(() => faker.internet.password()),
        new: randomInjectionOrFaker(() => faker.internet.password())
      }
    })
    results.success++
  } catch (e) {
    results.fail++
    const key = e.response?.status || e.message
    results.errors[key] = (results.errors[key] || 0) + 1
  }
  results.total++
}

async function fuzzResetPassword() {
  try {
    await axios.post(`${BASE_URL}/rest/user/reset-password`, {
      email: randomInjectionOrFaker(() => faker.internet.email()),
      answer: randomInjectionOrFaker(() => faker.lorem.word())
    })
    results.success++
  } catch (e) {
    results.fail++
    const key = e.response?.status || e.message
    results.errors[key] = (results.errors[key] || 0) + 1
  }
  results.total++
}

async function fuzzSecurityQuestion() {
  try {
    await axios.get(`${BASE_URL}/rest/user/security-question`, {
      params: {
        email: randomInjectionOrFaker(() => faker.internet.email())
      }
    })
    results.success++
  } catch (e) {
    results.fail++
    const key = e.response?.status || e.message
    results.errors[key] = (results.errors[key] || 0) + 1
  }
  results.total++
}

async function fuzzWhoami() {
  try {
    await axios.get(`${BASE_URL}/rest/user/whoami`)
    results.success++
  } catch (e) {
    results.fail++
    const key = e.response?.status || e.message
    results.errors[key] = (results.errors[key] || 0) + 1
  }
  results.total++
}

async function fuzzSearchProducts() {
  try {
    await axios.get(`${BASE_URL}/rest/products/search`, {
      params: { q: randomInjectionOrFaker(() => faker.commerce.productName()) }
    })
    results.success++
  } catch (e) {
    results.fail++
    const key = e.response?.status || e.message
    results.errors[key] = (results.errors[key] || 0) + 1
  }
  results.total++
}

async function fuzzBasketCheckout() {
  try {
    await axios.post(`${BASE_URL}/rest/basket/${randomInjectionOrFaker(() => faker.number.int({ min: 1, max: 100 }))}/checkout`)
    results.success++
  } catch (e) {
    results.fail++
    const key = e.response?.status || e.message
    results.errors[key] = (results.errors[key] || 0) + 1
  }
  results.total++
}

async function fuzzApplyCoupon() {
  try {
    await axios.put(`${BASE_URL}/rest/basket/${randomInjectionOrFaker(() => faker.number.int({ min: 1, max: 100 }))}/coupon/${randomInjectionOrFaker(() => faker.string.alphanumeric(8))}`)
    results.success++
  } catch (e) {
    results.fail++
    const key = e.response?.status || e.message
    results.errors[key] = (results.errors[key] || 0) + 1
  }
  results.total++
}

async function fuzzProfileUpdate() {
  try {
    await axios.post(`${BASE_URL}/profile`, {
      username: randomInjectionOrFaker(() => faker.internet.userName()),
      email: randomInjectionOrFaker(() => faker.internet.email())
    })
    results.success++
  } catch (e) {
    results.fail++
    const key = e.response?.status || e.message
    results.errors[key] = (results.errors[key] || 0) + 1
  }
  results.total++
}

async function fuzzSnippetsVerdict() {
  try {
    await axios.post(`${BASE_URL}/snippets/verdict`, {
      challenge: randomInjectionOrFaker(() => faker.lorem.word()),
      lines: [randomInjectionOrFaker(() => faker.number.int())]
    })
    results.success++
  } catch (e) {
    results.fail++
    const key = e.response?.status || e.message
    results.errors[key] = (results.errors[key] || 0) + 1
  }
  results.total++
}

async function runFuzz() {
  const fuzzers = [
    fuzzLogin,
    fuzzChangePassword,
    fuzzResetPassword,
    fuzzSecurityQuestion,
    fuzzWhoami,
    fuzzSearchProducts,
    fuzzBasketCheckout,
    fuzzApplyCoupon,
    fuzzProfileUpdate,
    fuzzSnippetsVerdict
  ]
  for (let i = 0; i < 100; i++) {
    const fuzzer = fuzzers[Math.floor(Math.random() * fuzzers.length)]
    await fuzzer()
  }
  // Summary
  console.log('\n=== Fuzzing Summary ===')
  console.log(`Total requests: ${results.total}`)
  console.log(`Success: ${results.success}`)
  console.log(`Fail: ${results.fail}`)
  console.log('Error breakdown:', results.errors)
}

runFuzz()