"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { buyTable, sellTable, availableTokens } from "../../constants/index";
import clsx from "clsx";
import axios from "axios";
import { Project, Offer, OfferType } from "@/app/interface/interface";
import { CreateOfferStatus } from "@prisma/client";
const Dashboard = () => {
  const [projects, setProjects] = useState<Array<Project | Offer>>([]);
  const [loading, setLoading] = useState(true);

  //  ------------Gọi API--------------
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get("/api/preMarket/dashboard");
        const data = res.data;

        if (data.success) {
          setProjects(data.data);
        } else {
          console.error("Failed to fetch projects:", data.error);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) return <div className="flex justify-center items-center h-[80vh]">
    <span className="loading loading-dots loading-lg "></span>
  </div>;

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
                    <th>START DATE</th>
                    <th>DEPOSITED</th>
                    <th className="w-[200px]">FOR</th>
                    <th className="w-[300px]">TX</th>
                    <th className="w-[230px]">STATUS</th>
                    <th>ACTION</th>
                  </tr>
                </thead>
                <tbody className="text-center ">
                  {/* {buyTable.map((data) => ( */}
                  {projects.filter((data) => (data as Offer).offerType === OfferType.Buy).map((data) => (
                    <>
                      <tr className="cursor-pointer hover:bg-[#1A2E4A] text-white border-b border-[#E0E0E0] last:border-b-0 text-right py-5">
                        <td>
                          <div className="flex items-center gap-4 justify-end">
                            <Image
                              src={(data as Project).projectLogo}
                              // src={data.icon}
                              width={40}
                              height={40}
                              alt="icon"
                              className="rounded-full"
                            />
                            <div className="flex">
                              <span className="text-[17px] font-bold">
                                {(data as Project).tokenSymbol}
                                <span className="text-[8px] text-gray-300 ml-1  mb-10">
                                  {(data as Offer).index}
                                </span>
                              </span>

                            </div>
                          </div>
                        </td>
                        <td>{(data as Offer).startDate.toString()}</td>
                        <td>
                          <div className="flex items-center gap-4 justify-end">
                            <div className="flex flex-col  gap-1">
                              <span className="text-[17px] font-bold">
                                {/* {
                                  availableTokens.find(token => token.address === (data as Offer).tokenCollateralAddress)?.name || 'Unknown Token'
                                } */}
                                {(data as Offer).amount.toString()}
                              </span>
                            </div>
                            <Image
                              src={
                                availableTokens.find(token => token.address === (data as Offer).tokenCollateralAddress)?.image || '/path/to/default-icon.png'
                              }
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
                                {/* {data.for} */}
                                {(data as Offer).collateral.toString()}
                              </span>
                            </div>
                            <Image
                              src={(data as Project).projectLogo}
                              width={20}
                              height={20}
                              alt="icon"
                              className="rounded-full"
                            />
                          </div>
                        </td>
                        <td>{(data as Offer).txHash}</td>
                        <td className="text-right">
                          <div
                            className={clsx(
                              "font-extrabold rounded-2xl p-1 w-[100px] text-center ml-auto",
                              {
                                "text-[#ce7b51] bg-[#423533]":
                                  (data as Offer).creatorStatus === CreateOfferStatus.Open,
                                "text-[#e3cc1b] bg-[#333b0d]":
                                  (data as Offer).creatorStatus === CreateOfferStatus.Pending,
                                "text-[#329A81] bg-[#1B2B30]":
                                  (data as Offer).creatorStatus === CreateOfferStatus.Settled,
                                "text-gray-500 bg-slate-800":
                                  (data as Offer).creatorStatus === CreateOfferStatus.Canceled || (data as Offer).creatorStatus === CreateOfferStatus.CanceledWithdraw,
                              }
                            )}
                          >
                            {(data as Offer).creatorStatus === CreateOfferStatus.CanceledWithdraw ? CreateOfferStatus.Canceled : (data as Offer).creatorStatus}
                          </div>
                        </td>

                        <td>
                          {(data as Offer).creatorStatus === CreateOfferStatus.Settled || (data as Offer).creatorStatus === CreateOfferStatus.CanceledWithdraw ? (
                            <button
                              className="text-[#329A81] py-2 px-4 rounded-md text-[13px] duration-300 hover:scale-105"
                              onClick={() =>
                                (
                                  document.getElementById(
                                    `withdraw-${(data as Offer).id}`
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
                                  "text-gray-600 cursor-not-allowed": (data as Offer).creatorStatus === CreateOfferStatus.Canceled,
                                  "bg-transparent text-[#ce7b51] hover:scale-105":
                                    (data as Offer).creatorStatus !== CreateOfferStatus.Canceled,
                                }
                              )}
                              onClick={() =>
                                (
                                  document.getElementById(
                                    `cancel-order-${(data as Offer).id}`
                                  ) as HTMLDialogElement
                                ).showModal()
                              }
                              disabled={(data as Offer).creatorStatus === CreateOfferStatus.Canceled}
                            >
                              CANCEL ORDER
                            </button>
                          )}

                          <dialog
                            id={`cancel-order-${(data as Offer).id}`}
                            className="modal"
                          >
                            <div className="modal-box bg-[#0C141E]">
                              <h3 className="font-bold text-lg mb-4 text-white">
                                <div className="flex items-center gap-4 justify-start">
                                  <Image
                                    src={(data as Project).projectLogo}
                                    width={50}
                                    height={50}
                                    alt="icon"
                                    className="rounded-full"
                                  />
                                  <div className="flex flex-col gap-1">
                                    <span className="text-[17px] font-bold">
                                      {(data as Offer).id}
                                    </span>
                                  </div>
                                </div>
                              </h3>

                              <div className="flex flex-col justify-start gap-5 border-gray-300 border rounded-lg p-4 my-5 ">
                                <div className="flex justify-between">
                                  <div>My deposit</div>
                                  <div className="flex gap-3">
                                    <span className="font-bold">  {
                                      availableTokens.find(token => token.address === (data as Offer).tokenCollateralAddress)?.name || 'Unknown Token'
                                    }</span>
                                    <Image
                                      src={
                                        availableTokens.find(token => token.address === (data as Offer).tokenCollateralAddress)?.image || '/path/to/default-icon.png'
                                      } width={20}
                                      height={20}
                                      alt="icon"
                                      className="rounded-full"
                                    />
                                  </div>
                                </div>
                                <div className="flex justify-between">
                                  <div>My Compensation</div>
                                  <div className="flex gap-3">
                                    <span className="font-bold">  {
                                      availableTokens.find(token => token.address === (data as Offer).tokenCollateralAddress)?.name || 'Unknown Token'
                                    }</span>                                    <Image
                                      src={
                                        availableTokens.find(token => token.address === (data as Offer).tokenCollateralAddress)?.image || '/path/to/default-icon.png'
                                      } width={20}
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
                            id={`withdraw-${(data as Offer).id}`}
                            className="modal"
                          >
                            <div className="modal-box bg-[#0C141E]">
                              <h3 className="font-bold text-lg mb-4 text-white">
                                <div className="flex items-center gap-4 justify-start">
                                  <Image
                                    src={(data as Project).projectLogo}
                                    width={50}
                                    height={50}
                                    alt="icon"
                                    className="rounded-full"
                                  />
                                  <div className="flex flex-col gap-1">
                                    <span className="text-[17px] font-bold">
                                      {(data as Offer).id}
                                    </span>
                                  </div>
                                </div>
                              </h3>

                              <div className="flex flex-col justify-start gap-5 border-gray-300 border rounded-lg p-4 my-5 ">
                                <div className="flex justify-between">
                                  <div>My project&apos;s token</div>
                                  <div className="flex gap-3">
                                    {(data as Offer).collateral.toString()}
                                    <Image
                                      src={(data as Project).projectLogo}
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
                    <th>START DATE</th>
                    <th className="w-[200px]">FILL AMOUNT</th>
                    <th>DEPOSITED</th>
                    <th className="w-[300px]">TX</th>
                    <th className="w-[230px]">STATUS</th>
                    <th>ACTION</th>
                  </tr>
                </thead>
                <tbody className="text-center ">
                  {projects.filter((data) => (data as Offer).offerType === OfferType.Sell).map((data) => (
                    <>
                      <tr className="cursor-pointer hover:bg-[#1A2E4A] text-white border-b border-[#E0E0E0] last:border-b-0 text-right py-5">
                        <td>
                          <div className="flex items-center gap-4 justify-end">
                            <Image
                              src={(data as Project).projectLogo}
                              // src={data.icon}
                              width={40}
                              height={40}
                              alt="icon"
                              className="rounded-full"
                            />
                            <div className="flex">
                              <span className="text-[17px] font-bold">
                                {(data as Project).tokenSymbol}
                                <span className="text-[8px] text-gray-300 ml-1  mb-10">
                                  {(data as Offer).index}
                                </span>
                              </span>

                            </div>
                          </div>
                        </td>
                        <td>{(data as Offer).startDate.toString()}</td>

                        <td>
                          <div className="flex items-center gap-4 justify-end">
                            <div className="flex flex-col  gap-1">
                              <span className="text-[17px] font-bold">
                                {(data as Offer).amount.toString()}
                              </span>
                            </div>
                            <Image
                              src={(data as Project).projectLogo}
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
                                {(data as Offer).collateral.toString()}
                              </span>
                            </div>
                            <Image
                              src={
                                availableTokens.find(token => token.address === (data as Offer).tokenCollateralAddress)?.image || '/path/to/default-icon.png'
                              }
                              width={20}
                              height={20}
                              alt="icon"
                              className="rounded-full"
                            />
                          </div>
                        </td>
                        <td>{(data as Offer).txHash}</td>
                        <td className="text-right">
                          <div
                            className={clsx(
                              "font-extrabold rounded-2xl p-1 w-[100px] text-center ml-auto",
                              {
                                // "text-[#ce7b51] bg-[#423533]":
                                //   data.status === "Open",
                                // "text-[#329A81] bg-[#1B2B30]":
                                //   data.status === "Settled",
                                // "text-gray-500 bg-slate-800":
                                //   data.status === "Cancelled" || data.status === "CancelledWithdraw",
                                // "text-[#e3cc1b] bg-[#333b0d]":
                                //   data.status === "Pending",
                                "text-[#ce7b51] bg-[#423533]":
                                  (data as Offer).creatorStatus === CreateOfferStatus.Open,
                                "text-[#e3cc1b] bg-[#333b0d]":
                                  (data as Offer).creatorStatus === CreateOfferStatus.Pending,
                                "text-[#329A81] bg-[#1B2B30]":
                                  (data as Offer).creatorStatus === CreateOfferStatus.Settled,
                                "text-gray-500 bg-slate-800":
                                  (data as Offer).creatorStatus === CreateOfferStatus.Canceled || (data as Offer).creatorStatus === CreateOfferStatus.CanceledWithdraw,
                              }
                            )}
                          >
                            {(data as Offer).creatorStatus === CreateOfferStatus.CanceledWithdraw ? CreateOfferStatus.Canceled : (data as Offer).creatorStatus}
                          </div>
                        </td>
                        <td>
                          <button
                            className={clsx(
                              "rounded-md text-[13px] duration-300 ml-auto py-2 px-4",
                              {
                                "text-gray-600 cursor-not-allowed ":
                                  (data as Offer).creatorStatus === CreateOfferStatus.Canceled,

                                " text-[#329A81] hover:scale-105":
                                  (data as Offer).creatorStatus === CreateOfferStatus.Pending,

                                " text-[#ce7b51] hover:scale-105":
                                  (data as Offer).creatorStatus === CreateOfferStatus.Open,

                                " text-[#e3cc1b] hover:scale-105":
                                  (data as Offer).creatorStatus === CreateOfferStatus.Settled || (data as Offer).creatorStatus === CreateOfferStatus.CanceledWithdraw,
                              }
                            )}
                            onClick={() => {
                              if ((data as Offer).creatorStatus === CreateOfferStatus.Pending) {
                                (
                                  document.getElementById(`settle-${(data as Offer).id}`) as HTMLDialogElement
                                ).showModal();
                              } else if ((data as Offer).creatorStatus === CreateOfferStatus.Open) {
                                (
                                  document.getElementById(`close-${(data as Offer).id}`) as HTMLDialogElement
                                ).showModal();
                              } else if ((data as Offer).creatorStatus === CreateOfferStatus.Settled || (data as Offer).creatorStatus === CreateOfferStatus.CanceledWithdraw) {
                                (
                                  document.getElementById(`withdraw1-${(data as Offer).id}`) as HTMLDialogElement
                                ).showModal();
                              }
                            }}
                            disabled={(data as Offer).creatorStatus === CreateOfferStatus.Closed}
                          >
                            {(data as Offer).creatorStatus === CreateOfferStatus.Pending
                              ? "Settle"
                              : (data as Offer).creatorStatus === CreateOfferStatus.Open
                                ? "Close"
                                : (data as Offer).creatorStatus === CreateOfferStatus.Settled || (data as Offer).creatorStatus === CreateOfferStatus.CanceledWithdraw
                                  ? "Withdraw"
                                  : "Close"}
                          </button>

                          {/* Modal Settle */}
                          <dialog id={`settle-${(data as Offer).id}`} className="modal">
                            <div className="modal-box bg-[#0C141E]">
                              <h3 className="font-bold text-lg mb-4 text-white">
                                <div className="flex items-center gap-4 justify-start">
                                  <Image
                                    src={(data as Project).projectLogo}
                                    width={50}
                                    height={50}
                                    alt="icon"
                                    className="rounded-full"
                                  />
                                  <div className="flex flex-col gap-1">
                                    <span className="text-[17px] font-bold">{(data as Offer).id}</span>
                                  </div>
                                </div>
                              </h3>

                              <div className="flex flex-col justify-start gap-5 border-gray-300 border rounded-lg p-4 my-5">
                                <div className="flex justify-between">
                                  <div>Filled amount</div>
                                  <div className="flex gap-3">
                                    <span className="font-bold">{(data as Offer).amount.toString()}</span>
                                    <Image
                                      src={(data as Project).projectLogo}
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
                                    <span className="font-bold">{(data as Offer).collateral.toString()}</span>
                                    <Image
                                      src={
                                        availableTokens.find(token => token.address === (data as Offer).tokenCollateralAddress)?.image || '/path/to/default-icon.png'
                                      } width={20}
                                      height={20}
                                      alt="icon"
                                      className="rounded-full"
                                    />
                                  </div>
                                </div>
                                <div className="flex justify-between">
                                  <div>My Compensation</div>
                                  <div className="flex gap-3">
                                    <span className="font-bold">{(data as Offer).collateral.toString()}</span>
                                    <Image
                                      src={
                                        availableTokens.find(token => token.address === (data as Offer).tokenCollateralAddress)?.image || '/path/to/default-icon.png'
                                      } width={20}
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

                          <dialog id={`withdraw1-${(data as Offer).id}`} className="modal">
                            <div className="modal-box bg-[#0C141E]">
                              <h3 className="font-bold text-lg mb-4 text-white">
                                <div className="flex items-center gap-4 justify-start">
                                  <Image
                                    src={(data as Project).projectLogo}
                                    width={50}
                                    height={50}
                                    alt="icon"
                                    className="rounded-full"
                                  />
                                  <div className="flex flex-col gap-1">
                                    <span className="text-[17px] font-bold">{(data as Offer).id}</span>
                                  </div>
                                </div>
                              </h3>

                              <div className="flex flex-col justify-start gap-5 border-gray-300 border rounded-lg p-4 my-5">
                                <div className="flex justify-between">
                                  <div>My received token</div>
                                  <div className="flex gap-3">
                                    <span className="font-bold">{(data as Offer).amount.toString()}</span>
                                    <Image
                                      src={(data as Project).projectLogo}
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

                          <dialog id={`close-${(data as Offer).id}`} className="modal">
                            <div className="modal-box bg-[#0C141E]">
                              <h3 className="font-bold text-lg mb-4 text-white">
                                <div className="flex items-center gap-4 justify-start">
                                  <Image
                                    src={(data as Project).projectLogo}
                                    width={50}
                                    height={50}
                                    alt="icon"
                                    className="rounded-full"
                                  />
                                  <div className="flex flex-col gap-1">
                                    <span className="text-[17px] font-bold">{(data as Offer).id}</span>
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
