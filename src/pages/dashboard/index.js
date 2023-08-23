import {useState,useRef,useEffect}from 'react'
import axios from 'axios'
export default function Dashboard() {
    const [change,setChange]=useState(false)
    const [data,setData]=useState([])
    const username = useRef()
    const password = useRef()
    const fullname = useRef()
    const email = useRef()
    const phone = useRef()
    const handleData=async()=>{
        const id = localStorage.getItem('id')
        try {
            const response = await axios.get('/api/getData');
            response.data.map(item=>{
                if(item._id===id){
                    setData(response.data)
                }
            })
        }catch (error) {
            console.error("Error retrieving data:", error);
            res.status(500).json({ message: "Error retrieving data" });
          }
    }
    const handleChange = async(e)=>{
        switch (e.type) {
            case 'cancel':
                setChange(!change)
               break;
               case 'success':
                setChange(!change)
               break;
            default:
                break;
        }        
    }
    useEffect(() => {
        handleData()
    }, []);
  return (
    <div className="col-12 mt-5 pt-5">

      {data.map((item,index)=>(
        <div key={index}>
        <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">
          Thông tin cơ bản Account
        </h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500"></p>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              UserName
            </dt>
            <input
              type="text"
              value={item.username}
              name="usename"
              id="price"
              className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="username"
              disabled={!change}
            />
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              password
            </dt>
            <input
            value={item.password}
              type="password"
              name="password"
              id="password"
              className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="password"
              disabled={!change}
            />
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              fullname
            </dt>
            <input
              type="text"
              value={item.username}
              name="usename"
              id="price"
              className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="username"
              disabled={!change}
            />
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Email address
            </dt>
            <input
              type="email"
              value={item.email}
              name="usename"
              id="price"
              className="block w-full rounded-md border-0 py-1.5 pl-7 pr-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="username"
              disabled={!change}
              required
            />
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Number
            </dt>
            <input
              type="text"
              value={item.phone}
              name="phone"
              id="phone"
              className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="phone number"
              disabled={!change}
            />
          </div>
          <div className="col-lg-12 d-flex justify-center">
          {!change&&<button className="p-2" onClick={()=>setChange(!change)}>
              <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                Chỉnh sửa
              </span>
            </button>}
            {change&&<div>
                <button className="p-2" onClick={()=>handleChange({type:'success'})}>
              <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                Thay đổi
              </span>
            </button>
            <button className="p-2" onClick={()=>handleChange({type:'cancel'})}>
              <span className="inline-flex items-center rounded-md bg-pink-50 px-2 py-1 text-xs font-medium text-pink-700 ring-1 ring-inset ring-pink-700/10">
                Hủy
              </span>
            </button>
                </div>}
          </div>
        </dl>
      </div>
      </div>
      ))}
    </div>
  );
}
