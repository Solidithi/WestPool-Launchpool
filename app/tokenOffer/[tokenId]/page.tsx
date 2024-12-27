"use client";
import Image from "next/image";

const TokenOffer = () => {
  return (
    <div className="flex flex-col items-center space-y-6 px-[5%] pb-12 xl:space-y-12 xl:px-12 mt-10 ">
      <div className="w-full space-y-4 flex justify-center flex-col items-center gap-4">
        <h1 className="text-[67px] leading-[60px] font-bold bg-gradient-to-r from-[#7BA9EF] to-[#FFFFFF] to-50% text-transparent bg-clip-text">
          Pre-market
        </h1>
        <p className="text-[#A7B7DB]">Your Early Update on Financial Markets</p>
      </div>

      {/* -------------------------Title----------------------------- */}
      <div
        className="flex w-full items-center justify-between bg-[#3A66A9] rounded-xl h-auto gap-10 px-10 py-5 
      sm:grid sm:grid-rows-2 sm:grid-flow-col sm:gap-4 md:grid md:grid-rows-2 md:grid-flow-col md:gap-4 lg:flex lg:flex-row xl:flex xl:flex-row"
      >
        <div className="flex items-center gap-4 justify-center">
          <Image
            src="https://i.pinimg.com/736x/2e/99/73/2e9973b4ca3af5f314dfab0a6c23b352.jpg"
            width={50}
            height={50}
            alt="icon"
            className="rounded-full"
          />
          <div className="flex flex-col text-left gap-1">
            <span className="text-[17px] font-bold">Projects Name</span>
            <span className="text-[12px] font-light text-[#DDDDDD]">
              ssdjksvdfjhhkfgjv
            </span>
          </div>
        </div>

        <div className="flex flex-col text-left gap-1">
          <span className="text-[15px] ">24h vol</span>
          <span className="text-[17px] font-bold text-[#DDDDDD]">
            $10000 + 3%
          </span>
        </div>

        <div className="flex flex-col text-left gap-1">
          <span className="text-[15px] ">total Voll</span>
          <span className="text-[17px] font-bold text-[#DDDDDD]">$10000</span>
        </div>

        <div className="flex flex-col text-left gap-1">
          <span className="text-[15px] ">Settle start</span>
          <span className="text-[17px] font-bold text-[#DDDDDD]">TBA</span>
        </div>

        <div className="flex flex-col text-left gap-1">
          <span className="text-[15px] ">Settle endl</span>
          <span className="text-[17px] font-bold text-[#DDDDDD]">TBA</span>
        </div>
      </div>

      <div className="w-full flex flex-row gap-4">
        {/* ----------------------------Table 1--------------------------------- */}
        <div className="w-full rounded-xl bg-[#3A66A9] ">
          <table className="table">
            <thead>
              <tr className="text-[#DDDDDD] text-left text-[13px] border-b-[#E0E0E0]">
                <th className="py-7 pl-7 font-light">Price</th>
                <th className="font-light">Amount</th>
                <th className="font-light">Collateral</th>
                <th className="font-light">Fill type</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-white border-none">
                <td className="pl-6 text-[#07F907]">1.80</td>
                <td>1.04</td>
                <td>
                  <div className="flex items-center gap-2">
                    <span>187.2</span>
                    <Image
                      src="https://i.pinimg.com/736x/2e/99/73/2e9973b4ca3af5f314dfab0a6c23b352.jpg"
                      alt="logo"
                      width={20}
                      height={20}
                      className="rounded-full"
                    />
                  </div>
                </td>
                <td>
                  {/* <div className="border border-[#B8B8B8] text-[#B8B8B8] rounded-2xl px-2  text-[10px] flex justify-center w-2/3">
                    PARTIAL
                  </div> */}
                  <div className="border border-[#B8B8B8] text-[#00D4FF] rounded-2xl px-2  text-[11px] flex justify-center w-2/3 font-bold">
                    FULL
                  </div>
                </td>
                <td>
                  <button
                    className=" border border-[#B8B8B8] bg-none text-[#B8B8B8] rounded-md px-2 py-2 text-[13px] flex justify-center w-2/3 hover:scale-105 duration-300"
                    onClick={() =>
                      (
                        document.getElementById("buy1") as HTMLDialogElement
                      ).showModal()
                    }
                  >
                    Buy
                  </button>
                  <dialog id="buy1" className="modal">
                    <div className="modal-box bg-[#2D468D]">
                      <h3 className="font-bold text-lg mb-4 text-white">
                        WCT/USDC
                      </h3>

                      <div className="bg-[#5A78B8] rounded-lg p-4 mb-4 relative">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-green-400 font-bold text-sm">
                            BUYING
                          </span>
                          <span className="text-white text-xs">
                            MAX 104 WCT
                          </span>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                          <input
                            className="text-3xl font-bold text-white bg-transparent w-2/3 outline-none"
                            placeholder="enter"
                          />
                          <Image
                            src="https://i.pinimg.com/736x/2e/99/73/2e9973b4ca3af5f314dfab0a6c23b352.jpg"
                            alt="logo"
                            width={30}
                            height={30}
                            className="rounded-full"
                          />
                        </div>
                      </div>

                      <div className="bg-[#5A78B8] rounded-lg p-4 relative">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-200 font-bold text-sm">
                            COLLATERAL
                          </span>
                          <span className="text-white text-xs">
                            Balance: 0.001 USDC
                          </span>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                          <input
                            className="text-3xl font-bold text-white bg-transparent w-2/3 outline-none"
                            placeholder="enter"
                          />
                          <Image
                            src="https://i.pinimg.com/736x/c2/6b/8c/c26b8c12fa9490fa1bdd38a4224e31a9.jpg"
                            alt="logo"
                            width={30}
                            height={30}
                            className="rounded-full"
                          />
                        </div>
                      </div>

                      <button className="btn bg-white text-[#7BA9EF] w-full py-2 mt-6 rounded-full font-bold text-lg hover:bg-[#2C3E6F]">
                        Buy
                      </button>
                    </div>
                    <form method="dialog" className="modal-backdrop">
                      <button>close</button>
                    </form>
                  </dialog>
                </td>
              </tr>

              <tr className="text-white border-none">
                <td className="pl-6 text-[#07F907]">1.80</td>
                <td>1.04</td>
                <td>
                  <div className="flex items-center gap-2">
                    <span>187.2</span>
                    <Image
                      src="https://i.pinimg.com/736x/2e/99/73/2e9973b4ca3af5f314dfab0a6c23b352.jpg"
                      alt="logo"
                      width={20}
                      height={20}
                      className="rounded-full"
                    />
                  </div>
                </td>
                <td>
                  <div className="border border-[#B8B8B8] text-[#00D4FF] rounded-2xl px-2  text-[11px] flex justify-center w-2/3 font-bold">
                    FULL
                  </div>
                </td>
                <td>
                  <button
                    className=" border border-[#B8B8B8] bg-none text-[#B8B8B8] rounded-md px-2 py-2 text-[13px] flex justify-center w-2/3 hover:scale-105 duration-300"
                    onClick={() =>
                      (
                        document.getElementById("buy2") as HTMLDialogElement
                      ).showModal()
                    }
                  >
                    Buy
                  </button>
                  <dialog id="buy2" className="modal">
                    <div className="modal-box">
                      <h3 className="font-bold text-lg">Hello!</h3>
                      <p className="py-4">
                        Press ESC key or click outside to close
                      </p>
                    </div>
                    <form method="dialog" className="modal-backdrop">
                      <button>close</button>
                    </form>
                  </dialog>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ----------------------------Table w--------------------------------- */}
        <div className="w-full rounded-xl bg-[#3A66A9] ">
          <table className="table">
            <thead>
              <tr className="text-[#DDDDDD] text-left text-[13px] border-b-[#E0E0E0]">
                <th className="py-7 pl-7 font-light">Price</th>
                <th className="font-light">Amount</th>
                <th className="font-light">Collateral</th>
                <th className="font-light">Fill type</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-white border-none">
                <td className="pl-6 text-[#FF5353]">1.80</td>
                <td>1.04</td>
                <td>
                  <div className="flex items-center gap-2">
                    <span>187.2</span>
                    <Image
                      src="https://i.pinimg.com/736x/2e/99/73/2e9973b4ca3af5f314dfab0a6c23b352.jpg"
                      alt="logo"
                      width={20}
                      height={20}
                      className="rounded-full"
                    />
                  </div>
                </td>
                <td>
                  {/* <div className="border border-[#B8B8B8] text-[#B8B8B8] rounded-2xl px-2  text-[10px] flex justify-center w-2/3">
                    PARTIAL
                  </div> */}
                  <div className="border border-[#B8B8B8] text-[#00D4FF] rounded-2xl px-2  text-[11px] flex justify-center w-2/3 font-bold">
                    FULL
                  </div>
                </td>
                <td>
                  <button
                    className=" border border-[#B8B8B8] bg-none text-[#B8B8B8] rounded-md px-2 py-2 text-[13px] flex justify-center w-2/3 hover:scale-105 duration-300"
                    onClick={() =>
                      (
                        document.getElementById("sell1") as HTMLDialogElement
                      ).showModal()
                    }
                  >
                    SELL
                  </button>
                  <dialog id="sell1" className="modal">
                    <div className="modal-box bg-[#2D468D]">
                      <h3 className="font-bold text-lg mb-4 text-white">
                        WCT/USDC
                      </h3>

                      <div className="bg-[#5A78B8] rounded-lg p-4 mb-4 relative">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-[#ff2323] font-bold text-sm">
                            SELLING
                          </span>
                          <span className="text-white text-xs">
                            MAX 104 WCT
                          </span>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                          <input
                            className="text-3xl font-bold text-white bg-transparent w-2/3 outline-none"
                            placeholder="enter"
                          />
                          <Image
                            src="https://i.pinimg.com/736x/2e/99/73/2e9973b4ca3af5f314dfab0a6c23b352.jpg"
                            alt="logo"
                            width={30}
                            height={30}
                            className="rounded-full"
                          />
                        </div>
                      </div>

                      <div className="bg-[#5A78B8] rounded-lg p-4 relative">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-200 font-bold text-sm">
                            COLLATERAL
                          </span>
                          <span className="text-white text-xs">
                            Balance: 0.001 USDC
                          </span>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                          <input
                            className="text-3xl font-bold text-white bg-transparent w-2/3 outline-none"
                            placeholder="enter"
                          />
                          <Image
                            src="https://i.pinimg.com/736x/c2/6b/8c/c26b8c12fa9490fa1bdd38a4224e31a9.jpg"
                            alt="logo"
                            width={30}
                            height={30}
                            className="rounded-full"
                          />
                        </div>
                      </div>

                      <button className="btn bg-white text-[#e86c6c] w-full py-2 mt-6 rounded-full font-bold text-lg hover:bg-[#2a1919]">
                        Sell
                      </button>
                    </div>
                    <form method="dialog" className="modal-backdrop">
                      <button>close</button>
                    </form>
                  </dialog>
                </td>
              </tr>

              <tr className="text-white border-none">
                <td className="pl-6 text-[#FF5353]">1.80</td>
                <td>1.04</td>
                <td>
                  <div className="flex items-center gap-2">
                    <span>187.2</span>
                    <Image
                      src="https://i.pinimg.com/736x/2e/99/73/2e9973b4ca3af5f314dfab0a6c23b352.jpg"
                      alt="logo"
                      width={20}
                      height={20}
                      className="rounded-full"
                    />
                  </div>
                </td>
                <td>
                  <div className="border border-[#B8B8B8] text-[#00D4FF] rounded-2xl px-2  text-[11px] flex justify-center w-2/3 font-bold">
                    FULL
                  </div>
                </td>
                <td>
                  <button
                    className=" border border-[#B8B8B8] bg-none text-[#B8B8B8] rounded-md px-2 py-2 text-[13px] flex justify-center w-2/3 hover:scale-105 duration-300"
                    onClick={() =>
                      (
                        document.getElementById("sell2") as HTMLDialogElement
                      ).showModal()
                    }
                  >
                    SELL
                  </button>
                  <dialog id="sell2" className="modal">
                    <div className="modal-box">
                      <h3 className="font-bold text-lg">Hello!</h3>
                      <p className="py-4">
                        Press ESC key or click outside to close
                      </p>
                    </div>
                    <form method="dialog" className="modal-backdrop">
                      <button>close</button>
                    </form>
                  </dialog>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TokenOffer;
