import { useState } from "react";

import { Dialog } from "@headlessui/react";
import { NewspaperIcon } from "@heroicons/react/24/outline";

export default function Voucher() {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="mx-4 h-full bg-stone-100 py-4">
        <span style={{ fontSize: "40px", fontWeight: "bold" }}>
          Quản lý voucher
        </span>
        <div className="mx-4 py-4">
          <div className="mb-12 h-72 rounded-lg border-2 border-gray-400 bg-white drop-shadow-xl">
            <div className="flex">
              <svg
                className="h-8 w-8 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                />
              </svg>
              <span>Bộ lọc</span>
            </div>
            <hr />
            <div className="ml-10 grid grid-cols-3 gap-4">
              <div className="flex py-4">
                <label className="mr-2">Mã khuyến mãi: </label>
                <input
                  className="block w-60 rounded-md border border-slate-300 bg-white py-2 pl-9 pr-3 shadow-sm placeholder:italic placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                  placeholder="Mã voucher..."
                  type="text"
                />
              </div>
              <div className="flex py-4">
                <label className="mr-2">Tên khuyến mãi: </label>
                <input
                  className="block w-60 rounded-md border border-slate-300 bg-white py-2 pl-9 pr-3 shadow-sm placeholder:italic placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                  placeholder="Tên voucher..."
                  type="text"
                />
              </div>
              <div className="flex py-4">
                <label className="mr-2">Ngày bắt đầu: </label>
                <input
                  className="block w-60 rounded-md border border-slate-300 bg-white py-2 pl-9 pr-3 shadow-sm placeholder:italic placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                  type="date"
                />
              </div>
              <div className="flex py-4">
                <label className="mr-2">Điều kiện giảm: </label>
                <input
                  className="block w-60 rounded-md border border-slate-300 bg-white py-2 pl-9 pr-3 shadow-sm placeholder:italic placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                  type="text"
                />
              </div>
              <div className="flex py-4">
                <label className="mr-11">Trạng thái: </label>
                <select className="block w-60 rounded border border-gray-300 bg-white px-4 pr-8 leading-tight text-gray-700 focus:border-sky-500 focus:outline-none">
                  <option>Tất cả</option>
                  <option>Đang kích hoạt</option>
                  <option>Ngừng kích hoạt</option>
                </select>
              </div>
              <div className="flex py-4">
                <label className="mr-2">Ngày kết thúc: </label>
                <input
                  className="block w-60 rounded-md border border-slate-300 bg-white py-2 pl-9 pr-3 shadow-sm placeholder:italic placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                  type="date"
                />
              </div>
            </div>
            <div className="pt-8 text-center">
              <button className="h-[35px] w-40 rounded-full border-2 bg-sky-500 from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% hover:bg-gradient-to-r hover:text-black">
                Làm mới
              </button>
            </div>
          </div>
          {/* Danh sách voucher */}
          <div className="rounded-lg bg-white drop-shadow-xl">
            <div className="grid grid-cols-6 gap-4 py-4">
              <span className="col-start-1 col-end-3 ml-3 text-2xl">
                Danh Sách Voucher
              </span>
              <button
                type="button"
                className="col-span-1 col-end-7 mr-5 h-11 w-44 rounded-full border-2 border-green-700 bg-white text-black hover:bg-green-600 hover:text-white"
                onClick={handleOpenModal}
              >
                Thêm mới Voucher
              </button>
            </div>
            <div className="flex flex-col">
              <div className="overflow-x-auto">
                <div className="inline-block min-w-full py-2">
                  <div className="overflow-hidden">
                    <table className="min-w-full text-left text-sm font-light">
                      <thead className="bg-green-300 text-xl font-medium">
                        <tr>
                          <th className="px-6 py-4">#</th>
                          <th className="px-6 py-4">First</th>
                          <th className="px-6 py-4">Last</th>
                          <th className="px-6 py-4">Handle</th>
                          <th className="px-6 py-4">Action</th>
                          <th className="px-6 py-4">Action</th>
                          <th className="px-6 py-4">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-neutral-950 font-medium">
                          <td className="px-6 py-4">1</td>
                          <td className="px-6 py-4">Mark</td>
                          <td className="px-6 py-4">Otto</td>
                          <td className="px-6 py-4">@mdo</td>
                        </tr>
                        <tr className="border-b border-neutral-950 font-medium">
                          <td className="px-6 py-4">2</td>
                          <td className="px-6 py-4">Jacob</td>
                          <td className="px-6 py-4">Thornton</td>
                          <td className="px-6 py-4">@fat</td>
                        </tr>
                        <tr className="border-b border-neutral-950 font-medium">
                          <td className="px-6 py-4">3</td>
                          <td className="px-6 py-4">Larry</td>
                          <td className="px-6 py-4">Wild</td>
                          <td className="px-6 py-4">@twitter</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Modal add */}
      <Dialog
        open={showModal}
        onClose={handleCloseModal}
        className="relative z-10"
      >
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <NewspaperIcon
                      className="h-6 w-6 text-red-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <Dialog.Title
                      as="h2"
                      className="text-base font-semibold leading-6 text-gray-900"
                      style={{ fontSize: "30px" }}
                    >
                      Thêm Voucher
                    </Dialog.Title>
                    {/* Form */}
                    <div className="mt-2">
                      <form action="">
                        <div className="py-5">
                          <label htmlFor="">Mã Vocher</label>
                          <input
                            id="first-name"
                            name="first-name"
                            type="text"
                            autoComplete="given-name"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                        <div className="py-5">
                          <label htmlFor="">Tên Voucher</label>
                          <input
                            id="first-name"
                            name="first-name"
                            type="text"
                            autoComplete="given-name"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                        <div className="py-5">
                          <label htmlFor="">Điều kiện giảm</label>
                          <input
                            id="first-name"
                            name="first-name"
                            type="text"
                            autoComplete="given-name"
                            className="block w-[350px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                        <div className="py-5">
                          <label htmlFor="">Ngày bắt đầu</label>
                          <input
                            id="first-name"
                            name="first-name"
                            type="date"
                            autoComplete="given-name"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                        <div className="py-5">
                          <label htmlFor="">Ngày kết thúc</label>
                          <input
                            id="first-name"
                            name="first-name"
                            type="date"
                            autoComplete="given-name"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                >
                  Lưu
                </button>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                  Hủy
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </>
  );
}

// {showModal ? (
//   <Dialog
//     open={showModal}
//     onClose={handleCloseModal}
//     className="relative z-10"
//   >
//     <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
//     <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
//       <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
//         <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
//           <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
//             <div className="sm:flex sm:items-start">
//               <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
//                 <NewspaperIcon
//                   className="h-6 w-6 text-red-600"
//                   aria-hidden="true"
//                 />
//               </div>
//               <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
//                 <Dialog.Title
//                   as="h2"
//                   className="text-base font-semibold leading-6 text-gray-900"
//                   style={{ fontSize: "30px" }}
//                 >
//                   Thêm Voucher
//                 </Dialog.Title>
//                 {/* Form */}
//                 <form>
//                   <div className="py-5">
//                     <label htmlFor="">Mã Vocher</label>
//                     <input
//                       type="text"
//                       className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
//                     />
//                   </div>
//                   {/* Các input khác */}
//                 </form>
//               </div>
//             </div>
//           </div>
//           <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
//             <button
//               type="button"
//               onClick={handleCloseModal}
//               className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
//             >
//               Lưu
//               <ArrowTurnDownLeftIcon
//                 className="h-4 w-4 text-white"
//                 aria-hidden="true"
//               />
//             </button>
//             <button
//               type="button"
//               onClick={handleCloseModal}
//               className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm sm:mt-0 sm:w-auto"
//             >
//               Hủy
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   </Dialog>
// ) : null}
