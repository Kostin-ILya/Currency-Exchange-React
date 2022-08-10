import { useEffect, useState } from 'react'

import './App.css'

function App(props) {
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
      .then((res) => {
        setUSD(res.Valute.USD.Value)
        setEUR(res.Valute.EUR.Value)
        setTRY(res.Valute.TRY.Value / 10)
      })
  }, [])

  useEffect(() => {
    convert(currency)
  })

  const convert = (currency) => {
    switch (currency) {
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
        <button name="USD" onClick={onChangeCurrency}>
          USD
        </button>
        <button name="EUR" onClick={onChangeCurrency}>
          EUR
        </button>
        <button name="TRY" onClick={onChangeCurrency}>
          TRY
        </button>
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

// 1) Начальное значение счетчика должно передаваться через props
// 2) INC и DEC увеличивают и уменьшают счетчик соответственно на 1. Без ограничений, но можете добавить границу в -50/50. По достижению границы ничего не происходит
// 3) RND изменяет счетчик в случайное значение от -50 до 50. Конструкцию можете прогуглить за 20 секунд :) Не зависит от предыдущего состояния
// 4) RESET сбрасывает счетчик в 0 или в начальное значение из пропсов. Выберите один из вариантов

export default App
