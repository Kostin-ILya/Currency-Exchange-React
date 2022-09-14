import { useEffect, useState } from 'react'

import './App.css'

const currencyNames = ['USD', 'EUR', 'TRY']

function App() {
  const api = 'https://www.cbr-xml-daily.ru/daily_json.js'
  const [value, setValue] = useState(0)
  const [convertedValue, setConvertedValue] = useState(0)
  const [currency, setCurrency] = useState('')
  const [USD, setUSD] = useState(0)
  const [EUR, setEUR] = useState(0)
  const [TRY, setTRY] = useState(0)

  useEffect(() => {
    fetch(api)
      .then((data) => data.json())
      .then(({ Valute }) => {
        setUSD(Valute.USD.Value)
        setEUR(Valute.EUR.Value)
        setTRY(Valute.TRY.Value / 10)
      })
  }, [])

  useEffect(() => {
    convert(currency)
  })

  const convert = (cur) => {
    switch (cur) {
      case 'USD':
        setConvertedValue(value / USD)
        break
      case 'EUR':
        setConvertedValue(value / EUR)
        break
      case 'TRY':
        setConvertedValue(value / TRY)
        break
      default:
        setConvertedValue(0)
    }
  }

  const onChangeValue = (e) => {
    setValue(+e.target.value)
  }

  const onChangeCurrency = (e) => {
    setCurrency(e.target.name)
  }

  return (
    <div className="app">
      <div className="wrapper">
        Сумма в рублях:
        <input className="counter" value={value} onChange={onChangeValue} />
        Сумма в валюте:
        <div className="counter">{convertedValue.toFixed(2) + currency}</div>
      </div>

      <div className="controls">
        {currencyNames.map((curName) => (
          <button
            key={curName}
            name={curName}
            className={curName === currency && 'active'}
            onClick={onChangeCurrency}
          >
            {curName}
          </button>
        ))}

        <button
          onClick={() => {
            setValue(0)

            setCurrency('')
          }}
        >
          RESET
        </button>
      </div>
    </div>
  )
}

export default App
