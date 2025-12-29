import { useState } from 'react'
import InputBox from './components/input'
import useCurrencyInfo from './hooks/useCurrencyInfo'


function App() {
  const [amount, setAmount] = useState(0)
  const [fromCurrency, setFromCurrency] = useState('USD')
  const [toCurrency, setToCurrency] = useState('INR')
  const [convertedAmount, setConvertedAmount] = useState(0)
  const currencyInfo = useCurrencyInfo(fromCurrency)
  const options = Object.keys(currencyInfo)
  const swap = () => {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
    setAmount(convertedAmount)
    setConvertedAmount(amount)
  }
  const convert = () => {
    const rate = currencyInfo[toCurrency]
    if (rate) {
      setConvertedAmount(amount * rate)
      console.log(amount, rate, convertedAmount)
    }
  }

  return (
    <div
      className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url('https://images.pexels.com/photos/3532540/pexels-photo-3532540.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`,
      }}
    >
      <div className="w-full">
        <div className="max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm" style={{
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          width: "600px",
          padding: "20px",
        }}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              convert()
            }}
          >
            <div className="w-full mb-1">
              <InputBox
                label="From"
                amount={amount}
                onAmountChange={amount => setAmount(amount)}
                onCurrencyChange={(currency) => setFromCurrency(currency)}
                currencyOptions={options}
                selectCurrency={fromCurrency}
                amountDisabled={false}
                currencyDisabled={false}
                className="w-full mb-1"
              />
            </div>
            <div className="relative w-full h-0.5">
              <button
                type="button"
                onClick={swap}
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"

              >
                swap
              </button>
            </div>
            <div className="w-full mt-1 mb-4">
              <InputBox
                label="To"
                amount={convertedAmount}
                onAmountChange={setConvertedAmount}
                onCurrencyChange={(currency) => setToCurrency(currency)}
                currencyOptions={options}
                selectCurrency={toCurrency}
                amountDisabled={false}
                currencyDisabled={false}
                className="w-full mb-1"
              />
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg">
              Convert {fromCurrency} to {toCurrency}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default App
