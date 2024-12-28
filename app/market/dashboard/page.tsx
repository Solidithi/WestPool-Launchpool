"use client";
import React from "react";
import Image from "next/image";
import { buyTable, sellTable } from "../../constants/index";
import clsx from "clsx";
const Dashboard = () => {
  return (
    <div className="flex flex-col items-center space-y-6 px-[5%] pb-12 xl:space-y-12 xl:px-12 mt-10 ">
      <div className="w-full space-y-4 flex justify-center flex-col items-center gap-4">
        <h1 className="text-[67px] leading-[60px] font-bold bg-gradient-to-r from-[#7BA9EF] to-[#FFFFFF] to-50% text-transparent bg-clip-text">
          Dashboard
        </h1>
      </div>

      <div role="tablist" className="tabs tabs-lifted w-full ">
        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab text-[#7BA9EF] text-[15px]"
          aria-label="Buy"
          defaultChecked
        />
        <div
          role="tabpanel"
          className="tab-content bg-[#060f1f] border-base-300 rounded-box p-5"
        >
          <div className="w-full bg-[#102343]  shadow-lg rounded-2xl ">
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr className="text-[#82B2FA]  text-[20px] font-extralight border-b-[#E0E0E0] text-right">
                    <th className="py-12">OFFER ID</th>
                    <th>TIME</th>
                    <th>DEPOSITED</th>
                    <th className="w-[200px]">FOR</th>
                    <th className="w-[300px]">TX</th>
                    <th className="w-[230px]">STATUS</th>
                    <th>ACTION</th>
                  </tr>
                </thead>
                <tbody className="text-center ">
                  {buyTable.map((data) => (
                    <>
                      <tr className="cursor-pointer hover:bg-[#1A2E4A] text-white border-b border-[#E0E0E0] last:border-b-0 text-right py-5">
                        <td>
                          <div className="flex items-center gap-4 justify-end">
                            <Image
                              src={data.icon}
                              width={40}
                              height={40}
                              alt="icon"
                              className="rounded-full"
                            />
                            <div className="flex flex-col  gap-1">
                              <span className="text-[17px] font-bold">
                                {data.offerid}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td>{data.time}</td>
                        <td>
                          <div className="flex items-center gap-4 justify-end">
                            <div className="flex flex-col  gap-1">
                              <span className="text-[17px] font-bold">
                                {data.deposit}
                              </span>
                            </div>
                            <Image
                              src={data.deposit_icon}
                              width={20}
                              height={20}
                              alt="icon"
                              className="rounded-full"
                            />
                          </div>
                        </td>
                        <td>
                          <div className="flex items-center gap-4 justify-end">
                            <div className="flex flex-col  gap-1">
                              <span className="text-[17px] font-bold">
                                {data.for}
                              </span>
                            </div>
                            <Image
                              src={data.icon}
                              width={20}
                              height={20}
                              alt="icon"
                              className="rounded-full"
                            />
                          </div>
                        </td>
                        <td>{data.tx}</td>
                        <td className="text-right">
                          <div
                            className={clsx(
                              "font-extrabold rounded-2xl p-1 w-[100px] text-center ml-auto",
                              {
                                "text-[#ce7b51] bg-[#423533]":
                                  data.status === "Open",
                                "text-[#e3cc1b] bg-[#333b0d]":
                                  data.status === "Pending",
                                "text-[#329A81] bg-[#1B2B30]":
                                  data.status === "Completed",
                                "text-gray-500 bg-slate-800":
                                  data.status === "Cancelled",
                              }
                            )}
                          >
                            {data.status}
                          </div>
                        </td>
                        <td>
                          {data.status === "Completed" ? (
                            <button
                              className="text-[#329A81] py-2 px-4 rounded-md text-[13px] duration-300 hover:scale-105"
                              onClick={() =>
                                (
                                  document.getElementById(
                                    `withdraw-${data.offerid}`
                                  ) as HTMLDialogElement
                                ).showModal()
                              }
                            >
                              WITHDRAW
                            </button>
                          ) : (
                            <button
                              className={clsx(
                                "rounded-md text-[13px] duration-300 ml-auto py-2 px-4",
                                {
                                  "text-gray-600 cursor-not-allowed": data.status === "Cancelled",
                                  "bg-transparent text-[#ce7b51] hover:scale-105":
                                    data.status !== "Cancelled",
                                }
                              )}
                              onClick={() =>
                                (
                                  document.getElementById(
                                    `cancel-order-${data.offerid}`
                                  ) as HTMLDialogElement
                                ).showModal()
                              }
                              disabled={data.status === "Cancelled"}
                            >
                              CANCEL ORDER
                            </button>
                          )}

                          <dialog
                            id={`cancel-order-${data.offerid}`}
                            className="modal"
                          >
                            <div className="modal-box bg-[#0C141E]">
                              <h3 className="font-bold text-lg mb-4 text-white">
                                <div className="flex items-center gap-4 justify-start">
                                  <Image
                                    src={data.icon}
                                    width={50}
                                    height={50}
                                    alt="icon"
                                    className="rounded-full"
                                  />
                                  <div className="flex flex-col gap-1">
                                    <span className="text-[17px] font-bold">
                                      {data.offerid}
                                    </span>
                                  </div>
                                </div>
                              </h3>

                              <div className="flex flex-col justify-start gap-5 border-gray-300 border rounded-lg p-4 my-5 ">
                                <div className="flex justify-between">
                                  <div>My deposit</div>
                                  <div className="flex gap-3">
                                    <span className="font-bold">{data.deposit}</span>
                                    <Image
                                      src={data.deposit_icon}
                                      width={20}
                                      height={20}
                                      alt="icon"
                                      className="rounded-full"
                                    />
                                  </div>
                                </div>
                                <div className="flex justify-between">
                                  <div>My Compensation</div>
                                  <div className="flex gap-3">
                                    <span className="font-bold">{data.deposit}</span>
                                    <Image
                                      src={data.deposit_icon}
                                      width={20}
                                      height={20}
                                      alt="icon"
                                      className="rounded-full"
                                    />
                                  </div>
                                </div>
                                <div className="flex justify-between">
                                  <div>Platform fee</div>
                                  <div>2.5%</div>
                                </div>
                              </div>

                              <button className="btn bg-[#423533] text-[#ce7b51] w-full py-2 mt-6 rounded-full font-bold text-lg hover:bg-[#201a19]">
                                Cancel Order
                              </button>
                            </div>
                            <form method="dialog" className="modal-backdrop">
                              <button>close</button>
                            </form>
                          </dialog>

                          <dialog
                            id={`withdraw-${data.offerid}`}
                            className="modal"
                          >
                            <div className="modal-box bg-[#0C141E]">
                              <h3 className="font-bold text-lg mb-4 text-white">
                                <div className="flex items-center gap-4 justify-start">
                                  <Image
                                    src={data.icon}
                                    width={50}
                                    height={50}
                                    alt="icon"
                                    className="rounded-full"
                                  />
                                  <div className="flex flex-col gap-1">
                                    <span className="text-[17px] font-bold">
                                      {data.offerid}
                                    </span>
                                  </div>
                                </div>
                              </h3>

                              <div className="flex flex-col justify-start gap-5 border-gray-300 border rounded-lg p-4 my-5 ">
                                <div className="flex justify-between">
                                  <div>My project&apos;s token</div>
                                  <div className="flex gap-3">
                                    <span className="font-bold">{data.for}</span>
                                    <Image
                                      src={data.icon}
                                      width={20}
                                      height={20}
                                      alt="icon"
                                      className="rounded-full"
                                    />
                                  </div>
                                </div>
                                <div className="flex justify-between">
                                  <div>Platform fee</div>
                                  <div>2.5%</div>
                                </div>
                              </div>

                              <button className="btn text-[#329A81] bg-[#1B2B30] w-full py-2 mt-6 rounded-full font-bold text-lg hover:bg-[#201a19]">
                                Withdraw
                              </button>
                            </div>
                            <form method="dialog" className="modal-backdrop">
                              <button>close</button>
                            </form>
                          </dialog>
                        </td>

                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab text-[#7BA9EF] text-[15px]"
          aria-label="Sell"
        />
        <div
          role="tabpanel"
          className="tab-content bg-[#060f1f] border-base-300 rounded-box p-5"
        >
          <div className="w-full bg-[#102343]  shadow-lg rounded-2xl ">
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr className="text-[#82B2FA]  text-[20px] font-extralight border-b-[#E0E0E0] text-right">
                    <th className="py-12">OFFER ID</th>
                    <th>TIME</th>
                    <th className="w-[200px]">FILL AMOUNT</th>
                    <th>DEPOSITED</th>
                    <th className="w-[300px]">TX</th>
                    <th className="w-[230px]">STATUS</th>
                    <th>ACTION</th>
                  </tr>
                </thead>
                <tbody className="text-center ">
                  {sellTable.map((data) => (
                    <>
                      <tr className="cursor-pointer hover:bg-[#1A2E4A] text-white border-b border-[#E0E0E0] last:border-b-0 text-right py-5">
                        <td>
                          <div className="flex items-center gap-4 justify-end">
                            <Image
                              src={data.icon}
                              width={40}
                              height={40}
                              alt="icon"
                              className="rounded-full"
                            />
                            <div className="flex flex-col  gap-1">
                              <span className="text-[17px] font-bold">
                                {data.offerid}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td>{data.time}</td>

                        <td>
                          <div className="flex items-center gap-4 justify-end">
                            <div className="flex flex-col  gap-1">
                              <span className="text-[17px] font-bold">
                                {data.for}
                              </span>
                            </div>
                            <Image
                              src={data.icon}
                              width={20}
                              height={20}
                              alt="icon"
                              className="rounded-full"
                            />
                          </div>
                        </td>
                        <td>
                          <div className="flex items-center gap-4 justify-end">
                            <div className="flex flex-col  gap-1">
                              <span className="text-[17px] font-bold">
                                {data.deposit}
                              </span>
                            </div>
                            <Image
                              src={data.deposit_icon}
                              width={20}
                              height={20}
                              alt="icon"
                              className="rounded-full"
                            />
                          </div>
                        </td>
                        <td>{data.tx}</td>
                        <td className="text-right">
                          <div
                            className={clsx(
                              "font-extrabold rounded-2xl p-1 w-[100px] text-center ml-auto",
                              {
                                "text-[#ce7b51] bg-[#423533]":
                                  data.status === "Open",
                                "text-[#329A81] bg-[#1B2B30]":
                                  data.status === "Settled",
                                "text-gray-500 bg-slate-800":
                                  data.status === "Closed",
                                "text-[#e3cc1b] bg-[#333b0d]":
                                  data.status === "Pending",
                              }
                            )}
                          >
                            {data.status}
                          </div>
                        </td>
                        <td>
                          <button
                            className={clsx(
                              "rounded-md text-[13px] duration-300 ml-auto py-2 px-4",
                              {
                                "text-gray-600 cursor-not-allowed ":
                                  data.status === "Closed",

                                " text-[#329A81] hover:scale-105":
                                  data.status === "Pending",

                                " text-[#ce7b51] hover:scale-105":
                                  data.status === "Open",

                                " text-[#e3cc1b] hover:scale-105":
                                  data.status === "Settled",
                              }
                            )}
                            onClick={() => {
                              if (data.status === "Pending") {
                                (
                                  document.getElementById(`settle-${data.offerid}`) as HTMLDialogElement
                                ).showModal();
                              } else if (data.status === "Open") {
                                (
                                  document.getElementById(`close-${data.offerid}`) as HTMLDialogElement
                                ).showModal();
                              } else if (data.status === "Settled") {
                                (
                                  document.getElementById(`withdraw1-${data.offerid}`) as HTMLDialogElement
                                ).showModal();
                              }
                            }}
                            disabled={data.status === "Closed"}
                          >
                            {data.status === "Pending"
                              ? "Settle"
                              : data.status === "Open"
                                ? "Close"
                                : data.status === "Settled"
                                  ? "Withdraw"
                                  : "Close"}
                          </button>

                          {/* Modal Settle */}
                          <dialog id={`settle-${data.offerid}`} className="modal">
                            <div className="modal-box bg-[#0C141E]">
                              <h3 className="font-bold text-lg mb-4 text-white">
                                <div className="flex items-center gap-4 justify-start">
                                  <Image
                                    src={data.icon}
                                    width={50}
                                    height={50}
                                    alt="icon"
                                    className="rounded-full"
                                  />
                                  <div className="flex flex-col gap-1">
                                    <span className="text-[17px] font-bold">{data.offerid}</span>
                                  </div>
                                </div>
                              </h3>

                              <div className="flex flex-col justify-start gap-5 border-gray-300 border rounded-lg p-4 my-5">
                                <div className="flex justify-between">
                                  <div>Filled amount</div>
                                  <div className="flex gap-3">
                                    <span className="font-bold">{data.for}</span>
                                    <Image
                                      src={data.icon}
                                      width={20}
                                      height={20}
                                      alt="icon"
                                      className="rounded-full"
                                    />
                                  </div>
                                </div>
                                <div className="flex justify-between">
                                  <div>My deposit</div>
                                  <div className="flex gap-3">
                                    <span className="font-bold">{data.deposit}</span>
                                    <Image
                                      src={data.deposit_icon}
                                      width={20}
                                      height={20}
                                      alt="icon"
                                      className="rounded-full"
                                    />
                                  </div>
                                </div>
                                <div className="flex justify-between">
                                  <div>My Compensation</div>
                                  <div className="flex gap-3">
                                    <span className="font-bold">{data.deposit}</span>
                                    <Image
                                      src={data.deposit_icon}
                                      width={20}
                                      height={20}
                                      alt="icon"
                                      className="rounded-full"
                                    />
                                  </div>
                                </div>
                                <div className="flex justify-between">
                                  <div>Platform fee</div>
                                  <div>2.5%</div>
                                </div>
                              </div>

                              <button className="btn text-[#329A81] bg-[#1B2B30] w-full py-2 mt-6 rounded-full font-bold text-lg hover:bg-[#141f23]">
                                Settle
                              </button>
                            </div>
                            <form method="dialog" className="modal-backdrop">
                              <button>close</button>
                            </form>
                          </dialog>

                          <dialog id={`withdraw1-${data.offerid}`} className="modal">
                            <div className="modal-box bg-[#0C141E]">
                              <h3 className="font-bold text-lg mb-4 text-white">
                                <div className="flex items-center gap-4 justify-start">
                                  <Image
                                    src={data.icon}
                                    width={50}
                                    height={50}
                                    alt="icon"
                                    className="rounded-full"
                                  />
                                  <div className="flex flex-col gap-1">
                                    <span className="text-[17px] font-bold">{data.offerid}</span>
                                  </div>
                                </div>
                              </h3>

                              <div className="flex flex-col justify-start gap-5 border-gray-300 border rounded-lg p-4 my-5">
                                <div className="flex justify-between">
                                  <div>My received token</div>
                                  <div className="flex gap-3">
                                    <span className="font-bold">{data.deposit}</span>
                                    <Image
                                      src={data.deposit_icon}
                                      width={20}
                                      height={20}
                                      alt="icon"
                                      className="rounded-full"
                                    />
                                  </div>
                                </div>
                                <div className="flex justify-between">
                                  <div>Platform fee</div>
                                  <div>2.5%</div>
                                </div>
                              </div>

                              <button className="btn text-[#e3cc1b] bg-[#333b0d] w-full py-2 mt-6 rounded-full font-bold text-lg hover:bg-[#1c1e12]">
                                Withdraw
                              </button>
                            </div>
                            <form method="dialog" className="modal-backdrop">
                              <button>close</button>
                            </form>
                          </dialog>

                          <dialog id={`close-${data.offerid}`} className="modal">
                            <div className="modal-box bg-[#0C141E]">
                              <h3 className="font-bold text-lg mb-4 text-white">
                                <div className="flex items-center gap-4 justify-start">
                                  <Image
                                    src={data.icon}
                                    width={50}
                                    height={50}
                                    alt="icon"
                                    className="rounded-full"
                                  />
                                  <div className="flex flex-col gap-1">
                                    <span className="text-[17px] font-bold">{data.offerid}</span>
                                  </div>
                                </div>
                              </h3>

                              <div className="flex my-5 text-[24px]">Do you want to close this offer</div>

                              <button className="btn text-[#ce7b51] bg-[#423533] w-full py-2 mt-6 rounded-full font-bold text-lg hover:bg-[#281f1d]">
                                Close
                              </button>
                            </div>
                            <form method="dialog" className="modal-backdrop">
                              <button>close</button>
                            </form>
                          </dialog>
                        </td>

                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
